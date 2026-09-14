# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Test Product persistence, searches, and validation."""
from decimal import Decimal
from unittest import TestCase
from service import app
from service.models import Product, Category, DataValidationError, db
from tests.factories import ProductFactory


class TestProductModel(TestCase):
    """Each test starts with an empty test database."""

    def setUp(self):
        self.context = app.app_context()
        self.context.push()
        db.session.query(Product).delete()
        db.session.commit()

    def tearDown(self):
        db.session.rollback()
        db.session.remove()
        self.context.pop()

    def test_create_a_product(self):
        """It should build a product with all six fields."""
        product = ProductFactory(name="Hat", category=Category.CLOTHS)
        self.assertEqual(product.name, "Hat")
        self.assertEqual(product.category, Category.CLOTHS)
        self.assertIsInstance(product.description, str)
        self.assertIsInstance(product.price, Decimal)
        self.assertIsInstance(product.available, bool)
        self.assertIn("<Product Hat", repr(product))

    def test_add_a_product(self):
        """It should assign an ID and save a new product."""
        product = ProductFactory()
        product.create()
        self.assertIsNotNone(product.id)
        expected = product.serialize()
        db.session.remove()
        products = Product.all()
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0].serialize(), expected)

    def test_read_a_product(self):
        """It should read every field back from the database."""
        product = ProductFactory()
        product.create()
        expected = product.serialize()
        db.session.remove()
        found = Product.find(expected["id"])
        self.assertIsNotNone(found)
        self.assertEqual(found.serialize(), expected)

    def test_read_missing_product(self):
        """It should return None when a product ID does not exist."""
        self.assertIsNone(Product.find(0))

    def test_update_a_product(self):
        """It should save an update while keeping the same ID."""
        product = ProductFactory()
        product.create()
        product_id = product.id
        product.description = "A new description"
        product.update()
        db.session.remove()
        found = Product.find(product_id)
        self.assertEqual(found.description, "A new description")
        self.assertEqual(found.id, product_id)
        self.assertEqual(len(Product.all()), 1)

    def test_update_without_id(self):
        """It should reject an update on a product that was never saved."""
        product = ProductFactory(id=None)
        with self.assertRaises(DataValidationError):
            product.update()

    def test_delete_a_product(self):
        """It should remove a product from the database."""
        product = ProductFactory()
        product.create()
        product_id = product.id
        product.delete()
        self.assertEqual(Product.all(), [])
        self.assertIsNone(Product.find(product_id))

    def test_list_all_products(self):
        """It should list all saved products and handle an empty database."""
        self.assertEqual(Product.all(), [])
        for product in ProductFactory.create_batch(5):
            product.create()
        self.assertEqual(len(Product.all()), 5)

    def test_find_by_name(self):
        """It should return only products with the requested name."""
        for name in ["Hat", "Hat", "Shoes"]:
            ProductFactory(name=name).create()
        found = Product.find_by_name("Hat").all()
        self.assertEqual(len(found), 2)
        for product in found:
            self.assertEqual(product.name, "Hat")

    def test_find_by_category(self):
        """It should return only products in the requested category."""
        for category in [Category.FOOD, Category.FOOD, Category.TOOLS]:
            ProductFactory(category=category).create()
        found = Product.find_by_category(Category.FOOD).all()
        self.assertEqual(len(found), 2)
        for product in found:
            self.assertEqual(product.category, Category.FOOD)

    def test_find_by_availability(self):
        """It should search for available and unavailable products."""
        for available in [True, True, False]:
            ProductFactory(available=available).create()
        for available, count in [(True, 2), (False, 1)]:
            found = Product.find_by_availability(available).all()
            self.assertEqual(len(found), count)
            for product in found:
                self.assertEqual(product.available, available)

    def test_search_with_no_matches(self):
        """It should return empty results for a missing name or category."""
        ProductFactory(name="Hat", category=Category.CLOTHS).create()
        self.assertEqual(Product.find_by_name("Missing").all(), [])
        self.assertEqual(Product.find_by_category(Category.FOOD).all(), [])

    def test_find_by_price(self):
        """It should accept Decimal and string prices."""
        ProductFactory(price=Decimal("12.34")).create()
        ProductFactory(price=Decimal("99.00")).create()
        for price in [Decimal("12.34"), ' "12.34" ']:
            found = Product.find_by_price(price).all()
            self.assertEqual(len(found), 1)
            self.assertEqual(found[0].price, Decimal("12.34"))

    def test_serialize_product(self):
        """It should serialize price as a string and category as its name."""
        product = ProductFactory(price=Decimal("59.95"), category=Category.CLOTHS)
        data = product.serialize()
        self.assertEqual(set(data), {"id", "name", "description", "price", "available", "category"})
        self.assertEqual(data["price"], "59.95")
        self.assertEqual(data["category"], "CLOTHS")

    def test_deserialize_product(self):
        """It should restore every editable field from valid data."""
        data = ProductFactory().serialize()
        restored = Product().deserialize(data)
        self.assertIsNone(restored.id)
        for field in ["name", "description", "price", "available", "category"]:
            self.assertEqual(restored.serialize()[field], data[field])

    def test_deserialize_missing_field(self):
        """It should reject a missing required field."""
        data = ProductFactory().serialize()
        del data["name"]
        with self.assertRaises(DataValidationError):
            Product().deserialize(data)

    def test_deserialize_bad_body(self):
        """It should reject a body that is not a product dictionary."""
        for data in [None, [], "bad data"]:
            with self.assertRaises(DataValidationError):
                Product().deserialize(data)

    def test_deserialize_bad_availability(self):
        """It should require a JSON boolean for availability."""
        data = ProductFactory().serialize()
        data["available"] = "true"
        with self.assertRaises(DataValidationError):
            Product().deserialize(data)

    def test_deserialize_bad_category(self):
        """It should reject an unknown category."""
        data = ProductFactory().serialize()
        data["category"] = "NOT_A_CATEGORY"
        with self.assertRaises(DataValidationError):
            Product().deserialize(data)

    def test_deserialize_bad_price(self):
        """It should reject invalid, negative, nonfinite, or oversized prices."""
        for price in ["not a number", "-1.00", "NaN", "Infinity", "100000000.00"]:
            data = ProductFactory().serialize()
            data["price"] = price
            with self.assertRaises(DataValidationError):
                Product().deserialize(data)

    def test_deserialize_bad_name(self):
        """It should reject blank, oversized, and non-string names."""
        for name in ["", "   ", "x" * 101, None]:
            data = ProductFactory().serialize()
            data["name"] = name
            with self.assertRaises(DataValidationError):
                Product().deserialize(data)

    def test_deserialize_bad_description(self):
        """It should reject oversized and non-string descriptions."""
        for description in [None, "x" * 251]:
            data = ProductFactory().serialize()
            data["description"] = description
            with self.assertRaises(DataValidationError):
                Product().deserialize(data)

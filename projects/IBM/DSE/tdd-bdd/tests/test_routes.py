# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Test the product API through Flask's HTTP test client."""
from decimal import Decimal
import json
import logging
from unittest import TestCase
from unittest.mock import patch
from service import app
from service.models import Product, Category, db
from tests.factories import ProductFactory

BASE_URL = "/products"


class TestProductRoutes(TestCase):
    """Exercise successful requests, searches, and common request errors."""

    def setUp(self):
        app.config["TESTING"] = True
        self.old_log_level = app.logger.level
        app.logger.setLevel(logging.CRITICAL)
        self.context = app.app_context()
        self.context.push()
        self.client = app.test_client()
        db.session.query(Product).delete()
        db.session.commit()

    def tearDown(self):
        db.session.rollback()
        db.session.remove()
        self.context.pop()
        app.logger.setLevel(self.old_log_level)

    def _create_products(self, count=1, **fields):
        """Create products through the API and return their response data."""
        products = []
        for _ in range(count):
            data = ProductFactory(**fields).serialize()
            response = self.client.post(BASE_URL, json=data)
            self.assertEqual(response.status_code, 201)
            products.append(response.get_json())
        return products

    def test_index(self):
        """It should serve the supplied administration page."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Product Catalog Administration", response.data)

    def test_health(self):
        """It should report that the service is healthy."""
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["message"], "OK")

    def test_create_product(self):
        """It should create a product and provide its retrieval URL."""
        expected = ProductFactory().serialize()
        response = self.client.post(BASE_URL, json=expected)
        self.assertEqual(response.status_code, 201)
        created = response.get_json()
        self.assertIsNotNone(created["id"])
        for field in ["name", "description", "available", "category"]:
            self.assertEqual(created[field], expected[field])
        self.assertEqual(Decimal(created["price"]), Decimal(expected["price"]))
        location = response.headers["Location"]
        self.assertTrue(location.endswith(f"/products/{created['id']}"))
        retrieved = self.client.get(location)
        self.assertEqual(retrieved.status_code, 200)
        self.assertEqual(retrieved.get_json(), created)

    def test_get_product(self):
        """It should retrieve a single product with all fields intact."""
        product = self._create_products()[0]
        response = self.client.get(f"{BASE_URL}/{product['id']}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), product)

    def test_get_product_not_found(self):
        """It should return a JSON 404 for an unknown product."""
        response = self.client.get(f"{BASE_URL}/0")
        self.assertEqual(response.status_code, 404)
        self.assertIn("not found", response.get_json()["message"])

    def test_update_product(self):
        """It should persist an update and keep the original ID."""
        product = self._create_products()[0]
        product["description"] = "Updated description"
        product["price"] = "12.34"
        product["available"] = False
        response = self.client.put(f"{BASE_URL}/{product['id']}", json=product)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), product)
        retrieved = self.client.get(f"{BASE_URL}/{product['id']}")
        self.assertEqual(retrieved.get_json(), product)
        self.assertEqual(len(self.client.get(BASE_URL).get_json()), 1)

    def test_update_product_not_found(self):
        """It should return 404 when updating an unknown product."""
        response = self.client.put(f"{BASE_URL}/0", json=ProductFactory().serialize())
        self.assertEqual(response.status_code, 404)

    def test_delete_product(self):
        """It should delete only the requested product and return an empty body."""
        products = self._create_products(2)
        response = self.client.delete(f"{BASE_URL}/{products[0]['id']}")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(response.data, b"")
        self.assertEqual(self.client.get(f"{BASE_URL}/{products[0]['id']}").status_code, 404)
        self.assertEqual(self.client.get(BASE_URL).get_json(), [products[1]])

    def test_delete_missing_product(self):
        """It should return 204 even if a product was already deleted."""
        response = self.client.delete(f"{BASE_URL}/0")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(response.data, b"")

    def test_get_product_list(self):
        """It should list every product in the database."""
        self._create_products(5)
        response = self.client.get(BASE_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 5)

    def test_get_empty_product_list(self):
        """It should return an empty JSON list when no products exist."""
        response = self.client.get(BASE_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), [])

    def test_query_by_name(self):
        """It should filter by name, including names with spaces and ampersands."""
        self._create_products(2, name="Nuts & Bolts")
        self._create_products(name="Hat")
        response = self.client.get(BASE_URL, query_string={"name": "Nuts & Bolts"})
        self.assertEqual(response.status_code, 200)
        products = response.get_json()
        self.assertEqual(len(products), 2)
        for product in products:
            self.assertEqual(product["name"], "Nuts & Bolts")

    def test_query_by_category(self):
        """It should filter by category without depending on input case."""
        self._create_products(2, category=Category.FOOD)
        self._create_products(category=Category.TOOLS)
        response = self.client.get(BASE_URL, query_string={"category": "food"})
        self.assertEqual(response.status_code, 200)
        products = response.get_json()
        self.assertEqual(len(products), 2)
        for product in products:
            self.assertEqual(product["category"], "FOOD")

    def test_query_by_availability(self):
        """It should filter both true and false availability values."""
        self._create_products(2, available=True)
        self._create_products(available=False)
        for value, expected, count in [("true", True, 2), ("false", False, 1)]:
            response = self.client.get(BASE_URL, query_string={"available": value})
            self.assertEqual(response.status_code, 200)
            products = response.get_json()
            self.assertEqual(len(products), count)
            for product in products:
                self.assertEqual(product["available"], expected)

    def test_query_no_matches(self):
        """It should return an empty list for a search with no matches."""
        self._create_products(name="Hat")
        response = self.client.get(BASE_URL, query_string={"name": "Missing"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), [])

    def test_query_invalid_category(self):
        """It should reject an unknown category filter with 400."""
        response = self.client.get(BASE_URL, query_string={"category": "NO_SUCH_CATEGORY"})
        self.assertEqual(response.status_code, 400)

    def test_query_invalid_availability(self):
        """It should reject an unrecognized availability filter with 400."""
        response = self.client.get(BASE_URL, query_string={"available": "maybe"})
        self.assertEqual(response.status_code, 400)

    def test_create_missing_name(self):
        """It should reject a missing name with a JSON validation error."""
        data = ProductFactory().serialize()
        del data["name"]
        response = self.client.post(BASE_URL, json=data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("missing name", response.get_json()["message"])

    def test_create_bad_price(self):
        """It should return 400 instead of crashing on an invalid price."""
        data = ProductFactory().serialize()
        data["price"] = "expensive"
        self.assertEqual(self.client.post(BASE_URL, json=data).status_code, 400)

    def test_create_bad_boolean(self):
        """It should reject a string in place of a JSON boolean."""
        data = ProductFactory().serialize()
        data["available"] = "false"
        self.assertEqual(self.client.post(BASE_URL, json=data).status_code, 400)

    def test_create_malformed_json(self):
        """It should return 400 for malformed JSON."""
        response = self.client.post(BASE_URL, data="{broken", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_create_no_content_type(self):
        """It should return 415 when the request has no content type."""
        self.assertEqual(self.client.post(BASE_URL, data="bad data").status_code, 415)

    def test_create_wrong_content_type(self):
        """It should reject non-JSON request data with 415."""
        response = self.client.post(BASE_URL, data="text", content_type="text/plain")
        self.assertEqual(response.status_code, 415)

    def test_create_json_with_charset(self):
        """It should accept application/json with a charset parameter."""
        response = self.client.post(
            BASE_URL, data=json.dumps(ProductFactory().serialize()),
            content_type="application/json; charset=utf-8",
        )
        self.assertEqual(response.status_code, 201)

    def test_update_invalid_data_keeps_original(self):
        """It should leave stored data intact after a rejected update."""
        product = self._create_products()[0]
        invalid = dict(product, description="Changed", available="not a boolean")
        response = self.client.put(f"{BASE_URL}/{product['id']}", json=invalid)
        self.assertEqual(response.status_code, 400)
        db.session.remove()
        self.assertEqual(self.client.get(f"{BASE_URL}/{product['id']}").get_json(), product)

    def test_method_not_allowed(self):
        """It should return a JSON 405 for unsupported methods."""
        response = self.client.patch(BASE_URL, json={})
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.get_json()["status"], 405)

    def test_internal_server_error(self):
        """It should return a JSON 500 if an unexpected failure occurs."""
        app.config["TESTING"] = False
        try:
            with patch("service.routes.Product.all", side_effect=RuntimeError("test failure")):
                response = self.client.get(BASE_URL)
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response.get_json()["status"], 500)
        finally:
            app.config["TESTING"] = True

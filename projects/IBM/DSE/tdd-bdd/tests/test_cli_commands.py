# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Check the database initialization command against the test database."""
from unittest import TestCase
from service import app
from service.models import Product, db
from tests.factories import ProductFactory


class TestFlaskCLI(TestCase):
    def test_db_create(self):
        """It should recreate the database tables."""
        with app.app_context():
            ProductFactory().create()
            result = app.test_cli_runner().invoke(args=["db-create"])
            self.assertEqual(result.exit_code, 0, result.output)
            self.assertEqual(Product.all(), [])
            db.session.remove()

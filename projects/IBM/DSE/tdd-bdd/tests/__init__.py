# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Select an isolated test database before importing the application."""
import os

os.environ["DATABASE_URI"] = os.getenv("TEST_DATABASE_URI", "sqlite:///:memory:")

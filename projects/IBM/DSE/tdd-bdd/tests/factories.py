# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Factory data shared by the model and route tests."""
import factory
from factory.fuzzy import FuzzyChoice, FuzzyDecimal
from service.models import Product, Category


class ProductFactory(factory.Factory):
    """Build a Product with valid, varied test data."""

    class Meta:
        model = Product

    id = factory.Sequence(lambda number: number)
    name = FuzzyChoice([
        "Hat", "Pants", "Shirt", "Apple", "Banana", "Pots",
        "Towels", "Ford", "Chevy", "Hammer", "Wrench",
    ])
    description = factory.Faker("text", max_nb_chars=200)
    price = FuzzyDecimal(0.5, 2000.0, 2)
    available = FuzzyChoice([True, False])
    category = FuzzyChoice(list(Category))

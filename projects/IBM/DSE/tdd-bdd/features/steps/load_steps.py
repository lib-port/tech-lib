# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Load the feature's background data before each scenario."""
import requests
from behave import given


@given("the following products")
def step_impl(context):
    """Clear previous products and create the rows in the Gherkin table."""
    endpoint = f"{context.base_url}/products"
    response = requests.get(endpoint, timeout=10)
    assert response.status_code == 200, response.text
    for product in response.json():
        response = requests.delete(f"{endpoint}/{product['id']}", timeout=10)
        assert response.status_code == 204, response.text

    for row in context.table:
        payload = {
            "name": row["name"],
            "description": row["description"],
            "price": row["price"],
            "available": row["available"].lower() in ["true", "1"],
            "category": row["category"],
        }
        response = requests.post(endpoint, json=payload, timeout=10)
        assert response.status_code == 201, response.text

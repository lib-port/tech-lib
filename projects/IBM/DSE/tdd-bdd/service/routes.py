######################################################################
# Copyright 2016, 2022 John J. Rofrano. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
######################################################################

# spell: ignore Rofrano jsonify restx dbname
# Modified: completed API operations and request validation.
"""REST endpoints for the product catalog."""
from flask import abort, jsonify, request, url_for
from service import app
from service.common import status
from service.models import Product, Category


@app.route("/health")
def healthcheck():
    """Report that the service is running."""
    return jsonify(status=200, message="OK"), status.HTTP_200_OK


@app.route("/")
def index():
    """Serve the course's product administration UI."""
    return app.send_static_file("index.html")


def check_content_type(content_type):
    """Require JSON and allow an optional charset in the header."""
    if request.mimetype != content_type:
        abort(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, f"Content-Type must be {content_type}")


@app.route("/products", methods=["POST"])
def create_products():
    """Create a product and return its data and retrieval URL."""
    check_content_type("application/json")
    product = Product().deserialize(request.get_json())
    product.create()
    location = url_for("get_products", product_id=product.id, _external=True)
    return jsonify(product.serialize()), status.HTTP_201_CREATED, {"Location": location}


@app.route("/products/<int:product_id>", methods=["GET"])
def get_products(product_id):
    """Read one product, or return 404 if it does not exist."""
    product = Product.find(product_id)
    if product is None:
        abort(status.HTTP_404_NOT_FOUND, f"Product with id '{product_id}' was not found.")
    return jsonify(product.serialize()), status.HTTP_200_OK


@app.route("/products/<int:product_id>", methods=["PUT"])
def update_products(product_id):
    """Replace a product's editable fields while keeping its ID."""
    check_content_type("application/json")
    product = Product.find(product_id)
    if product is None:
        abort(status.HTTP_404_NOT_FOUND, f"Product with id '{product_id}' was not found.")
    product.deserialize(request.get_json())
    product.update()
    return jsonify(product.serialize()), status.HTTP_200_OK


@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_products(product_id):
    """Delete a product; repeated deletes also succeed with an empty 204."""
    product = Product.find(product_id)
    if product is not None:
        product.delete()
    return "", status.HTTP_204_NO_CONTENT


@app.route("/products", methods=["GET"])
def list_products():
    """List all products or filter by name, category, or availability."""
    name = request.args.get("name")
    category = request.args.get("category")
    available = request.args.get("available")

    # The lab searches one attribute at a time. Match its filter precedence.
    if name:
        products = Product.find_by_name(name)
    elif category:
        try:
            category_value = Category[category.upper()]
        except KeyError:
            abort(status.HTTP_400_BAD_REQUEST, f"Category '{category}' is not valid.")
        products = Product.find_by_category(category_value)
    elif available:
        value = available.lower()
        if value not in ["true", "yes", "1", "false", "no", "0"]:
            abort(status.HTTP_400_BAD_REQUEST, "Available must be true or false.")
        products = Product.find_by_availability(value in ["true", "yes", "1"])
    else:
        products = Product.all()

    return jsonify([product.serialize() for product in products]), status.HTTP_200_OK

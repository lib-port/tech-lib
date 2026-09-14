# IBM TDD/BDD Final Project

A product catalog for IBM’s **Introduction to Test and Behavior Driven Development** course. Flask and SQLAlchemy provide the API and storage; unittest/Nose and Behave/Selenium provide unit and browser tests.

The administration page supports creating, reading, updating, deleting, listing, and searching products by name, category, or availability.

## Quick start

Use **Python 3.9** for the course’s legacy Nose runner. The setup script also accepts 3.8. From the project folder:

```bash
bash bin/setup.sh
source .venv/bin/activate
nosetests
honcho start
```

Setup installs [requirements.txt](requirements.txt), creates `.venv`, and copies [dot-env-example](dot-env-example) to `.env` if needed. To choose Python explicitly, run `PYTHON_BIN=/path/to/python3.9 bash bin/setup.sh`.

Open [the administration page](http://localhost:8080). The application creates the default SQLite database at `instance/products.db` when it starts. Keep the server running for browser tests.

## Browser tests

Install Chrome and a matching ChromeDriver, with `chromedriver` on PATH. In another terminal in the project folder, run:

```bash
source .venv/bin/activate
behave
```

This runs nine scenarios and 128 steps. Use `behave --tags=@required` for the seven assigned scenarios: read, update, delete, list, and searches by category, availability, and name.

Browser settings live in `.env`. Defaults are `DRIVER=chrome`, `HEADLESS=true`, `WAIT_SECONDS=10`, and `BASE_URL=http://localhost:8080`. Set `BROWSER_BINARY` or `CHROMEDRIVER_PATH` for custom locations. Firefox requires `DRIVER=firefox`, Firefox, and GeckoDriver.

**Browser tests reset the catalog before every scenario.** Use a disposable database. Unit tests use a separate in-memory SQLite database by default.

## API basics

Use `POST /products` to create and `GET /products` to list. Use `GET`, `PUT`, or `DELETE` on `/products/{id}` to read, replace, or delete. The health check is `GET /health`.

Creation returns 201; successful reads, updates, and lists return 200. Deletion returns 204, even for repeated requests. Missing reads or updates return 404. Malformed JSON and handled validation errors return 400; unsupported content types return 415. Unexpected failures return 500.

Create and update requests require `Content-Type: application/json` and all five fields:

```json
{
  "name": "Hat",
  "description": "A red fedora",
  "price": "59.95",
  "available": true,
  "category": "CLOTHS"
}
```

Availability must be a JSON boolean. Prices use two decimal places and return as strings. Valid categories are `UNKNOWN`, `CLOTHS`, `FOOD`, `HOUSEWARES`, `AUTOMOTIVE`, and `TOOLS`; `CLOTHS` follows the assignment’s spelling.

Search with `/products?name=Hat`, `?category=CLOTHS`, or `?available=false`. Names match exactly, including spaces; category filters ignore case. Multiple filters use only the first in this order: name, category, availability. Clear the form before changing filters.

## Database and development

SQLite needs no Docker. For the lab’s PostgreSQL setup, run `make db` and set `DATABASE_URI=postgresql://postgres:postgres@localhost:5432/postgres` in `.env` before starting the server.

For PostgreSQL unit tests, create a separate, empty database and set `TEST_DATABASE_URI` when running `nosetests`. Unit tests ignore the normal `DATABASE_URI`.

With `.venv` activated, use `make run`, `make tests`, `make bdd`, or `make lint`. The suite contains 50 unit tests; coverage must reach 95%.

Application code lives in [service/](service/), the administration page in [service/static/](service/static/), unit tests in [tests/](tests/), and browser scenarios in [features/](features/).

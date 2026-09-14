.PHONY: help install run tests bdd lint db

help:
	@echo "Targets: install, run, tests, bdd, lint, db"

install:
	bash bin/setup.sh

run:
	honcho start

tests:
	nosetests

bdd:
	behave

lint:
	flake8 service tests features

# Optional PostgreSQL service for the IBM lab. Local development uses SQLite.
db:
	docker run -d --name tdd-bdd-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15-alpine

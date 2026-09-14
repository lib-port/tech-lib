#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${PYTHON_BIN:-}" ]; then
    if command -v python3.9 >/dev/null 2>&1; then
        PYTHON_BIN=python3.9
    elif command -v python3.8 >/dev/null 2>&1; then
        PYTHON_BIN=python3.8
    else
        PYTHON_BIN=python3
    fi
fi

"$PYTHON_BIN" -c 'import sys; assert sys.version_info[:2] in [(3, 8), (3, 9)], "Use Python 3.8 or 3.9 for the course nosetests runner; set PYTHON_BIN to its path."'
"$PYTHON_BIN" -m venv .venv
.venv/bin/python -m pip install --upgrade 'pip<26' wheel
.venv/bin/python -m pip install -r requirements.txt
if [ ! -f .env ]; then
    cp dot-env-example .env
fi

echo "Setup complete. Run: source .venv/bin/activate"
echo "Then run nosetests, honcho start, and behave in a second terminal."
echo "For Behave, Chrome and a matching chromedriver must be installed."

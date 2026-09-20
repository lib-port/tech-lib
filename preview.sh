#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
site_dir="$repo_dir/docusaurus"

if ! command -v node >/dev/null 2>&1 || ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 24 ? 0 : 1)' >/dev/null 2>&1; then
  printf 'Node.js 24 or newer is required. See docusaurus/README.md for setup.\n' >&2
  exit 1
fi

if [[ ! -x "$site_dir/node_modules/.bin/docusaurus" ]]; then
  printf 'Docusaurus is not installed. Run "cd docusaurus && npm start" once to install it, then stop that server with Ctrl+C.\n' >&2
  exit 1
fi

cd "$site_dir"
exec "$site_dir/node_modules/.bin/docusaurus" start "$@"

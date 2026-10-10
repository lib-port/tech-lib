#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
site_dir="$repo_dir/docusaurus"

if ! command -v node >/dev/null 2>&1; then
  printf 'Node.js is not on PATH. With standalone pnpm 12, run "pnpm setup", open a new terminal, then run "pnpm runtime set node lts -g". See docusaurus/README.md for other setup options.\n' >&2
  exit 1
fi

if ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 24 && process.features.typescript ? 0 : 1)' >/dev/null 2>&1; then
  printf 'Official Node.js 24 or newer with native TypeScript support is required. See docusaurus/README.md for setup.\n' >&2
  exit 1
fi

if [[ ! -x "$site_dir/node_modules/.bin/docusaurus" ]]; then
  printf 'Docusaurus is not installed. Run "cd docusaurus && pnpm start" once to install it, then stop that server with Ctrl+C.\n' >&2
  exit 1
fi

cd "$site_dir"
exec "$site_dir/node_modules/.bin/docusaurus" start "$@"

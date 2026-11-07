#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo 'Node.js 24 and npm are required. Install them before building.' >&2
  exit 1
fi

npm ci
npm run build

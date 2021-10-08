name: Kubernetes Javascript Client - Validation

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [ '16', '14', '12' ]
    name: Node ${{ matrix.node }} validation
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node }}
      # Pre-check to validate that versions match between package.json
      # and package-lock.json. Needs to run before npm install
      - run: node version-check.js
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm audit --audit-level=critical


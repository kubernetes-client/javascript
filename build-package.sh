#!/bin/bash

# exit on any error
set -e

# validate branches
. ./pre-check.sh

npm run clean
npm install

# pre-requisites
npm run lint
npm test-no-coverage #TODO revert to npm test when c8 is fixed

# clean any old files
npm run clean
npm install

# build
npm run build
npm pack

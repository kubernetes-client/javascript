#!/bin/bash

# exit on any error
set -e 

version=$(cat package.json | jq -r .version)

. ./pre-check.sh

echo "This will tag and publish package version ${version}"
if [[ -z "$confirm" ]]; then
  read -p "Confirm [y/N]" confirm
fi

case "${confirm}" in
  y|Y ) echo "Tagging and pushing ${version}";;
  * ) echo "Aborting"; exit 0;;
esac

if [[ -z "$SKIP_TAG" ]]; then
  git tag ${version} 
  git push upstream ${version} 
fi

npm publish
npm version patch -m "Update to version ${version}"

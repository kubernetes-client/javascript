#!/bin/bash
if [[ "${1}x" == "x" ]]; then
  echo "Usage: ${0} <version>"
  exit 1
fi

. ./pre-check.sh

git tag ${1}
git push upstream ${tag}

npm publish

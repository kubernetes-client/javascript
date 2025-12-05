#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)

if [[ "${branch}" != "main" && ! "${branch}" =~ ^release- ]]; then
  echo "This script can only be run on the main or release-* branches. Current branch is ${branch}"
  exit 1
fi

if ! git diff --quiet; then
  echo "This script must only run on a clean branch."
  echo
  git status
  exit 1
fi

untracked=$(git ls-files --exclude-standard --others)

if [[ "${untracked}" != "" ]]; then
  echo "This script requires no untracked files."
  echo
  git status
  exit 1
fi

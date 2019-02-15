#!/bin/bash

# exit on any error
set -e

. ./pre-check.sh

tsc
npm pack

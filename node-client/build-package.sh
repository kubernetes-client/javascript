#!/bin/bash

tsc
cp ../README.md ./
npm pack
rm README.md

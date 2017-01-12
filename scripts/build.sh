#!/bin/bash

set -e

./node_modules/babel-cli/bin/babel.js sources -d dist

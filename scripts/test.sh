#!/bin/bash

set -e

export NODE_ENV=test
./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha -- \
--bail \
test/e2e/*.js \
sources/**/*.spec.js

if [ ! -z "$EXPORT_COVERAGE" ]; then
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

  rm -rf ./coverage
fi


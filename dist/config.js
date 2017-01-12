'use strict';

var _shellArguments = require('shell-arguments');

var _shellArguments2 = _interopRequireDefault(_shellArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = {
  test: {
    port: 5000,
    database: 'webservice_test',
    secret: 'kljj4hhsdih.8j32h',
    token: {
      expiresIn: '24h'
    }
  },
  development: {
    port: process.env.PORT || 4000,
    database: 'webservice',
    secret: 'kljj4hhsdih.8j32h',
    token: {
      expiresIn: '24h'
    }
  },
  production: {
    port: 4000,
    database: 'webservice',
    secret: 'tkta0kjxjkur3sor',
    token: {
      expiresIn: '24h'
    }
  }
};

var env = _shellArguments2.default.env || process.env.NODE_ENV || 'production';

module.exports = configs[env];
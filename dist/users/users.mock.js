'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mock = {
  firstname: 'John',
  lastname: 'Snow',
  email: 'iknownothing@snow.com',
  password: 'ygridiloveyou'
};

var id = mock.id,
    email = mock.email;

var token = _jsonwebtoken2.default.sign({ id: id, email: email }, _config.secret, _config.token);
mock.token = token;
mock.invalidToken = token.replace(/^.{2}/, '');
mock.invalidPassword = mock.password.replace(/^.{2}/, '');

module.exports = mock;
'use strict';

var _validObjectid = require('valid-objectid');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  id: id,
  token: token
};

function id(req, res, next, value) {
  if (!(0, _validObjectid.isValid)(value)) {
    var message = 'invalid id';
    return res.status(400).json({ message: message });
  }

  next();
}

function token(req, res, next) {
  var token = req.headers.token || req.body.token || req.query.token;

  if (!token) {
    var message = 'required token';
    return res.status(401).json({ message: message });
  }

  _jsonwebtoken2.default.verify(token, _config.secret, function (err, decoded) {
    if (err) {
      var _message = 'invalid token';
      return res.status(401).json({ message: _message });
    }

    req.token = decoded;
    next();
  });
}
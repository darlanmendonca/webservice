'use strict';

var _usersModel = require('./users.model.js');

var _usersModel2 = _interopRequireDefault(_usersModel);

var _encodeHelper = require('../encode/encode.helper.js');

var _encodeHelper2 = _interopRequireDefault(_encodeHelper);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  list: list,
  get: get,
  create: create,
  disable: disable,
  authenticate: authenticate
};

function list(req, res) {
  _usersModel2.default.find({ active: { $ne: false } }).then(function (users) {
    return res.json(users);
  });
}

function get(req, res) {
  _usersModel2.default.findById(req.params.id).then(function (user) {
    return res.json(user);
  });
}

function create(req, res) {
  var user = (0, _usersModel2.default)(req.body);

  user.save().then(function () {
    return res.status(201).json({ message: 'created' });
  }).catch(function (err) {
    res.status(400).json({ message: err.message });
  });
}

function disable(req, res) {
  _usersModel2.default.findByIdAndUpdate(req.params.id, { $set: { active: false } }).then(function () {
    return res.json({ message: 'deleted' });
  });
}

function authenticate(req, res) {
  var email = req.body.email;
  var password = _encodeHelper2.default.md5(req.body.password);
  // const active = true

  _usersModel2.default.findOne({ email: email, password: password }).then(generateToken);

  function generateToken(user) {
    if (!user) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    var id = user.id;
    var token = _jsonwebtoken2.default.sign({ id: id, email: email }, _config.secret, _config.token);
    res.json({ id: id, token: token });
  }
}
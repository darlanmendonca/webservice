'use strict';

var _usersModel = require('./users.model.js');

var _usersModel2 = _interopRequireDefault(_usersModel);

var _encodeHelper = require('../encode/encode.helper.js');

var _encodeHelper2 = _interopRequireDefault(_encodeHelper);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validObjectid = require('valid-objectid');

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  list: list,
  get: get,
  create: create,
  edit: edit,
  disable: disable,
  authenticate: authenticate
};

function list(req, res) {
  _usersModel2.default
  // .findOneAndUpdate({username}, {$set: req.body})

  // .findOneAndUpdate({username}, {$set: {active: false}})
  .find({ active: { $ne: false } }).then(function (users) {
    users.length ? res.json(users) : res.status(204).json(users);
  });
}

function get(req, res) {
  var username = req.params.id;

  var query = (0, _validObjectid.isValid)(req.params.id) ? _usersModel2.default.findById(req.params.id) : _usersModel2.default.findOne({ username: username });

  query.then(function (user) {
    user ? res.json(user) : res.status(404).json(user);
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

function edit(req, res) {
  // const username = req.params.username

  _usersModel2.default.findByIdAndUpdate(req.params.id, { $set: req.body }).then(function (user) {
    if (!user) {
      return res.status(400).json({ message: 'not found' });
    }

    res.json({ message: 'updated' });
  });
}

function disable(req, res) {
  // const username = req.params.username

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
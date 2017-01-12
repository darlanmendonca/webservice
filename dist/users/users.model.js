'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePrivate = require('mongoose-private');

var _mongoosePrivate2 = _interopRequireDefault(_mongoosePrivate);

var _encodeHelper = require('../encode/encode.helper.js');

var _encodeHelper2 = _interopRequireDefault(_encodeHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  username: { type: String, trim: true, lowercase: true, required: true, unique: true },
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true, set: _encodeHelper2.default.md5, private: true },
  active: { type: Boolean, default: true },
  __v: { type: Number, private: true }
});

schema.plugin(_mongoosePrivate2.default);

module.exports = _mongoose2.default.model('users', schema);
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _bodyParser = require('body-parser');

var _filterHelper = require('./filter/filter.helper.js');

var _filterHelper2 = _interopRequireDefault(_filterHelper);

var _router = require('./router.js');

var _router2 = _interopRequireDefault(_router);

var _config = require('./config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webservice = (0, _express2.default)();

webservice.use((0, _cors2.default)()).use((0, _compression2.default)()).use((0, _methodOverride2.default)()).use((0, _multer2.default)().array()).use((0, _bodyParser.urlencoded)({ extended: true })).use((0, _bodyParser.json)()).use(_filterHelper2.default).use(_router2.default);

_mongoose2.default.Promise = _bluebird2.default;

_mongoose2.default.connect('mongodb://localhost/' + _config.database).then(function () {
  return webservice.listen(_config.port, function () {
    return console.info('localhost:' + _config.port);
  });
}).catch(function () {
  return console.error('error on connect db');
});

module.exports = webservice;
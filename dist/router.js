'use strict';

var _express = require('express');

var _usersController = require('./users/users.controller.js');

var _usersController2 = _interopRequireDefault(_usersController);

var _validateController = require('./validate/validate.controller.js');

var _validateController2 = _interopRequireDefault(_validateController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.route('/users/authenticate').post(_usersController2.default.authenticate);

router.use(_validateController2.default.token);

// router.param('id', validate.id)

router.route('/users').get(_usersController2.default.list).post(_usersController2.default.create);

router.route('/users/:id').get(_usersController2.default.get).delete(_usersController2.default.disable);

module.exports = router;
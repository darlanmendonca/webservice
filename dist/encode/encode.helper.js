'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  md5: md5
};

function md5() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return _crypto2.default.createHash('md5').update(str).digest('hex');
}
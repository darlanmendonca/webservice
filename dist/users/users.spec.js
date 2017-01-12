'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chaiThings = require('chai-things');

var _chaiThings2 = _interopRequireDefault(_chaiThings);

var _usersMock = require('./users.mock.js');

var _usersMock2 = _interopRequireDefault(_usersMock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default).use(_chaiThings2.default);

describe('Users', function () {
  describe('.authenticate - POST /users/authenticate', function () {
    it('invalid credentials', function (done) {
      (0, _chai.request)(_index2.default).post('/users/authenticate').field('email', _usersMock2.default.email).field('password', _usersMock2.default.invalidPassword).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid credentials');
        done();
      });
    });

    it('require email', function (done) {
      (0, _chai.request)(_index2.default).post('/users/authenticate').field('email', _usersMock2.default.email).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid credentials');
        done();
      });
    });

    it('require password', function (done) {
      (0, _chai.request)(_index2.default).post('/users/authenticate').field('password', _usersMock2.default.password).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid credentials');
        done();
      });
    });

    it('valid credentials', function (done) {
      (0, _chai.request)(_index2.default).post('/users/authenticate').field('email', _usersMock2.default.email).field('password', _usersMock2.default.password).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.have.property('id');
        (0, _chai.expect)(res.body).to.have.property('token');
        done();
      });
    });
  });

  describe('.list - GET /users', function () {
    it('required token', function (done) {
      (0, _chai.request)(_index2.default).get('/users').end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'required token');
        done();
      });
    });

    it('invalid token from query', function (done) {
      (0, _chai.request)(_index2.default).get('/users').query({ authorization: _usersMock2.default.invalidToken }).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid token');
        done();
      });
    });

    it('invalid token from body', function (done) {
      (0, _chai.request)(_index2.default).get('/users').field('authorization', _usersMock2.default.invalidToken).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid token');
        done();
      });
    });

    it('invalid token from header', function (done) {
      (0, _chai.request)(_index2.default).get('/users').set('authorization', _usersMock2.default.invalidToken).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid token');
        done();
      });
    });

    it('list users', function (done) {
      (0, _chai.request)(_index2.default).get('/users').set('authorization', _usersMock2.default.token).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      });
    });

    it('filters', function (done) {
      (0, _chai.request)(_index2.default).get('/users').set('filters', 'email,firstname').set('authorization', _usersMock2.default.token).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('array');
        (0, _chai.expect)(res.body).all.have.property('email');
        (0, _chai.expect)(res.body).all.have.property('firstname');
        (0, _chai.expect)(res.body).all.not.have.property('password');
        (0, _chai.expect)(res.body).all.not.have.property('lastname');
        done();
      });
    });

    it('private fields', function (done) {
      (0, _chai.request)(_index2.default).get('/users').set('authorization', _usersMock2.default.token).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('array');
        (0, _chai.expect)(res.body).all.not.have.property('password');
        (0, _chai.expect)(res.body).all.not.have.property('__v');
        done();
      });
    });
  });

  describe('.get - GET /users/:username', function () {
    it('required token', function (done) {
      (0, _chai.request)(_index2.default).get('/users/' + _usersMock2.default.username).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'required token');
        done();
      });
    });

    it('invalid token', function (done) {
      (0, _chai.request)(_index2.default).get('/users/' + _usersMock2.default.username).set('authorization', _usersMock2.default.invalidToken).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('message', 'invalid token');
        done();
      });
    });

    it('get user', function (done) {
      (0, _chai.request)(_index2.default).get('/users/' + _usersMock2.default.username).set('authorization', _usersMock2.default.token).end(function (err, res) {
        console.log('/users/' + _usersMock2.default.username, res.body);
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });

    it('filters', function (done) {
      (0, _chai.request)(_index2.default).get('/users/' + _usersMock2.default.username).set('authorization', _usersMock2.default.token).set('filters', 'email,firstname,password').end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.property('email');
        (0, _chai.expect)(res.body).to.have.property('firstname');
        (0, _chai.expect)(res.body).to.not.have.property('password');
        done();
      });
    });

    it('private fields', function (done) {
      (0, _chai.request)(_index2.default).get('/users/' + _usersMock2.default.username).set('authorization', _usersMock2.default.token).end(function (err, res) {
        (0, _chai.expect)(res).to.be.json;
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.not.have.property('password');
        (0, _chai.expect)(res.body).to.not.have.property('__v');
        done();
      });
    });
  });
});
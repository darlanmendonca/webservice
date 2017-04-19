const jwt = require('jsonwebtoken')
const {secret, token: tokenSets} = require('../config.js')

const mock = {
  username: 'johnsnow',
  firstname: 'John',
  lastname: 'Snow',
  email: 'iknownothing@snow.com',
  password: 'ygridiloveyou',
}

const {id, email} = mock
const token = jwt.sign({id, email}, secret, tokenSets)
mock.token = token
mock.invalidToken = token.replace(/^.{2}/, '')
mock.invalidPassword = mock.password.replace(/^.{2}/, '')

module.exports = mock

import jwt from 'jsonwebtoken'
import {secret, token as tokenSets} from '../config.js'

const mock = {
  firstname: 'John',
  lastname: 'Snow',
  email: 'iknownothing@snow.com',
  password: 'ygridiloveyou',
}

const {id, email} = mock
const token = jwt.sign({id, email}, secret, tokenSets)
mock.token = token
mock.invalidToken = token.replace(/^.{2}/, 'aa')

module.exports = mock
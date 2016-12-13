import Users from '../../sources/users/users.model.js'
import mock from '../../sources/users/users.mock.js'
// import {secret, token} from '../../sources/config.js'
// import jwt from 'jsonwebtoken'

before(disableConsoleInfo)
before(mockUser)

function disableConsoleInfo() {
  console.info = function() {}
}

function mockUser() {
  const user = new Users(mock)

  return user.save()
}

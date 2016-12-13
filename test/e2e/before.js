import Users from '../../sources/users/users.model.js'
import mock from '../../sources/users/users.mock.js'

before(disableConsoleInfo)
before(mockUser)

function disableConsoleInfo() {
  console.info = function() {}
}

function mockUser() {
  const user = new Users(mock)

  return user
    .save()
    .then(setUserId)

  function setUserId(user) {
    mock.id = user._id
  }
}

import Users from '../../sources/users/users.model.js'

after(removeUsers)

function removeUsers() {
  return Users.remove({})
}

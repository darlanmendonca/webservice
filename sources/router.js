const {Router} = require('express')
const users = require('./users/users.controller.js')
const validate = require('./validate/validate.controller.js')

const router = Router()

router
  .route('/users/authenticate')
  .post(users.authenticate)

router.use(validate.token)

// router.param('id', validate.id)

router
  .route('/users')
  .get(users.list)
  .post(users.create)

router
  .route('/users/:id')
  .get(users.get)
  .put(users.edit)
  .delete(users.disable)

module.exports = router

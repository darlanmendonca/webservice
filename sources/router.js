import {Router} from 'express'
import users from './users/users.controller.js'
import validate from './validate/validate.controller.js'

const router = Router()

router.param('id', validate.id)

router
  .route('/users/authenticate')
  .post(users.authenticate)

router
  .route('/users')
  .get(users.list)
  .post(users.create)

router
  .route('/users/:id')
  .get(users.get)
  .delete(users.disable)

module.exports = router

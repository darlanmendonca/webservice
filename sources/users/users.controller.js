import Users from './users.model.js'
import encode from '../encode/encode.helper.js'
import jwt from 'jsonwebtoken'
import {secret, token as tokenSets} from '../config.js'

const privateFields = '-password -__v'

module.exports = {
  list,
  get,
  create,
  disable,
  authenticate,
}

function list(req, res) {
  Users
    .find({active: {$ne: false}}, privateFields)
    .then(users => res.json(users))
}

function get(req, res) {
  Users
    .findById(req.params.id, privateFields)
    .then(user => res.json(user))
}

function create(req, res) {
  const user = Users(req.body)

  user
    .save()
    .then(() => res.status(201).json({message: 'created'}))
    .catch((err) => {
      res.status(400).json({message: err.message})
    })
}

function disable(req, res) {
  Users
    .findByIdAndUpdate(req.params.id, {$set: {active: false}})
    .then(() => res.json({message: 'deleted'}))
}

function authenticate(req, res) {
  const email = req.body.email
  const password = encode.md5(req.body.password)
  const active = true

  Users
    .findOne({email, password, active})
    .then(generateToken)

  function generateToken(user) {
    if (!user) {
      return res
        .status(401)
        .json({message: 'invalid credentials'})
    }

    const id = user.id
    const token = jwt.sign({id, email}, secret, tokenSets)
    res.json({id, token})
  }
}
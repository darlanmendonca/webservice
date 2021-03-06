const Users = require('./users.model.js')
const encode = require('../encode/encode.helper.js')
const jwt = require('jsonwebtoken')
const {isValid: isValidId} = require('valid-objectid')
const {secret, token: tokenSets} = require('../config.js')

module.exports = {
  list,
  get,
  create,
  edit,
  disable,
  authenticate,
}

function list(req, res) {
  Users
    .find({active: {$ne: false}})
    .then(users => {
      users.length
        ? res.json(users)
        : res.status(204).json(users)
    })
}

function get(req, res) {
  const username = req.params.id

  const query = isValidId(req.params.id)
    ? Users.findById(req.params.id)
    : Users.findOne({username})

  query.then(user => {
    user
      ? res.json(user)
      : res.status(404).json(user)
  })

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

function edit(req, res) {
  // const username = req.params.username

  Users
    // .findOneAndUpdate({username}, {$set: req.body})
    .findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(function(user) {
      if (!user) {
        return res
          .status(400)
          .json({message: 'not found'})
      }

      res.json({message: 'updated'})
    })
}

function disable(req, res) {
  // const username = req.params.username

  Users
    // .findOneAndUpdate({username}, {$set: {active: false}})
    .findByIdAndUpdate(req.params.id, {$set: {active: false}})
    .then(() => res.json({message: 'deleted'}))
}

function authenticate(req, res) {
  const email = req.body.email
  const password = encode.md5(req.body.password)
  // const active = true

  Users
    .findOne({email, password})
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

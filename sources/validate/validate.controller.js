const {isValid: isValidId} = require('valid-objectid')
const jwt = require('jsonwebtoken')
const {secret} = require('../config.js')

module.exports = {
  id,
  token,
}

function id(req, res, next, value) {
  if (!isValidId(value)) {
    const message = 'invalid id'
    return res
      .status(400)
      .json({message})
  }

  next()
}

function token(req, res, next) {
  const token = req.headers.authorization
    || req.body.authorization
    || req.query.authorization

  if (!token) {
    const message = 'required token'
    return res
      .status(401)
      .json({message})
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      const message = 'invalid token'
      return res
        .status(401)
        .json({message})
    }

    req.token = decoded
    next()
  })
}

import {isValid as isValidId} from 'valid-objectid'
import jwt from 'jsonwebtoken'

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
  const token = req.headers.token 
    || req.body.token 
    || req.query.token

  jwt.verify(token, 'mewhcvdf', (err, decoded) => {
    if (err) {
      const message = 'invalid token'
      return res
        .status(401)
        .json({message})
    }

    req.decoded = decoded
    next()
  })

}
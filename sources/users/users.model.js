const mongoose = require('mongoose')
const privates = require('mongoose-private')
const encode = require('../encode/encode.helper.js')

const schema = new mongoose.Schema({
  username: {type: String, trim: true, lowercase: true, required: true, unique: true},
  firstname: {type: String, trim: true, required: true},
  lastname: {type: String, trim: true, required: true},
  email: {type: String, trim: true, required: true, unique: true},
  password: {type: String, set: encode.md5, private: true},
  active: {type: Boolean, default: true},
  __v: {type: Number, private: true},
})

schema.plugin(privates)

module.exports = mongoose.model('users', schema)


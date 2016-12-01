import mongoose from 'mongoose'
import encode from '../encode/encode.helper.js'

const schema = new mongoose.Schema({
  firstname: {type: String, trim: true, required: true},
  lastname: {type: String, trim: true, required: true},
  email: {type: String, trim: true, required: true, unique: true},
  active: {type: Boolean, default: true},
  password: {type: String, required: true, set: encode.md5},
})

module.exports = mongoose.model('users', schema)


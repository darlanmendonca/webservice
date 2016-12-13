import mongoose from 'mongoose'
import encode from '../encode/encode.helper.js'

const schema = new mongoose.Schema({
  firstname: {type: String, trim: true, required: true},
  lastname: {type: String, trim: true, required: true},
  email: {type: String, trim: true, required: true, unique: true},
  password: {type: String, required: true, set: encode.md5},
  active: {type: Boolean, default: true},
})

module.exports = mongoose.model('users', schema)


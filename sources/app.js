import express from 'express'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import router from './router.js'
import {urlencoded, json} from 'body-parser'
import gzip from 'compression'

const webservice = express()
const port = process.env.PORT || 3000

webservice
  .use(urlencoded({extended: true}))
  .use(json())
  .use(gzip())
  .use(router)

mongoose.Promise = bluebird

mongoose.connect('localhost/webservice', err => {
  if (err) {
    return console.error('error on connect db')
  }
  webservice.listen(port, () => console.info(`localhost:${port}`))    
})

module.exports = webservice;


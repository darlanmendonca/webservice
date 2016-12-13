import express from 'express'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import router from './router.js'
import {urlencoded, json} from 'body-parser'
import gzip from 'compression'
import {port, database} from './config.js'
console.log(database)

const webservice = express()

webservice
  .use(urlencoded({extended: true}))
  .use(json())
  .use(gzip())
  .use(router)

mongoose.Promise = bluebird

mongoose
  .connect(`mongodb://localhost/${database}`)
  .then(() => webservice.listen(port, () => console.info(`localhost:${port}`)))
  .catch(err => console.error('error on connect db'))

module.exports = webservice;


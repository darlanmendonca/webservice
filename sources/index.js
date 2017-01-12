import express from 'express'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import router from './router.js'
import methodOverride from 'method-override'
import multer from 'multer'
import {urlencoded, json} from 'body-parser'
import cors from 'cors'
import gzip from 'compression'
import {port, database} from './config.js'
import filter from './filter/filter.helper.js'

const webservice = express()

webservice
  .use(cors())
  .use(gzip())
  .use(methodOverride())
  .use(multer().array())
  .use(urlencoded({extended: true}))
  .use(json())
  .use(filter)
  .use(router)

mongoose.Promise = bluebird

mongoose
  .connect(`mongodb://localhost/${database}`)
  .then(() => webservice.listen(port, () => console.info(`localhost:${port}`)))
  .catch(() => console.error('error on connect db'))

module.exports = webservice


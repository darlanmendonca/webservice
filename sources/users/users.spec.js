import webservice from '../index.js'
import chai from 'chai';
import chaiHttp from 'chai-http'
import {request, expect} from 'chai'
import user from './users.mock.js'

chai.use(chaiHttp)

describe('Users', () => {
  describe('.authenticate - POST /users/authenticate', () => {
    it('invalid credentials', (done) => {
      request(webservice)
        .post('/users/authenticate')
        .field('email', user.email)
        .field('password', user.invalidPassword)
        .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res).to.be.json
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })
  })
})
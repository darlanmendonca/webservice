import webservice from '../index.js'
import chai from 'chai';
import chaiHttp from 'chai-http'
import {request, expect} from 'chai'

chai.use(chaiHttp)

describe('Users', () => {
  describe('.authenticate - POST /users/authenticate', () => {
    it('invalid credentials', () => {
      request(webservice)
        .post('/users/authenticate')
        .field('email', 'email@gmail.com')
        .field('password', 'passWrong')
        .catch(err => {
          const {status, response} = err
          expect(status).to.equal(401);
          expect(response.body).to.have.property('message', 'invalid credentials');
        })
    })
  })
})
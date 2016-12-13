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
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('require email', (done) => {
      request(webservice)
        .post('/users/authenticate')
        .field('email', user.email)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('require password', (done) => {
      request(webservice)
        .post('/users/authenticate')
        .field('password', user.password)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid credentials')
          done()
        })
    })

    it('valid credentials', (done) => {
      request(webservice)
        .post('/users/authenticate')
        .field('email', user.email)
        .field('password', user.password)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })
})
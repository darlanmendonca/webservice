const webservice = require('../index.js')
const {request, expect} = require('chai')
const user = require('./users.mock.js')

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

  describe('.list - GET /users', () => {
    it('required token', (done) => {
      request(webservice)
        .get('/users')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'required token')
          done()
        })
    })

    it('invalid token from query', (done) => {
      request(webservice)
        .get('/users')
        .query({authorization: user.invalidToken})
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('invalid token from body', (done) => {
      request(webservice)
        .get('/users')
        .field('authorization', user.invalidToken)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('invalid token from header', (done) => {
      request(webservice)
        .get('/users')
        .set('authorization', user.invalidToken)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('list users', (done) => {
      request(webservice)
        .get('/users')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('filters', (done) => {
      request(webservice)
        .get('/users')
        .set('filters', 'email,firstname')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body).all.have.property('email')
          expect(res.body).all.have.property('firstname')
          expect(res.body).all.not.have.property('password')
          expect(res.body).all.not.have.property('lastname')
          done()
        })
    })

    it('private fields', (done) => {
      request(webservice)
        .get('/users')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body).all.not.have.property('password')
          expect(res.body).all.not.have.property('__v')
          done()
        })
    })
  })

  describe('.get - GET /users/:id', () => {
    it('required token', (done) => {
      request(webservice)
        .get(`/users/${user.username}`)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'required token')
          done()
        })
    })

    it('invalid token', (done) => {
      request(webservice)
        .get(`/users/${user.username}`)
        .set('authorization', user.invalidToken)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message', 'invalid token')
          done()
        })
    })

    it('user not found', (done) => {
      request(webservice)
        .get('/users/loremipsum')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(404)
          expect(res.body).to.be.null
          done()
        })
    })

    it('get by username', (done) => {
      request(webservice)
        .get(`/users/${user.username}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
    })

    it('get by id', (done) => {
      request(webservice)
        .get(`/users/${user.id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
    })

    it('filters', (done) => {
      request(webservice)
        .get(`/users/${user.username}`)
        .set('authorization', user.token)
        .set('filters', 'email,firstname,password')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('firstname')
          expect(res.body).to.not.have.property('password')
          done()
        })
    })

    it('private fields', (done) => {
      request(webservice)
        .get(`/users/${user.username}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.not.have.property('password')
          expect(res.body).to.not.have.property('__v')
          done()
        })
    })
  })

  describe('.edit - PUT /users/:id', () => {
    it('edit', (done) => {
      request(webservice)
        .put(`/users/${user.id}`)
        .set('authorization', user.token)
        .field('firstname', user.firstname + 's')
        .end((err, res) => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          done()
        })
    })
  })
})

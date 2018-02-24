process.env.NODE_ENV = 'test'
 
const mongoose = require('mongoose')
const User = require('../src/api/user/user')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/loader')

const should = chai.should()
 
chai.use(chaiHttp)
 
describe('Users', () => {
    
    let user = {
        name: "Test User",
        email:"test@test.com",
        password: '123'
    }

    let token

    before((done) => { 
        User.remove({name: { $ne: 'Dummy' } }, function(error) {
            done()
        })
    })

    /**
     * Test: /POST
     */
    describe('/POST User', () => {

        it('should create User', (done) => {
            chai.request(server)
            .post('/api/users')
            .send(user)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')        
                res.body.should.have.property('name').eql(user.name)
                res.body.should.have.property('email').eql(user.email)
                user= res.body
                done()
            })
        })

        it('should do login', (done) => {
            
            chai.request(server)
            .post('/api/users/login')
            .send({ email:"test@test.com",
            password: '123' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.property('status').eql('success')
                res.body.should.have.property('message').eql('Logged successfully')
                token = res.body.token
                done()
            })
        })

        it('should return false to invalid token', (done) => {
            chai.request(server)
            .post('/api/users/validateToken')
            .send({ token:'' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.property('valid').eql(false)
            done()
            })
        })

        it('should return true to valid token', (done) => {
            chai.request(server)
            .post('/api/users/validateToken')
            .send({ token })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.property('valid').eql(true)
            done()
            })
        })
    })

    /**
     * Test: /GET
     */
    describe('/GET User', () => {
        
        it('should get all Users', (done) => {
            chai.request(server)
            .get('/api/users')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(2)
            done()
            })
        })

        it('should get Users with query', (done) => {
            chai.request(server)
            .get('/api/users?name__regex=/Dummy/')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })
    })

    /**
     * Test: /PUT
     */
    describe('/PUT User', () => {
        
        it('should not update User without auth', (done) => {
            chai.request(server)
            .put(`/api/users/${user._id}`)
            .send({ image:'someImage' })
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should update User with auth', (done) => {
            chai.request(server)
            .put(`/api/users/${user._id}`)
            .set('x-access-token', 'dummy-token')
            .send({ name:'New Name' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')         
                res.body.should.have.property('name').eql('New Name')
                user = res.body
                done()
            })
        })
    })

    /**
     * Test: /DELETE
     */
    describe('/DELETE User', () => {
        
        it('should not delete User without auth', (done) => {
            chai.request(server)
            .delete(`/api/users/${user._id}`)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should delete User with auth', (done) => {
            chai.request(server)
            .delete(`/api/users/${user._id}`)
            .set('x-access-token', 'dummy-token')
            .end((error, res) => {
                res.should.have.status(204)
                done()
            })
        })
    })
})
process.env.NODE_ENV = 'test'
 
const mongoose = require('mongoose')
const Club = require('../src/api/club/club')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/loader')

const should = chai.should()
 
chai.use(chaiHttp)
 
describe('Clubs', () => {
    
    let club = {
        message: "Dummy Club",
        name: "Dummy"
    }

    before((done) => { 
        Club.remove({}, function(error) {
            done()
        })
    })

    /**
     * Test: /POST
     */
    describe('/POST club', () => {

        it('should not create club without auth', (done) => {
    
            chai.request(server)
            .post('/api/clubs')
            .send(club)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should create club with auth', (done) => {
    
            chai.request(server)
            .post('/api/clubs')
            .set('x-access-token', 'dummy-token')
            .send(club)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')         
                res.body.should.have.property('participants').eql([])
                res.body.should.have.property('message').eql(club.message)
                res.body.should.have.property('name').eql(club.name)
                club = res.body
                done()
            })
        })
    })

    /**
     * Test: /GET
     */
    describe('/GET club', () => {
        
        it('should get all clubs', (done) => {
            chai.request(server)
            .get('/api/clubs')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get clubs with query', (done) => {
            chai.request(server)
            .get('/api/clubs?name__regex=/Dummy/')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get myclubs', (done) => {
            chai.request(server)
            .get('/api/clubs/myclubs?user_id=DummyUser&name=')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
            done()
            })
        })

    })

    /**
     * Test: /PUT
     */
    describe('/PUT club', () => {
        
        it('should not update club without auth', (done) => {
            chai.request(server)
            .put(`/api/clubs/${club._id}`)
            .send({ image:'someImage' })
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should update club with auth', (done) => {
            chai.request(server)
            .put(`/api/clubs/${club._id}`)
            .set('x-access-token', 'dummy-token')
            .send({ image:'someImage' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')         
                res.body.should.have.property('participants').eql([])
                res.body.should.have.property('message').eql(club.message)
                res.body.should.have.property('name').eql(club.name)
                res.body.should.have.property('image').eql('someImage')
                club = res.body
                done()
            })
        })
    })

    /**
     * Test: /DELETE
     */
    describe('/DELETE club', () => {
        
        it('should not delete club without auth', (done) => {
            chai.request(server)
            .delete(`/api/clubs/${club._id}`)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should delete club with auth', (done) => {
            chai.request(server)
            .delete(`/api/clubs/${club._id}`)
            .set('x-access-token', 'dummy-token')
            .end((error, res) => {
                res.should.have.status(204)
                done()
            })
        })
    })
})
process.env.NODE_ENV = 'test'
 
const mongoose = require('mongoose')
const Comment = require('../src/api/comment/comment')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/loader')

const should = chai.should()
 
chai.use(chaiHttp)
 
describe('Comments', () => {
    
    let comment = {
        comment: "Dummy Comment",
        book:"Book_Id",
        owner: "5a907779f8c1033b7c83098f"
    }

    before((done) => { 
        Comment.remove({}, function(error) {
            done()
        })
    })

    /**
     * Test: /POST
     */
    describe('/POST Comment', () => {

        it('should not create Comment without auth', (done) => {
    
            chai.request(server)
            .post('/api/comments')
            .send(comment)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should not create Comment without required fields auth', (done) => {
            
            chai.request(server)
            .post('/api/comments')
            .set('x-access-token', 'dummy-token')
            .send({ })
            .end((error, res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('should create Comment with auth', (done) => {
            chai.request(server)
            .post('/api/comments')
            .set('x-access-token', 'dummy-token')
            .send(comment)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')        
                res.body.should.have.property('comment').eql(comment.comment)
                res.body.should.have.property('book').eql(comment.book)
                comment = res.body
                done()
            })
        })
    })

    /**
     * Test: /GET
     */
    describe('/GET Comment', () => {
        
        it('should get all Comments', (done) => {
            chai.request(server)
            .get('/api/comments')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get Comments with query', (done) => {
            chai.request(server)
            .get('/api/comments?comment__regex=/Dummy/')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get comments populated', (done) => {
            chai.request(server)
            .get('/api/comments/populated?id=Book_Id&type=Book')
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
    describe('/PUT Comment', () => {
        
        it('should not update Comment without auth', (done) => {
            chai.request(server)
            .put(`/api/comments/${comment._id}`)
            .send({ image:'someImage' })
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should update Comment with auth', (done) => {
            chai.request(server)
            .put(`/api/comments/${comment._id}`)
            .set('x-access-token', 'dummy-token')
            .send({ comment:'newComment' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')         
                res.body.should.have.property('comment').eql('newComment')
                res.body.should.have.property('book').eql(comment.book)
                comment = res.body
                done()
            })
        })
    })

    /**
     * Test: /DELETE
     */
    describe('/DELETE Comment', () => {
        
        it('should not delete Comment without auth', (done) => {
            chai.request(server)
            .delete(`/api/comments/${comment._id}`)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should delete Comment with auth', (done) => {
            chai.request(server)
            .delete(`/api/comments/${comment._id}`)
            .set('x-access-token', 'dummy-token')
            .end((error, res) => {
                res.should.have.status(204)
                done()
            })
        })
    })
})
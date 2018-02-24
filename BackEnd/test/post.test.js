process.env.NODE_ENV = 'test'
 
const mongoose = require('mongoose')
const Post = require('../src/api/post/post')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/loader')

const should = chai.should()
 
chai.use(chaiHttp)
 
describe('Posts', () => {

    let user = {
        image: "https://d27t3nufpewl0w.cloudfront.net/lichess/c3b7a4056648eee321795bf57a44a17cb01b7a18_studying.png",
        createdAt: "2018-02-23T20:20:09.006Z",
        _id: "5a907779f8c1033b7c83098f",
        name: "Dummy",
        password: "$2a$08$dXnAsS1opnNJTvVRlo4QkuEiwnUkS8Ji8FAZfJ53WBxJJ0KBwHxOS",
        email: "dummy@gmail.com",
    }
    
    let post = {
        message: "Dummy Message",
        book:"Book_Id",
        title: 'Some Title'
    }

    before((done) => { 
        Post.remove({}, function(error) {
            done()
        })
    })

    /**
     * Test: /POST
     */
    describe('/POST Post', () => {

        it('should not create Post without auth', (done) => {
    
            chai.request(server)
            .post('/api/posts')
            .send(post)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should create Post with auth', (done) => {
            chai.request(server)
            .post('/api/posts')
            .set('x-access-token', 'dummy-token')
            .send(post)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')        
                res.body.should.have.property('message').eql(post.message)
                res.body.should.have.property('book').eql(post.book)
                res.body.should.have.property('title').eql(post.title)
                post = res.body
                done()
            })
        })
    })

    /**
     * Test: /GET
     */
    describe('/GET Post', () => {
        
        it('should get all Posts', (done) => {
            chai.request(server)
            .get('/api/posts')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get Posts with query', (done) => {
            chai.request(server)
            .get('/api/posts?message__regex=/Dummy/')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
            done()
            })
        })

        it('should get bad request with wrong club_id type  on posts populated', (done) => {
            chai.request(server)
            .get('/api/posts/populated?club=Book_Id')
            .end((error, res) => {
                res.should.have.status(400)
            done()
            })
        })

    })

    /**
     * Test: /PUT
     */
    describe('/PUT Post', () => {
        
        it('should not update Post without auth', (done) => {
            chai.request(server)
            .put(`/api/posts/${post._id}`)
            .send({ image:'someImage' })
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should update Post with auth', (done) => {
            chai.request(server)
            .put(`/api/posts/${post._id}`)
            .set('x-access-token', 'dummy-token')
            .send({ message:'newPostMessage' })
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')         
                res.body.should.have.property('message').eql('newPostMessage')
                res.body.should.have.property('book').eql(post.book)
                res.body.should.have.property('title').eql(post.title)
                post = res.body
                done()
            })
        })
    })

    /**
     * Test: /DELETE
     */
    describe('/DELETE Post', () => {
        
        it('should not delete Post without auth', (done) => {
            chai.request(server)
            .delete(`/api/posts/${post._id}`)
            .end((error, res) => {
                res.should.have.status(403)
                res.body.should.be.a('object')         
                res.body.should.have.property('auth').eql(false)
                done()
            })
        })

        it('should delete Post with auth', (done) => {
            chai.request(server)
            .delete(`/api/posts/${post._id}`)
            .set('x-access-token', 'dummy-token')
            .end((error, res) => {
                res.should.have.status(204)
                done()
            })
        })
    })
})
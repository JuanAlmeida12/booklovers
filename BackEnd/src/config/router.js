const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Book Routes
    const bookService = require('../api/book/bookService')
    bookService.register(router, '/books')

    // Comment Routes
    const commentService = require('../api/comment/commentService')
    commentService.register(router, '/comments')

    // User Routes
    const userService = require('../api/user/userService')
    userService.register(router, '/users')
}
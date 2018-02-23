const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Ad Routes
    const clubService = require('../api/club/clubService')
    clubService.register(router, '/clubs')

    // Comment Routes
    const commentService = require('../api/comment/commentService')
    commentService.register(router, '/comments')

    // Post Routes
    const postService = require('../api/post/postService')
    postService.register(router, '/posts')

    // Wish Routes
    const wishService = require('../api/wish/wishService')
    wishService.register(router, '/wishes')

    // User Routes
    const userService = require('../api/user/userService')
    userService.register(router, '/users')
}
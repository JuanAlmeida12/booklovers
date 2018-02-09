const Comment = require('./comment')
const auth = require('../../config/middleware/auth/auth')

Comment.methods(['get', 'post', 'put', 'delete'])
Comment.updateOptions({new: true, runValidators: true})

Comment.before('post', auth)
Comment.before('put', auth)
Comment.before('delete', auth)

module.exports = Comment
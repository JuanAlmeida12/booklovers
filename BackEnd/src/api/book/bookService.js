const Book = require('./book')
const auth = require('../../config/middleware/auth/auth')

Book.methods(['get', 'post', 'put', 'delete'])
Book.updateOptions({new: true, runValidators: true})

Book.before('post', auth)
Book.before('put', auth)
Book.before('delete', auth)

module.exports = Book
const Wish = require('./wish')
const auth = require('../../config/middleware/auth/auth')

Wish.methods(['get', 'post', 'put', 'delete'])
Wish.updateOptions({new: true, runValidators: true})

Wish.before('post', auth)
Wish.before('put', auth)
Wish.before('delete', auth)

Wish.route('verify', ['get'], (req, res, next) => {
    const user_id = req.query.user_id
    const book_id = req.query.book_id

    console.log(user_id)
    console.log(book_id)

    Wish.findOne({ owner: user_id, book: book_id }, (err, wish) => {
        if(err){
            console.log(err.message)
        }
        if(wish) {
           return res.status(200).send({valid: true , id: wish._id })
        }
        return res.status(200).send({valid: false})
    })
})

module.exports = Wish
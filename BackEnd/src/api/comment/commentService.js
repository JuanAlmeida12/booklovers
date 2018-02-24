const Comment = require('./comment')
const auth = require('../../config/middleware/auth/auth')

Comment.methods(['get', 'post', 'put', 'delete'])
Comment.updateOptions({new: true, runValidators: true})

Comment.before('post', auth)
Comment.before('put', auth)
Comment.before('delete', auth)

Comment.route('populated', ['get'], (req, res, next) => {
    const id = req.query.id
    const type = req.query.type

    if(!id) {
        return res.status(400).send({message:'id is Required'})
    }

    if(!type) {
        return res.status(400).send({message:'type is Required'})
    }

    let query
    if(type === 'Book') {
        query = {
            book: id
        }
    } else if (type === 'Post') {
        query = {
            post: id
        }
    }

    Comment.find(query).sort([['createdAt' ,-1]]).populate('owner').exec( (err, comments) =>{
        if(err) {
            res.status(400).send(err)
        }
        res.json(comments)
    })
})

module.exports = Comment
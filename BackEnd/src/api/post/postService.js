const Post = require('./post')
const auth = require('../../config/middleware/auth/auth')

Post.methods(['get', 'post', 'put', 'delete'])
Post.updateOptions({new: true, runValidators: true})

Post.before('post', auth)
Post.before('put', auth)
Post.before('delete', auth)

Post.route('populated', ['get'], (req, res, next) => {
    const club = req.query.club

    if(!club) {
        return res.status(400).send({message:'club is Required'})
    }

    Post.find({ club }).sort([['createdAt' ,-1]]).populate('createdBy').exec( (err, posts) =>{
        if(err) {
            res.status(400).send(err)
        }
        res.json(posts)
    })
})

module.exports = Post
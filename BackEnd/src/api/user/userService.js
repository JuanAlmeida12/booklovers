const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./user')
const authSecret = require('../../config/middleware/auth/auth.config')

User.methods(['get', 'post'])
User.updateOptions({new: true, runValidators: true})

User.route('login', ['post'] ,( req, res, next ) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.status(404).send({ 
                status:'failed',
                status_code: 404, 
                message:'No user found.',
                token: null,
                user: null 
            })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) 
            return res.status(401).send({ 
                status:"failed",
                status_code: 401, 
                message:'Wrong Password',
                token: null,
                user: null })
        const token = jwt.sign({ id: user.email }, authSecret.secret, {
            expiresIn: 86400
        })

        res.status(200).send({
            status:"success",
            status_code: 200,
            message:'Logged successfully',
            token: token,
            user: user })
    })    
})

User.route('validateToken',['post'], (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, authSecret.secret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
})

User.before('post', (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
})

module.exports = User
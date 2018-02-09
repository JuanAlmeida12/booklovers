const jwt = require('jsonwebtoken')
const config = require('./auth.config.json')

function verifyToken(req, res, next) {

    var token = req.headers['x-access-token']
    if (!token)
        return res.status(403).send({ status_code:403, auth: false, message: 'No token provided.' })

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(403).send({ status_code:403, auth: false, message: 'Failed to authenticate token.' })

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id
        next()
    })

}

module.exports = verifyToken;
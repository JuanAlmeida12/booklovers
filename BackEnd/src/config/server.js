const port = 3000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const morgan = require('morgan')
const allowCors = require('./middleware/access_control/cors')
const config = require('config')

const logger = require('../util/logger')

if(config.util.getEnv('NODE_ENV') !== 'test') {
    server.use(morgan('combined'));
}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, function() {
    logger.server_start(port)
})

module.exports = server
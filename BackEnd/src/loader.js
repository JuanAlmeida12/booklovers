const server = require('./config/server')
require('./config/database/database')
require('./config/router')(server)

module.exports = server
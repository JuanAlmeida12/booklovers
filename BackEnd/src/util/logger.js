var info = function(message) {
    console.log(`INFO: ${message}`)
}

var error = function(message) {
    console.error(`ERROR: ${message}`)
}

var server_start = function(port) {
    console.log(`Server started on port: ${port}`)
}

module.exports = { info, error, server_start }
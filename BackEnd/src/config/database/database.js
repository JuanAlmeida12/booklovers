const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://default:123@ds125628.mlab.com:25628/blovers')
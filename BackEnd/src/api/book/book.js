const restful = require('node-restful')
const mongoose = restful.mongoose

const bookSchema = new mongoose.Schema({
    sinopse: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, require: true },
    language: { type: String, require: true },
    rate: { type: Number, default: 0 },
    image: { type: String, default: 'http://clipart-library.com/images/AibKoKa7T.jpg' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Book', bookSchema)
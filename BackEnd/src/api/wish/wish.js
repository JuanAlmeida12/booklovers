const restful = require('node-restful')
const mongoose = restful.mongoose

const wishSchema = new mongoose.Schema({
    book: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Wish', wishSchema)
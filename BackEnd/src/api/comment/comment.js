const restful = require('node-restful')
const mongoose = restful.mongoose

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', require: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Comment', commentSchema)
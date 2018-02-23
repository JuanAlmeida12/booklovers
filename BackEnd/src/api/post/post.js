const restful = require('node-restful')
const mongoose = restful.mongoose

const postSchema = new mongoose.Schema({
    message: { type: String, default: '' },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    title: { type: String, default: [] },
    thumbnail: { type: String },
    book: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Post', postSchema)
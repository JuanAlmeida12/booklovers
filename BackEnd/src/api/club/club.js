const restful = require('node-restful')
const mongoose = restful.mongoose

const clubSchema = new mongoose.Schema({
    message: { type: String },
    name: { type: String, required: true },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    participants: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Club', clubSchema)
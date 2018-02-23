const restful = require('node-restful')
const mongoose = restful.mongoose

const notificationSchema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Notification', notificationSchema)
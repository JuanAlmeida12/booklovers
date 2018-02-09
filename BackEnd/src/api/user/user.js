const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    level: { type: Number, default: 0 },
    image: { type: String, default: 'https://d27t3nufpewl0w.cloudfront.net/lichess/c3b7a4056648eee321795bf57a44a17cb01b7a18_studying.png' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('User', userSchema)
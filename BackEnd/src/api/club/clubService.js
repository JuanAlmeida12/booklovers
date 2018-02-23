const Club = require('./club')
const auth = require('../../config/middleware/auth/auth')
const mongoose = require('mongoose');

Club.methods(['get', 'post', 'put', 'delete'])
Club.updateOptions({new: true, runValidators: true})

Club.before('post', auth)
Club.before('put', auth)
Club.before('delete', auth)

Club.route('verify', ['get'], (req, res, next) => {
    const user_id = req.query.user_id
    const club_id = req.query.club_id

    console.log(user_id)
    console.log('----------------')

    Club.findOne({  _id: club_id, participants:  { $in : [user_id] }}, (err, club) => {
        if(err){
            console.log(err.message)
        }
        if(club) {
            return res.status(200).send({participant: true })
        }
        return res.status(200).send({participant: false})
    })
})

Club.route('myclubs', ['get'], (req, res, next) => {
    const user_id = req.query.user_id
    const name = req.query.name


    console.log(name)

    Club.find({ participants:  { $in : [user_id] }, name: { $regex: name, $options: 'i' } }, (err, clubs) => {
        if(err){
            console.log(err.message)
        }
        if(clubs) {
            console.log(clubs)
            return res.status(200).send(clubs)
        }
        return res.status(404)
    })
})

module.exports = Club
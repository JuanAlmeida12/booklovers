const Club = require('./club')
const auth = require('../../config/middleware/auth/auth')
const mongoose = require('mongoose')

Club.methods(['get', 'post', 'put', 'delete'])
Club.updateOptions({new: true, runValidators: true})

Club.before('post', auth)
Club.before('put', auth)
Club.before('delete', auth)

Club.route('verify', ['get'], (req, res, next) => {
    const user_id = req.query.user_id
    const club_id = req.query.club_id

    if(!club_id) {
        return res.status(400).send({message:'club_id is Required'})
    }

    if(!user_id) {
        return res.status(400).send({message:'user_id is Required'})
    }    

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

    if(!name) {
        return res.status(400).send({message:'name is Required'})
    }

    if(!user_id) {
        return res.status(400).send({message:'user_id is Required'})
    }

    Club.find({ participants:  { $in : [user_id] }, name: { $regex: name, $options: 'i' } }, (err, clubs) => {
        if(err){
            console.log(err.message)
        }
        if(clubs) {
            return res.status(200).send(clubs)
        }
        return res.status(404)
    })
})

module.exports = Club
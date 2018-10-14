const User = require('../models/user')
const Boom = require('boom')

exports.register = async (req, h) => {
    const userParams = req.payload.user

    if(!(userParams && userParams.email && userParams.password)){
        h.response(Boom.badData('Invalid data, Correctly enter email/password'))
    }

    const user = new User(userParams)
    user.setPassword(userParams.password)
    let response_data
    try{
        const res =  await user.save()
        response_data = {success: true, statusCode: 201}
    } catch(err){
        response_data = {success: false, statusCode: 422, message: err.message}
    }
    return response_data
}
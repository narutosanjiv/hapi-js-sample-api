const User = require('../models/user')
const Boom = require('boom')

exports.register = async (req, h) => {
    const userParams = req.payload.user

    if(!(userParams && userParams.email && userParams.password)){
        h.response(Boom.badData('Invalid data, Correctly enter email/password'))
    }

    const user = new User(userParams)
    user.setPassword(userParams.password)
    const res =  await user.save()
    return {success: true, statusCode: 201}
}
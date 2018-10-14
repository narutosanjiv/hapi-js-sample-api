const User = require('../models/user')

exports.register = async (req, h) => {
    const user = new User(req.user)
    user.setPassword(req.user.password)
    user.save(function(err){
        if(err){
            Boom.badData('Unable to Create a ')
        } else{
            h.response('created').code(201)
        }
    });
    
}
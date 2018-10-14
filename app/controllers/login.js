const User = require('../models/user')
exports.login = async(req, h) => {
    const email = req.payload.email;
    const password = req.payload.password;
    let query = User.find({email: email});
    query.exec(function(err, docs){
        if(err){
            Boom.unauthorized('invalid login email/password');
        } 
        if(!docs){
            Boom.notFound('Email is not registered')
        }  
        if(!docs.validPassword(password)){
            Boom.unauthorized('invalid login email/password');
        }
        const token = docs.generateJWT();
        const response = h.response('success');
        response.header('X-Auth-Token', token);
        return response
    })
}
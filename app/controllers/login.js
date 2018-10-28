const User = require('../models/user')
const Boom = require('boom')
exports.login = async(req, h) => {
    const email = req.payload.email;
    const password = req.payload.password;
    if(!(email && password)){
        throw Boom.unauthorized('Enter valid email/password')
    }
    let query = User.find({email: email});
    const promise = new Promise((resolve, reject) => {
        query.exec(function(err, docs){
            if(err){
                return resolve(reject(Boom.unauthorized('invalid login email/password')));
            } 
            doc = docs[0]
            if(!doc){
                return resolve(reject(Boom.notFound('Email is not registered')))
            }  
            if(!doc.validPassword(password)){
                return resolve(reject(Boom.unauthorized('invalid login email/password')));
            }
            const token = doc.generateJWT();
            const response = h.response({success: true});
            response.header('X-Auth-Token', token);
            resolve(response)
        })
    })
    return promise
}
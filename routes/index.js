const Joi = require('joi');
const userCreate = require('../app/controllers/users')
const loginHandler = require('../app/controllers/login')

exports.routes =[
    { 
        method: 'POST', path: '/users', 
        options: { 
            auth: false,
            validate: {
                payload: {
                    user:{
                        email: Joi.string().email().required(),
                        password: Joi.string().min(2).max(200).required(),
                        firstname: Joi.string().min(2).max(200).required(),
                        gender: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required(),
                    }
                }
            }
        }, 
        handler: userCreate.register 
    },
    { 
        method: 'POST', 
        path: '/login', 
        options: { auth: false }, 
        handler: loginHandler.login
    }
]


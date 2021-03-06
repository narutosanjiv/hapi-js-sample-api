const Joi = require('joi');
const userCreate = require('../app/controllers/users')
const loginHandler = require('../app/controllers/login')
const createEmployee = require('../app/controllers/employee').create
const listEmployees = require('../app/controllers/employee').list
const { show, deleteRecord, update } = require('../app/controllers/employee')

exports.routes =[
    { 
        method: 'POST', path: '/users', 
        options: { 
            auth: false,
            validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    user:{
                        email: Joi.string().email().required(),
                        password: Joi.string().min(2).max(200).required(),
                        firstname: Joi.string().min(2).max(200).required(),
                        gender: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required(),
                    }
                },
                failAction: (request, h, err) => {
                    throw err;
                    return;
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
    },
    {
        method: 'GET',
        path: '/v1/employees',
        handler: listEmployees,
        options: { 
            auth: 'jwt'
        }
    },
    {
        method: 'POST',
        path: '/v1/employees',
        handler: createEmployee,
        options: { 
            auth: 'jwt'
        }
    },
    {
        method: 'GET',
        path: '/v1/employees/{emp_uniq_id}',
        handler: show,
        options: {
            auth: 'jwt'
        }
    },
    {
        method: 'DELETE',
        path: '/v1/employees/{emp_uniq_id}',
        handler: deleteRecord,
        options: {
            auth: 'jwt'
        }
    },
    {
        method: 'PATCH',
        path: '/v1/employees/{emp_uniq_id}',
        handler: update,
        options: {
            auth: 'jwt'
        }
    }
]


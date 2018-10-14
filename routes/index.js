const userCreate = require('../app/controllers/users')
const loginHandler = require('../app/controllers/login')

exports.routes =[
    { method: 'POST', path: '/users', options: { auth: false }, handler: userCreate.register },
    { method: 'POST', path: '/login', options: { auth: false }, handler: loginHandler.login}
]


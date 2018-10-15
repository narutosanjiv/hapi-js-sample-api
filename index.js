'use strict';
require('dotenv').config()

const Hapi = require('hapi');
const mongooseDB = require('./config/database.js').connection;
const Route = require('./routes') 
const validate = async (decoded, request) =>{
    console.log(decoded)
    return { isValid: true }
}
const server_opts = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }]
    }
}
const init = async() =>{
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {cors: {origin: ['*']} }
    });

    await server.register([{plugin: require('good')}, {plugin: require('hapi-auth-jwt2'), options: server_opts}]);
    server.auth.strategy('jwt', 'jwt',
    { 
        key: 'NeverShareYourSecret',          // Never Share your secret key
        validate: validate,            // validate function defined above
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });

    server.auth.default('jwt');
    server.route(Route.routes)
    
    mongooseDB.once('open', async function(){
        await server.start();
        
    });
}


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then(function(info){
    console.log(`Server running`);
});


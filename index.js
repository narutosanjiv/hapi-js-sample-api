'use strict';

const Hapi = require('hapi');
const mongooseDB = require('./config/database.js').connection;
const Route = require('./routes') 
const validate = (req, h) =>{
    return true
}
const init = async() =>{
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {cors: {origin: ['*']} }
    });

    await server.register(require('hapi-auth-jwt2'));
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


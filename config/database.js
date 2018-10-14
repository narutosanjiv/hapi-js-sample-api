let mongoose = require('mongoose');
let options = { server: { socketOptions: { keepAlive: 1 } } }
let config = require('./environments/development.js')
mongoose.connect(config.db, options);

module.exports = mongoose;

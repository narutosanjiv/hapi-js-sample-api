
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;
const config = require('../../../config/common');
const UserSchema = new Schema({
    email: {type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true},
    firstname:  {type: String, required: true},
    lastname: String,
    gender:   {type: String, required: true},
    encrypted_password: {type: String, required: true},
    salt: {type: String, required: true}
}, {timestamps: true});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.encrypted_password === hash
  }
  
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.encrypted_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function () {
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000)
    }, config.auth.secret, {algorithm: config.auth.algorithm})
}

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    }
}

module.exports = UserSchema;
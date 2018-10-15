const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    emp_uniq_id: {type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true},
    email: {type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true},
    firstname:  {type: String, required: true},
    lastname: String,
    gender:   {type: String, required: true},
    designation: String,
    dob: String,
    doj: String
}, {timestamps: true});
employeeSchema.plugin(uniqueValidator);
module.exports = employeeSchema;
const mongoose = require('mongoose');
const employeeSchema = require('./schema/employee')
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee
const Employee = require('../models/employee')
const Boom = require('boom')
exports.create = async function(req, h){
    const employeeParams = req.payload.employee
    const employee = new Employee(employeeParams)
    let response_data;
    try{
        const res = await employee.save()
        response_data = {success: true, statusCode: 201}
    } catch(err){
        response_data = {success: false, statusCode: 422, message: err.message}
    }
    
    return response_data
}

exports.list = async (req, h) => {
    const employees = await Employee.find()
    return {success: true, statusCode: 200, employees: employees}
} 

exports.delete = async (req, h) => {
    const employee = await Employee.remove({emp_uniq_id: req.payload.emp_uniq_id})
    return {success: true, statusCode: 200, message: 'Employee Deleted Successfully.'}
} 
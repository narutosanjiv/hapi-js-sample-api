const Employee = require('../models/employee')
const Boom = require('boom')
exports.create = async function(req, h){
    const employeeParams = req.payload.employee
    const employee = new Employee(employeeParams)
    let response_data;
    try{
        const res = await employee.save()
        response_data = {success: true, statusCode: 201, employee: res}
    } catch(err){
        response_data = {success: false, statusCode: 422, message: err.message}
    }
    
    return response_data
}

exports.list = async (req, h) => {
    const employees = await Employee.find()
    return {success: true, statusCode: 200, employees: employees}
} 

exports.deleteRecord = async (req, h) => {
    const employee = await Employee.findOneAndDelete({emp_uniq_id: req.params.emp_uniq_id})
    return {success: true, statusCode: 200, message: 'Employee Deleted Successfully.'}
} 

exports.show = async(req, h) => {
    const employee = await Employee.find({emp_uniq_id: req.params.emp_uniq_id})
    return employee
}

exports.update = async(req, h) => {
    const employeeParams = req.payload.employee;
    let query = { emp_uniq_id: req.params.emp_uniq_id };
    try{
        const employee  = await Employee.findOneAndUpdate(query, employeeParams, {new: true})
        return employee
    }
    catch(err){
        return({success: false, statusCode: 422, message: err.message})
    }
}


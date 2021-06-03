const mongoose = require('mongoose')
const Departments = require('../models/departments')

const departmentController = {};


/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all Departments' data 
 */
 departmentController.getAll = async (req, res) => {
    try {
        const department = await Departments.find()
        res.json(department)
    }
    catch (err) {
        res.sendStatus(500)
    }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches one department
 */
 departmentController.getOne =  async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id) 
        const department = await Departments.findById(id)
        res.json(department)
    }
    catch (err) {
        res.sendStatus(500)
    }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Stores the data in database
 */

 departmentController.post =  async (req, res) => {
    const department = new Departments(req.body)
    try {
        await department.save()
        res.json(department)
    }
    catch (err) {
        res.sendStatus(500)
    }
}



/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Gets updated department data from request body and updates department using Departments Model
 */
 departmentController.update = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        let department = await Departments.findById(id);
        department.set(req.body);
        let updatedDepartment = await department.save();
        res.send(updatedDepartment);
    } catch (err) {
        res.sendStatus(500)
    }
}
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Deletes a department by given department id
 */

 departmentController.delete = async (req, res) => {
    try {
        const departmentId = mongoose.Types.ObjectId(req.params.id)
        const department = Departments.findById(departmentId)
        await Departments.deleteOne(department)
        res.send("Deleted Sucessfully")
    }
    catch (err) {
        res.sendStatus(500)
    }
}


module.exports = departmentController;



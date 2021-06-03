const mongoose = require('mongoose')
const Subjects = require('../models/subjects')

const subjectController = {};


/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all subjects' data 
 */
 subjectController.getAll = async (req, res) => {
    try {
        const subject = await Subjects.find()
        res.json(subject)
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
 * @description Fetches one subject
 */
 subjectController.getOne =  async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id) 
        const subject = await Subjects.findById(id)
        res.json(subject)
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

 subjectController.post =  async (req, res) => {
    const subject = new Subjects(req.body)
    try {
        await subject.save()
        res.json(subject)
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
 * @description Gets updated subject data from request body and updates subject using Subject Model
 */
subjectController.update = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        let subject = await Subjects.findById(id);
        subject.set(req.body);
        let updatedSubject = await subject.save();
        res.send(updatedSubject);
    } catch (err) {
        res.sendStatus(500)
    }
}
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Deletes a subject by given subject id
 */

subjectController.delete = async (req, res) => {
    try {
        const subjectId = mongoose.Types.ObjectId(req.params.id)
        const subject = Subjects.findById(subjectId)
        await Subjects.deleteOne(subject)
        res.send("Deleted Sucessfully")
    }
    catch (err) {
        res.sendStatus(500)
    }
}


module.exports = subjectController;



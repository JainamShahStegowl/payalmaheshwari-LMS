const Courses = require('../models/courses')
const Topics = require('../models/topics')
const  Users = require('../models/users').Users
const mongoose = require('mongoose')


const topicController = {};


/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all topics' data 
 */
topicController.getAll = async (req, res) => {
    try {
        const topic = await Topics.find()
        res.json(topic)
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
 * @description Fetches one topic
 */
topicController.getOne = async (req, res) => {
    try {
        let topicId = mongoose.Types.ObjectId(req.params.id)
        const topic = await Topics.findById(topicId)
        if (topic) {
            res.json(topic)
        }
        else {
            res.status(404).send("Topic Not Found")
        }
    }
    catch (err) {
        console.log(err);
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

topicController.post = async (req, res) => {
    try {
        let getUser = await Users.findById(req.body.user_id)
        let getCourse = await Courses.findById(req.body.course_id)

        if (!getUser || !getCourse) {
            res.status(404).send("Invalid UserId or CourseId")
        }

        if (getCourse.user_id == req.body.user_id) {
            const topic = new Topics(req.body)
            if (!req.body.parent_id) {
                topic.parent_id = null
            }
            await topic.save()
            res.json(topic)
        }
        else {
            res.status(401).send("unauthorized user to create topic")
        }
    }
    catch (err) {
        if (err.errors) {
            let errors = []
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    })
                }
            })
            return res.status(400).send(errors)
        }
        else {
            res.sendStatus(500)
        }
    }
}





/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Gets updated topic data from request body and updates topic using topic Model
 */
topicController.update = async (req, res) => {
    try {
        let topicId = mongoose.Types.ObjectId(req.params.id)
        let topic = await Topics.findById(topicId);
        let getUser = await Users.findById(req.body.user_id)
        let getCourse = await Courses.findById(req.body.course_id)

        if (!getUser || !getCourse) {
            res.status(404).send("Cannot update: User or Course Not Found")
        }
        if (topic){
            topic.set(req.body);
            let updatedTopic = await topic.save();
            res.send(updatedTopic);
        }
        else{
            res.status(404).send("Topic Not Found")
        }
    }   catch (err) {
        if (err.errors) {
            let errors = []
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    })
                }
            })
            return res.status(400).send(errors)
        }
        else {
            res.status(500).send(err.message)
        }
    }
}
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Deletes a topic by given topic id
 */

topicController.delete = async (req, res) => {
    try {
        const topicId = mongoose.Types.ObjectId(req.params.id)
        const topic = await Topics.findById(topicId)
        await Topics.deleteOne(topic)
        res.send("Deleted Sucessfully")
    }
    catch (err) {
        res.sendStatus(500)
    }
}


module.exports = topicController;



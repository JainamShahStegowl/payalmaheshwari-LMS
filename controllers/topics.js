const Courses = require('../models/courses')
const Topics = require('../models/topics')
const Users = require('../models/users')
const mongoose =  require('mongoose')


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
        res.send('Error' + err)
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
        const topic = await Topics.findById(req.params.id)
        if (topic) {
            res.json(topic)
        }
        else {
            res.send("Topic Not Found")
        }
    }
    catch (err) {
        res.send('Error: ' + err)
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
    const course = await Courses.findById(req.body.course_id)
    console.log(course)
    if (course.user_id == req.body.user_id) {
        const topic = new Topics(req.body)
        if (!req.body.parent_id) {
            topic.parent_id = topic._id
        }
        try {
            await topic.save()
            res.send("Posting the data")
        }
        catch (err) {
            res.send('Error: ' + err)
        }
    }
    else {
        res.status(401).send("unauthorized user to create topic")
    }
}


/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Gets updated topic data from request body and updates topic using topic Model
 */
 topicController.put =  async (req, res) => {
    try {
        let topic = await Topics.findById(req.params.id);
        topic.set(req.body);
        let updatedTopic = await topic.save();
        res.send(updatedTopic);
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).send("Error in request body data", err)
        }
        else {
            res.send('Error: ' + err)
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

 topicController.delete =  async (req, res) => {
    try {
        const topicId = mongoose.Types.ObjectId(req.params.id)
        Topics.exists(topicId, async (error, result) => {
            if (error) {
                console.log(error)
                res.send("Invalid TopicId")
            }
            else {
                const topic = await Topics.findById(topicId)
                await Topics.deleteOne(topic)
                res.send("Deleted Sucessfully")
            }
        })
    }
    catch (err) {
        res.send('Error: ' + err)
    }
}


module.exports = topicController;



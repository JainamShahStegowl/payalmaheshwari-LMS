const mongoose = require('mongoose')
const { Users, Roles } = require('../models/users')
const Courses = require('../models/courses')

const courseController = {};

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all courses' data 
 */
courseController.getAll = async (req, res, next) => {
    try {
        const allCourses = await Courses.find()
        const courses = allCourses.filter(course => {
            return course.is_deleted === false
        })
        res.json(courses)
    }
    catch (err) {
        res.send('Error' + err)
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches one course
 */
courseController.getOne = async (req, res, next) => {
    try {
        let CourseId = mongoose.Types.ObjectId(req.params.id)
        Courses.exists(CourseId, async (error, result) => {
            if (error) {
                res.send("Invalid CourseId")
            }
            else {
                const course = await Courses.findById(CourseId)
                if (course.is_deleted === false) {
                    res.json(course)
                }
                else {
                    res.send("This course has been deleted")
                }
            }
        })
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

courseController.post = async (req, res, next) => {
    try {
        let user = await (await Users.findById(req.body.user_id)).populate('role_id').execPopulate();
        if (user.role_id[0].name.toLowerCase() == "faculty") {
            const course = new Courses(req.body)
            await course.save()
            res.send("Posting the data")
        }
        else {
            res.status(401).send("You are not authorized")
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
 * @description Gets updated user data from request body and updates Course using Course Model
 */
courseController.update = async (req, res, next) => {
    try {
        let CourseId = mongoose.Types.ObjectId(req.params.id)
        let course = await Courses.findById(CourseId);
        course.set(req.body);
        let updatedcourse = await course.save();
        res.send(updatedcourse);
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
 * @description Deletes a user by given user id
 */

courseController.delete = async (req, res, next) => {
    try {
        let CourseId = mongoose.Types.ObjectId(req.params.id)
        Courses.exists(CourseId, async (error, result) => {
            if (error) {
                res.send("Invalid CourseId")
            }
            else {
                let course = await Courses.findById(CourseId);
                course.is_deleted = true
                course.save()
                res.send("Deleted Sucessfully")
            }
        })
    }
    catch (err) {
        res.send('Error: ' + err)
    }
}


module.exports = courseController;
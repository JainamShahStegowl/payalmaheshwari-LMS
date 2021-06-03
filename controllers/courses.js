const mongoose = require('mongoose')
const { Users, Roles } = require('../models/users')
const Courses = require('../models/courses')
const Subjects = require('../models/subjects')

const courseController = {};

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all courses' data 
 */
courseController.getAll = async (req, res, next) => {
    try {
        const allCourses = await Courses.find({ is_deleted: false })
        res.json(allCourses)
    }
    catch (err) {
        res.sendStatus(500)
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
        let course = await Courses.findById({"_id": CourseId, "is_deleted": false})

        if (course.length<1) {
            res.sendStatus(404)
        }
        else {
            res.json(course)
        }
    }
    catch (err) {
        console.log(err)
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

courseController.post = async (req, res, next) => {
    try {
        let getUser = await Users.findById(req.body.user_id)
        let getSubject = await Subjects.findById(req.body.subject_id)

        if (!getUser || !getSubject) {
            res.status(404).send("Invalid UserId or SubjectId")
        }
        else {
            let user = await getUser.populate('role_id').execPopulate();
            if (user.role_id[0].name.toLowerCase() == "faculty") {
                const course = new Courses(req.body)
                await course.save()
                res.json(course)
            }
            else {
                res.sendStatus(401)
            }
        }
    }
    catch (err) {
        res.status(500).send(err.message)
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
        let getUser = await Users.findById(req.body.user_id)
        let getSubject = await Subjects.findById(req.body.subject_id)

        if (!getUser || !getSubject) {
            res.status(404).send("Cannot update: User or Subject Not Found")
        }
        if (course){
            course.set(req.body);
            let updatedcourse = await course.save();
            res.send(updatedcourse);
        }
        else{
            res.status(404).send("Course Not Found")
        }

    }
    catch (err) {
        if (err.errors) {
            let errors = []
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name && value.name === "CastError") {
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
 * @description Deletes a user by given user id
 */

courseController.delete = async (req, res, next) => {
    try {
        let CourseId = mongoose.Types.ObjectId(req.params.id)
       
        const course = await Courses.find({"_id":CourseId, "is_deleted": false})
        if (course.length<1){
            res.sendStatus(404)
        }
        else{
            course[0].is_deleted = true
            course[0].save()
            res.send("Deleted Sucessfully");
        }
    
    }
    catch (err) {
        res.sendStatus(500)
    }
}


module.exports = courseController;
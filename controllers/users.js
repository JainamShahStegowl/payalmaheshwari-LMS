const mongoose = require('mongoose')
const Courses = require('../models/courses')
const bcrypt = require('bcryptjs')
const { Users, Roles } = require('../models/users')

const userController = {};

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Fetches all users' data 
 */
userController.getAll = async (req, res) => {
    try {
        const getUser = req.user
        if (getUser.role.toLowerCase() == "student") {
            const userGrade = getUser.grade
            const allUsers = await Users.find({ "is_deleted": false, "role": "Faculty", "grade": userGrade })
            res.json(allUsers)
        }
        else if (getUser.role.toLowerCase() == "faculty") {
            const facultyGrade = getUser.grade
            const allUsers = await Users.find({ "is_deleted": false, "role": "Student", "grade": facultyGrade })
            res.json(allUsers)
        }
        else {
            const allUsers = await Users.find({ "is_deleted": false })
            res.json(allUsers)
        }
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
 * @description Fetches one user
 */
userController.getOne = async (req, res) => {
    try {
        let UserId = mongoose.Types.ObjectId(req.params.id)
        let user = await Users.find({ "_id": UserId, "is_deleted": false })
        if (user.length < 1) {
            res.sendStatus(404)
        }
        else {
            res.json(user)
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
 * @description Stores the data in database
 */

userController.post = async (req, res) => {
    try {
        const user = new Users(req.body)
        const role = req.body.role.toLowerCase()
        const roleObject = await Roles.find({ "name": role })
        if (roleObject && roleObject.length < 1) {
            res.status(400).send("Enter valid role from Faculty/Student")
        }
        else {
            user.role = role
            let email = req.body.email
            let password = req.body.password
            let emailExists = await Users.find({ "email": email, "is_deleted": false })
            let re = /\S+@\S+\.\S+/;

            if (emailExists.length > 0) {
                res.status(409).send("Email Id already exists")
            }
            else if (!re.test(email)) {
                res.status(400).send("Email Id Not Valid")
            }
            else if (password.length < 5 || password.length > 12) {
                res.status(400).send("Password should be atleast 5 and atmost 12 char long")
            }
            else {
                user.role_id = roleObject[0]._id
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(password, salt)
                user.password = hashedPassword
                await user.save()
                res.json(user)
            }
        }
    }
    catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    });
                }
            });
            return res.status(400).send(errors);
        } else {
            return res.status(500).send(err.message);
        }
    }
}


/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description Gets updated user data from request body and updates User using User Model
 */
userController.update = async (req, res) => {
    try {

        let userId = mongoose.Types.ObjectId(req.params.id)
        const user = await Users.findById(userId)
        user.set(req.body);
        let updatedUser = await user.save();
        res.send(updatedUser);
    } catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    });
                }
            });
            return res.status(400).send(errors);
        } else {
            return res.status(500).send(err.message);
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

userController.delete = async (req, res, next) => {
    try {
        const userId = mongoose.Types.ObjectId(req.params.id)
        const user = await Users.find({ "_id": userId, "is_deleted": false })
        if (user.length < 1) {
            res.sendStatus(404)
        }
        else {
            user[0].is_deleted = true
            user[0].save()
            res.send("Deleted Sucessfully")
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
}


module.exports = userController;
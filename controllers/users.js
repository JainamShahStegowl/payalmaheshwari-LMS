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
        const allUsera = await Users.find()
        const users = allUsera.filter(user => {
            return user.is_deleted === false
        })
        res.json(users)
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
 * @description Fetches one user
 */
userController.getOne = async (req, res) => {
    try {
        let UserId = mongoose.Types.ObjectId(req.params.id)
        Users.exists(UserId, async (error, result) => {
            if (error) {
                res.send("Invalid UserId")
            }
            else {
                const user = await Users.findById(UserId)
                if (user.is_deleted === false) {
                    res.json(user)
                }
                else {
                    res.send("This user has been deleted")
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

userController.post = async (req, res) => {
    const user = new Users(req.body)
    const role = req.body.role.toLowerCase()
    const roleObject = (await Roles.find()).filter(roles => {
        return roles.name.toLowerCase() == role
    })

    try {
        let email = req.body.email
        let password = req.body.password
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            res.send("Email Id Not Valid")
        }
        else if (password.length < 5 || password.length > 12) {
            res.send("Password should be atleast 5 and atmost 12 char long")
        }
        else {
            user.role_id = roleObject[0]._id
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
            await user.save()
            console.log(user.student_code)
            res.send("Posting the data")
        }
    }
    catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name && value.name === "ValidatorError") {
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
                if (value.name && value.name === "ValidatorError") {
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
        Users.exists(userId, async (error, result) => {
            if (error) {
                res.send("Invalid UserId")
            }
            else {
                let user = await Users.findById(userId);
                user.is_deleted = true
                user.save()
                res.send("Deleted Sucessfully")
            }
        })
    }
    catch (err) {
        res.send('Error: ' + err)
    }
}


module.exports = userController;
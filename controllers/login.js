const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Users, Roles } = require('../models/users');

const loginController = {};

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @description logs in the user
 */
loginController.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await Users.findOne({ email: email })
        
        if (!user || user.is_deleted==true) {
            res.send("User doesnot exists")
        }
        else {
            const userPassword = user.password
            console.log(userPassword)
            const isCorrect = await bcrypt.compare(password, userPassword)
            if (isCorrect) {
                const userDetails = {
                    email:email,
                    password:password
                }
                const accessToken = jwt.sign(userDetails, process.env.SECRET)
                res.json({"accessToken":accessToken})
            }
            else {
                res.sendStatus(401)
            }
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

module.exports = loginController
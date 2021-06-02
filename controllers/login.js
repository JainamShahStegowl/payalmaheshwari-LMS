const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Users, Roles } = require('../models/users');
const { request } = require('express');

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
        res.send('Error' + err)
    }
}

module.exports = loginController
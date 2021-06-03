const express = require('express')
const router = express.Router()
const userRoutes = require('./users')
const courseRoutes = require('./courses')
const departmentRoutes = require('./departments')
const topicRoutes = require('./topics')
const loginRoutes = require('./login')
const authenticate = require('../helpers/jwt')



router.use('/users', userRoutes);
router.use('/courses', authenticate, courseRoutes);
router.use('/departments', authenticate, departmentRoutes);
router.use('/topics', authenticate, topicRoutes);
router.use('/login', loginRoutes)


module.exports = router

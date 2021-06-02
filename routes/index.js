const express = require('express')
const router = express.Router()
const userRoutes = require('./users')
const courseRoutes = require('./courses')
const subjectRoutes = require('./subjects')
const topicRoutes = require('./topics')
const loginRoutes = require('./login')
const authenticate = require('../helpers/jwt')



router.use('/users', userRoutes);
router.use('/courses', authenticate, courseRoutes);
router.use('/subjects', authenticate, subjectRoutes);
router.use('/topics', authenticate, topicRoutes);
router.use('/login', loginRoutes)


module.exports = router

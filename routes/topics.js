const express = require('express')
const router= express.Router()
const topicController = require('../controllers/topics')
const isAdmin = require("../middlewares/isadmin")


// fetching all the topics
router.get('/',topicController.getAll)


// fetching one topic
router.get('/:id',topicController.getOne)


// saving topic
router.post('/',topicController.post)


// updating a topic
router.put('/:id', isAdmin, topicController.update)


// deleting a topic
router.delete('/:id',isAdmin, topicController.delete)


module.exports = router
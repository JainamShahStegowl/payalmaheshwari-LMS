const express = require('express')
const router= express.Router()
const topicController = require('../controllers/topics')


// fetching all the topics
router.get('/',topicController.getAll)


// fetching one topic
router.get('/:id',topicController.getOne)


// saving topic
router.post('/',topicController.post)


// updating a topic
router.put('/:id',topicController.update)


// deleting a topic
router.delete('/:id',topicController.delete)


module.exports = router
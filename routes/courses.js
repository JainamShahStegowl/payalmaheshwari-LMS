const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courses')


// Home route
router.get('/',courseController.getAll);

// get user route
router.get('/:id', courseController.getOne);

// saving Course
router.post('/', courseController.post);

// updating a user
router.put('/:id', courseController.update);

// deleting a Course
router.delete('/:id', courseController.delete);

module.exports = router
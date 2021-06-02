const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subjects')


// fetching all the subjects
router.get('/', subjectController.getAll)

// fetching one subjects
router.get('/:id', subjectController.getOne)

// saving subjects
router.post('/', subjectController.post)

// updating a subject
router.put('/:id', subjectController.update)

// deleting a subject
router.delete('/:id', subjectController.delete)

module.exports = router
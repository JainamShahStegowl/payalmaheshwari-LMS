const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const authenticate = require('../helpers/jwt')


// fetching all the users
router.get('/', authenticate, userController.getAll)

// fetching one user
router.get('/:id', authenticate, userController.getOne)

// saving user
router.post('/', userController.post)

// updating a user
router.put('/:id',authenticate, userController.update)

// deleting a user
router.delete('/:id', authenticate, userController.delete)

module.exports = router
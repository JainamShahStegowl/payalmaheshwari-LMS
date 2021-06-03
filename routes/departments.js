const express = require('express')
const router = express.Router()
const departmentController = require('../controllers/departments')
const isAdmin = require("../middlewares/isadmin")


// fetching all the Departments
router.get('/', departmentController.getAll)

// fetching one Departments
router.get('/:id', departmentController.getOne)

// saving Departments
router.post('/', departmentController.post)

// updating a Departments
router.put('/:id',isAdmin, departmentController.update)

// deleting a Departments
router.delete('/:id',isAdmin, departmentController.delete)

module.exports = router
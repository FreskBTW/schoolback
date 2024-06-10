const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/signupADM', authController.signupadmin)
router.post('/login', authController.login)
router.post('/students/signup', authController.signupStudent)
router.post('/teachers/signup', authController.signupTeacher)
router.get('/get-allstudents', authMiddleware, authController.getAllStudents)
router.get('/get-allteachers', authMiddleware, authController.getAllTeachers)
//router.delete('/delete-user/:id', authMiddleware, authController.deleteUser)
//router.put('/update-user/:id', authMiddleware, authController.updateUser)

module.exports = router

const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/signupADM', authController.signupadmin)
router.post('/students/signup', authController.signupstudent)
router.post('/teachers/signup', authController.signupstudent)
//router.get('/get-allusers', authMiddleware, authController.getAllUsers)
//router.delete('/delete-user/:id', authMiddleware, authController.deleteUser)
//router.put('/update-user/:id', authMiddleware, authController.updateUser)

module.exports = router

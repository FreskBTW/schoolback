const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createSchool} = require ('../models/userModel.js')

exports.createUser = async (userData) => {
    try {
        const createdUser = await createUser(userData)
        if (createdUser.success) {
            return {
            success: true
            }
        }
        return {
            success: false,
            message: 'Error al registrar'
        }
     } catch(error) {
        return{
            success: false,
            error: error.message
        }
        }
    }
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createSchool, addstudent, addteacher} = require ('../models/userModel.js')

exports.createSchool = async (userData) => {
    try {
        const createdSchool = await createSchool(userData)
        if (createdSchool.success) {
            return {
            success: true
            }
        }
        return {
            success: false,
            message: 'Error al registrar escuela'
        }
     } catch(error) {
        return{
            success: false,
            error: error.message
        }
        }
    }
    exports.addstudent = async (userData) => {
        try {
            const addedstudent = await addstudent(userData)
            if (addedstudent.success) {
                return {
                success: true
                }
            }
            return {
                success: false,
                message: 'Error al agregar estudiante'
            }
         } catch(error) {
            return{
                success: false,
                error: error.message
            }
            }
        }
        exports.addteacher = async (userData) => {
            try {
                const addedteacher = await addteacher(userData)
                if (addedteacher.success) {
                    return {
                    success: true
                    }
                }
                return {
                    success: false,
                    message: 'Error al agregar maestro'
                }
             } catch(error) {
                return{
                    success: false,
                    error: error.message
                }
                }
            }
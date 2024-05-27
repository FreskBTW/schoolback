const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createSchool, addstudent, addteacher, findadminbyemail} = require ('../models/userModel.js')
require('dotenv').config()

exports.createSchool = async (adminData) => {
    try {
        const createdSchool = await createSchool(adminData)
        if (createdSchool.success) {
            return {
            success: true
            }
        }
        return {
            success: false,
            message: 'Error al registrar escuelaa'
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
            exports.findadminbyemail = async (schoolemail) => {
                try {
                    const found = await findadminbyemail(schoolemail)
                    if (found.success) {
                        return {
                        success: true,
                        user: found.user
                        }
                    }
                    return {
                        success: false,
                        message: 'Admin no encontrado'
                    }
                 } catch(error) {
                    return{
                        success: false,
                        error: error.message
                    }
                }
            
            }
            exports.findstudentbyemail = async (studentemail) => {
                try {
                    const found = await findstudentbyemail(studentemail)
                    if (found.success) {
                        return {
                        success: true,
                        user: found.user
                        }
                    }
                    return {
                        success: false,
                        message: 'Estudiante no encontrado'
                    }
                 } catch(error) {
                    return{
                        success: false,
                        error: error.message
                    }
                }
            
            }
            exports.findadminbyemail = async (schoolemail) => {
                try {
                    const found = await findadminbyemail(schoolemail)
                    if (found.success) {
                        return {
                        success: true,
                        user: found.user
                        }
                    }
                    return {
                        success: false,
                        message: 'Admin no encontrado'
                    }
                 } catch(error) {
                    return{
                        success: false,
                        error: error.message
                    }
                }
            
            }
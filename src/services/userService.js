const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createSchool, addStudent, addTeacher, findAdminByEmail, findStudentByEmail, findTeacherByEmail, findAdminName,getAllStudents, getAllTeachers} = require ('../models/userModel.js')
require('dotenv').config()

exports.createSchool = async (adminData) => {
    try {
        const createdSchool = await createSchool(adminData)
        if (createdSchool.success) {
            return {
            success: true
            }
        }
        else{
            console.log("Error al crear la escuela:", createdSchool.error || createdSchool.message);
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
    exports.addStudent = async (studentData) => {
        try {
            const addedstudent = await addStudent(studentData)
            if (addedstudent.success) {
                return {
                success: true
                }
            }
            else{
                console.log("Error al crear estudiante:", addedstudent.error || addedstudent.message);
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
        exports.addTeacher = async (teacherData) => {
            try {
                const addedteacher = await addTeacher(teacherData)
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
            exports.findAdminByEmail = async (schoolemail) => {
                try {
                    const found = await findAdminByEmail(schoolemail)
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
            exports.findAdminName = async (schoolname) => {
                try {
                    const found = await findAdminName(schoolname)
                    if (found.success) {
                        return {
                        success: true,
                        user: found.admin
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
            exports.findStudentByEmail = async (studentemail) => {
                try {
                    const found = await findStudentByEmail(studentemail)
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
            exports.findTeacherByEmail = async (schoolemail) => {
                try {
                    const found = await findTeacherByEmail(schoolemail)
                    if (found.success) {
                        return {
                        success: true,
                        user: found.user
                        }
                    }
                    return {
                        success: false,
                        message: 'Profesor no encontrado'
                    }
                 } catch(error) {
                    return{
                        success: false,
                        error: error.message
                    }
                }
            
            }
            exports.comparePasswords = async (plainPassword, hashedPassword) => {
                try {
                    const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword)
                    return verifyPassword
                }
                catch (error) {
                throw new error('Error al comparar password')
                }
            
            }
            exports.generateToken = async (user) => {
                try{
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    },
                    process.env.SECRET_WORD,
                    {expiresIn: '1h'}
                    )
                } catch (error) {
                    throw new error('Error al generar el token ')
                }
            }
            exports.getAllTeachers = async () => {
                try {
                    const users = await getAllUsers()
                    return users
                } catch (error) {
                    throw new Error('Error getting users:' + error.message)
                }
            }
            exports.getAllStudents = async () => {
                try {
                    const students = await getAllStudents()
                    return students
                } catch (error) {
                    throw new Error('Error getting students:' + error.message)
                }
            }
            exports.getAllTeachers = async () => {
                try {
                    const teachers = await getAllTeachers()
                    return teachers
                } catch (error) {
                    throw new Error('Error getting teachers:' + error.message)
                }
            }
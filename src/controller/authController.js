const bcrypt = require('bcrypt')
const jsonwebtoken = require ('jsonwebtoken')
const {createSchool, addStudent, addTeacher, findAdminByEmail, findStudentByEmail, findTeacherByEmail, findAdminName, getAllStudents, getAllTeachers} = require ('../services/userService')

exports.signupadmin = async (req,res) => {
    try {
        const { nameadmin, schoolname, id, schoolemail, adminpass, staffnum, admadress } = req.body
        const existingAdmin = await findAdminByEmail(schoolemail)
        if(existingAdmin.success) {
            return res.status(400).json ({
                message: "Esta escuela ya esta registrada"
            })    
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(adminpass, saltRounds)
        const newAdmin = {
            nameadmin: nameadmin,
            schoolname: schoolname,
            id: id,
            schoolemail: schoolemail,
            adminpass: hashedPassword,
            staffnum: staffnum,
            admadress: admadress
        }
        const adminResult = await createSchool(newAdmin)
        if (adminResult.success) {
            res.status (201).json ({
                message: 'Escuela registrada Satisfactoriamente'
            })
        }
        else {
            console.error("Error Detail:", adminResult.error)
            res.status(500).json ({
                message: 'Error al registrar la escuelaaaaa'
            })
        }
    } catch (error) {
      res.status(500).json ({
        message: error.message
      })   
    }
}

exports.signupStudent = async (req,res) => {
    try {
        const { studentname, studentclass, studentgender, studentemail, studentnum, studentpass, studentid } = req.body
        const existingStudent = await findStudentByEmail(studentemail)
        if(existingStudent.success) {
            return res.status(400).json ({
                message: "Este estudiante ya esta registrado"
            })
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(studentpass, saltRounds)  //Corregir si el hashedpass no tiene que estar asi
        const newStudent = {
            studentname: studentname,
            studentclass: studentclass,
            studentgender: studentgender,
            studentpass: hashedPassword,  
            studentnum: studentnum,
            studentemail: studentemail,
            studentid: studentid
        }
        const studentResult = await addStudent(newStudent)
        if (studentResult.success) {
            res.status (201).json ({
                message: 'Estudiante registrado Satisfactoriamente'
            })
        }
        else {
            res.status(500).json ({
                message: 'Error al registrar estudiante'
            })
        }
    } catch (error) {
      res.status(500).json ({
        message: error.message
      })   
    }
}
exports.signupTeacher = async (req,res) => {
    try {
        const {teachername, teacherclass, teachergender, teacheremail, teacherpass, teachersub, teacherphone, teacherid} = req.body
        const existingteacher = await findTeacherByEmail(teacheremail)
        if(existingteacher.success) {
            return res.status(400).json ({
                message: "Este profesor ya esta registrado"
            })
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(teacherpass, saltRounds)  //Corregir si el hashedpass no tiene que estar asi
        const newteacher = {
            teachername: teachername,
            teacherclass: teacherclass,
            teachergender: teachergender,
            teacherpass: hashedPassword,  
            teacheremail: teacheremail,
            teachersub: teachersub,
            teacherphone: teacherphone,
            teacherid: teacherid
        }
        const teacherResult = await addTeacher(newteacher)
        if (teacherResult.success) {
            res.status (201).json ({
                message: 'Profesor registrado Satisfactoriamente'
            })
        }
        else {
            res.status(500).json ({
                message: 'Error al registrar profesor'
            })
        }
    } catch (error) {
      res.status(500).json ({
        message: error.message
      })   
    }
}
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        // Codigo para loggearnos   
        const { schoolname, adminpass } = req.body
        const findName = await findAdminName(schoolname)
        console.log('Resultado de findUserByEmail:', findName)
        if(!findName.success) {
            return res.status(401).json({
                message: 'Usuario no encontrado'
            })
        }
        const user = findName.user
        const findPassword = await bcrypt.compare(adminpass, user.adminpass)
        console.log('Resultado de bcrypt.compare:', findPassword);
        if(!findPassword) {
            return res.status(401).json({
                message: 'Password incorrecto'
            })
        }
            const token = jsonwebtoken.sign({
                email: user.schoolname, 
                userId: user.id
            }, process.env.SECRET_WORD,{
            expiresIn: '1h'
            })
             res.status(200).json ({
                token: token
            })  
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudents()
        res.status(200).json({
            message: 'Success',
            students
        })
    } catch (error) {
        res.status(500).json ({
            message: 'Server error getting all students',
            error: error.message
        })
    }
}
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await getAllTeachers()
        res.status(200).json({
            message: 'Success',
            teachers
        })
    } catch (error) {
        res.status(500).json ({
            message: 'Server error getting all teachers',
            error: error.message
        })
    }
}
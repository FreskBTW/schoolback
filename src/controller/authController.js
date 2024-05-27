const bcrypt = require('bcrypt')
const jsonwebtoken = require ('jsonwebtoken')
const {createSchool, addstudent, addteacher, findadminbyemail, findstudentbyemail, findteacherbyemail} = require ('../services/userService')

exports.signupadmin = async (req,res) => {
    try {
        const { nameadmin, schoolname, schoolemail, adminpass, staffnum, admadress } = req.body
        const existingadmin = await findadminbyemail(schoolemail)
        if(existingadmin.success) {
            return res.status(400).json ({
                message: "Esta escuela ya esta registrada"
            })
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(adminpass, saltRounds)
        const newadmin = {
            nameadmin: nameadmin,
            schoolname: schoolname,
            schoolemail: schoolemail,
            adminpass: hashedPassword,
            staffnum: staffnum,
            admadress: admadress
        }
        const adminResult = await createSchool(newadmin)
        if (adminResult.success) {
            res.status (201).json ({
                message: 'Escuela registrada Satisfactoriamente'
            })
        }
        else {
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

exports.signupstudent = async (req,res) => {
    try {
        const {studentname, studentclass, studentgender, studentemail, studentnum, studentpass, studentid} = req.body
        const existingstudent = await findstudentbyemail(studentemail)
        if(existingstudent) {
            return res.status(400).json ({
                message: "Este estudiante ya esta registrado"
            })
        }
        const saltRounds = 15
        const hashedPassword = await bcrypt.hash(studentpass, saltRounds)  //Corregir si el hashedpass no tiene que estar asi
        const newstudent = {
            studentname: studentname,
            studentclass: studentclass,
            studentgender: studentgender,
            studentpass: hashedPassword,  
            studentnum: studentnum,
            studentemail: studentemail,
            studentid: studentid
        }
        const studentResult = await addstudent(newstudent)
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
exports.signupteacher = async (req,res) => {
    try {
        const {teachername, teacherclass, teachergender, teacheremail, teacherpass, teachersub, teacherphone} = req.body
        const existingteacher = await findteacherbyemail(teacheremail)
        if(existingteacher) {
            return res.status(400).json ({
                message: "Este profesor ya esta registrado"
            })
        }
        const saltRounds = 15
        const hashedPassword = await bcrypt.hash(teacherpass, saltRounds)  //Corregir si el hashedpass no tiene que estar asi
        const newteacher = {
            teachername: teachername,
            teacherclass: teacherclass,
            teachergender: teachergender,
            teacherpass: hashedPassword,  
            teacheremail: teacheremail,
            teachersub: teachersub,
            teacherphone: teacherphone
        }
        const teacherResult = await addteacher(newteacher)
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
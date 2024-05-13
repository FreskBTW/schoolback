const bcrypt = require ("bcrypt")
const jsonwebtoken = require ("jsonwebtoken")
const {createSchool} = require ('../services/userService')

exports.signupadmin = async (res,req) => {
    try {
        const {nameadmin, schoolname, schoolemail, adminpass, staffnum, adress} = req.body
        const existingadmin = await findadminbyemail(schooladmin)
        if(existingadmin) {
            return res.status(400).json ({
                message: "Esta escuela ya esta registrada"
            })
        }
        const saltRounds = 15
        const hashedPassword = await bcrypt.hash(adminpass, saltRounds)
        const newadmin = {
            nameadmin: nameadmin,
            schoolname: schoolname,
            schoolemail: schoolemail,
            adminpass: hashedPassword,
            staffnum: staffnum,
            adress: adress
        }
        const adminResult = await createSchool(newadmin)
        if (adminResult.success) {
            res.status (201).json ({
                message: 'Escuela registrada Satisfactoriamente'
            })
        }
        else {
            res.status(500).json ({
                message: 'Error al registrar la escuela'
            })
        }
    } catch (error) {
      res.status(500).json ({
        message: error.message
      })   
    }
}
const firebase = require('../config/firebase')
const adminCollection = firebase.firestore().collection('admin')
const teacherCollection = firebase.firestore().collection('teacher')
const studentCollection = firebase.firestore().collection('student')



exports.createSchool = async (adminData) => {
    try {
        await adminCollection.doc(adminData.id).set(adminData)
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }   
    
}
exports.findadminbyemail = async (email) => {
    try {
        const userEmail = await adminCollection.where('email','==', email).get()
        if (!userEmail.empty) {
            const userFound = userEmail.docs[0]
            return {
                success: true,
                user: userFound.data ()
            }
        } else {
            return {
                success: false,
                error: 'User not Found'
            }
        }
    } catch (error) {
            return {
                success: false,
                error: error.message
            }
    }
}

exports.addteacher = async (teacherData) => {
    try {
        await teacherCollection.doc(teacherData.id).set(teacherData)
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
    
}
exports.addstudent = async (studentData) => {
    try {
        await studentCollection.doc(studentData.id).set(studentData)
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
    
}
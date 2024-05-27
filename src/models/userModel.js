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
exports.findadminbyemail = async (schoolemail) => {
    try {
        const adminEmail = await adminCollection.where('schoolemail','==', schoolemail).get()
        if (!adminEmail.empty) {
            const adminFound = adminEmail.docs[0]
            return {
                success: true,
                admin: adminFound.data ()
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
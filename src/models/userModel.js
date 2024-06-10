const firebase = require('../config/firebase')
const adminCollection = firebase.firestore().collection('admin')
const teacherCollection = firebase.firestore().collection('teacher')
const studentCollection = firebase.firestore().collection('student')


exports.createSchool = async (adminData) => {
    try {
        console.log("Intentando crear un nuevo documento con ID:", adminData.id)
        await adminCollection.doc(adminData.id).set(adminData)
        return {
            success: true
        }
        
    } catch (error) {
        console.error("Error al intentar crear el documento:", error)
        return {
            success: false,
            error: error.message
        }
    }   
    
}
exports.addStudent = async (studentData) => {
    try {
        console.log("Intentando crear un nuevo documento con ID:", studentData.studentid)
        await studentCollection.doc(studentData.studentid).set(studentData)
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
exports.addTeacher = async (teacherData) => {
    try {
        console.log("Intentando crear un nuevo documento con ID:", teacherData.teacherid)
        await teacherCollection.doc(teacherData.teacherid).set(teacherData)
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
exports.findAdminByEmail = async (schoolemail) => {
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
exports.findAdminName = async (schoolname) => {
    try {
        const adminName = await adminCollection.where('schoolname','==', schoolname).get()
        if (!adminName.empty) {
            const adminFound = adminName.docs[0]
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
exports.findStudentByEmail = async (studentemail) => {
    try {
        const studentEmail = await studentCollection.where('studentemail','==', studentemail).get()
        if (!studentEmail.empty) {
            const studentFound = studentEmail.docs[0]
            return {
                success: true,
                student: studentFound.data ()
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
exports.findTeacherByEmail = async (teacheremail) => {
    try {
        const teacherEmail = await teacherCollection.where('teacheremail','==', teacheremail).get()
        if (!teacherEmail.empty) {
            const teacherFound = teacherEmail.docs[0]
            return {
                success: true,
                teacher: teacherFound.data ()
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
exports.getAllStudents = async () => {
    try {
        const allStudents = await studentCollection.get()
        const students = []
            allStudents.forEach((doc) => {
                students.push(doc.data())
            })
            return students
    } catch (error) {
        throw new Error('Error getting students:' + error.message)
    }
}
exports.getAllTeachers = async () => {
    try {
        const allTeachers = await teacherCollection.get()
        const teachers = []
            allTeachers.forEach((doc) => {
                teachers.push(doc.data())
            })
            return teachers
    } catch (error) {
        throw new Error('Error getting teachers:' + error.message)
    }
}
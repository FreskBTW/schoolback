const firebase = require('../config/firebase')
const usersCollection = firebase.firestore().collection('users')



exports.createSchool = async (userData) => {
    try {
        await usersCollection.doc(userData.id).set(userData)
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
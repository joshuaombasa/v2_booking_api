const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true},
    country: { type: String, required: true},
    image: { type: String},
    city: { type: String, required: true},
    phone: { type: String, required: true},
    passwordHash: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
}, { timestamps: true })


userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        
        delete returnedObject.passwordHash
    }
})


module.exports = mongoose.model('User', userSchema)
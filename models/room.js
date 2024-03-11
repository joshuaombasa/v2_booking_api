const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, min: 1, required: true },
    description: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: [Date] }],
},
    { timestamps: true })

roomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Room', roomSchema)
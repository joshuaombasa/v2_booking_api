const roomsRouter = require('express').Router()
const Room = require('../models/room')

roomsRouter.get('/', async(request, response, next) => {
    try {
        const rooms = await Room.find({})
        response.json(rooms)
    } catch (error) {
        next(error)
    }
})

// roomsRouter.get('/', async(request, response, next) => {
//     try {
//         const rooms = await Room.find({})
//         response.json(rooms)
//     } catch (error) {
        
//     }
// })

module.exports = roomsRouter
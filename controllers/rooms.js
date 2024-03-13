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

roomsRouter.get('/:id', async(request, response, next) => {
    try {
        const room = await Room.findById(request.params.id)
        if (!room) {
            response.sendStatus(404)
        }
        response.json(room)
    } catch (error) {
        
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
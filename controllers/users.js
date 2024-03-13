const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            response.sendStatus(404)
        }
        response.json(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, email, country, image, city, phone, passwordHash, isAdmin } = request.body
    const userObject = new User({
        username,
        email,
        country,
        image,
        city,
        phone,
        passwordHash,
        isAdmin
    })
    try {
        const savedUser = await userObject.save()
        response.status(201).json(userObject)
    } catch (error) {
        next(error)
    }
})

usersRouter.put('/:id', async (request, response, next) => {
    const { username, email, country, image, city, phone, passwordHash, isAdmin } = request.body
    const userObject = {
        username,
        email,
        country,
        image,
        city,
        phone,
        passwordHash,
        isAdmin
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id,
            userObject,
            { new: true })
        response.json(updatedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.json(204)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
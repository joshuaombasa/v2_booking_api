const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const hotelsRouter = require('./controllers/hotels')
const roomsRouter = require('./controllers/rooms')

const app = express()
const connect = require('./utils/db')


app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/hotels',hotelsRouter)
app.use('/api/rooms',roomsRouter)

app.use(middleware.unknownEndpointsHandler)
app.use(middleware.errorHandler)

connect()
module.exports = app
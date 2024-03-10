require('dotenv').config()
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Path:', request.path)
    logger.info('Method:', request.method)
    logger.info('Body:', request.body)
    logger.info('___')
    next()
}

const unknownEndpointsHandler = (request, response, next) => {
    return response.status(400).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpointsHandler,
    errorHandler
}


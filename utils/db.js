const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

mongoose.set('strictQuery', false)

const connect = async() => {
    try {
        await mongoose.connect(config.MONGO_URI)
        logger.info('connected to MongoDB')
    } catch (error) {
        logger.error(error)
    }
}

module.exports = connect
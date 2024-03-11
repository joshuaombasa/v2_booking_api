const hotelsRouter = require('express').Router()
const Hotel = require('../models/hotel')

hotelsRouter.get('/', async (request, response, next) => {
    try {
        const hotels = await Hotel.find({})
        response.json(hotels)
    } catch (error) {
        next(error)
    }
})

hotelsRouter.get('/:id', async (request, response, next) => {
    try {
        const hotel = await Hotel.findById(request.params.id)
        if (!hotel) {
            return response.status(404).end()
        }
        response.json(hotel)
    } catch (error) {
        next(error)
    }
})

hotelsRouter.post('/', async (request, response, next) => {
    const { name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        rating,
        cheapestPrice,
        featured, } = request.body


    try {
        const hotel = new Hotel({
            name,
            type,
            city,
            address,
            distance,
            title,
            desc,
            rating,
            cheapestPrice,
            featured
        })
        const savedHotel = await hotel.save()
        response.status(201).json(savedHotel)
    } catch (error) {
        console.log(error.name)
        next(error)
    }
})

hotelsRouter.put('/:id', async (request, response, next) => {
    const hotel = await Hotel.findById(request.params.id)
    const { name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        rating,
        cheapestPrice,
        featured, } = request.body


    try {
        const hotelData = {
            name,
            type,
            city,
            address,
            distance,
            title,
            desc,
            rating,
            cheapestPrice,
            featured
        }
        const savedHotel = await Hotel.findByIdAndUpdate(
            request.params.id,
            hotelData,
            { new: true }
        )
        response.status(201).json(savedHotel)
    } catch (error) {
        console.log(error.name)
        next(error)
    }
})

hotelsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Hotel.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

hotelsRouter.get('/CountByCity', async (request, response, next) => {
    const cities = request.query.cities.split(',')

    const citiesPromises = cities.map(city => Hotel.countDocuments({ city: city }))
    try {
        const citiesData = await Promise.all(citiesPromises)
        response.json(citiesData)
    } catch (error) {
        next(error)
    }
})

hotelsRouter.get('/CountByType', async (request, response, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
        const appartmentCount = await Hotel.countDocuments({ type: 'appartment' })
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' })
        const resortCount = await Hotel.countDocuments({ type: 'resort' })
        const villaCount = await Hotel.countDocuments({ type: 'villa' })

        response.json([
            { type: 'hotels', count: hotelCount },
            { type: 'appartments', count: appartmentCount },
            { type: 'cabins', count: cabinCount },
            { type: 'resorts', count: resortCount },
            { type: 'villas', count: villaCount },
        ])
    } catch (error) {
        next(error)
    }
})


// hotelsRouter.get('/', async(request,response,next) => {
//     try {

//     } catch (error) {
//         next(error)
//     }
// })

module.exports = hotelsRouter
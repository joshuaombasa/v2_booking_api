const Hotel = require('../models/hotel')


const someHotels = [{
    name: 'Radison',
    type: 'Luxury',
    city: 'Nairobi',
    address: 'Westlands',
    distance: '5km',
    photos: ["photo1", "photo2", "photo3"],
    title: 'Park-inn by Radison Blue',
    desc: "Luxurious hotel located to all dream ammenities",
    rating: 5,
    rooms: ["Presidential", "King", "Business", "Luxury"],
    cheapestPrice: 500,
    featured: true,
}, {
    name: 'Safari Park Nairobi',
    type: 'Luxury',
    city: 'Nairobi',
    address: 'Gilgil',
    distance: '9km',
    photos: ["photo1", "photo2", "photo3"],
    title: 'Safari Park Nairobi By Safari Group',
    desc: "Luxurious hotel located sorrounded by all the best nature can offer",
    rating: 5,
    rooms: ["Presidential", "King", "Business", "Luxury"],
    cheapestPrice: 700,
    featured: true,
}]

const hotelsInDB = async () => {
    const hotelObjects = await Hotel.find({})
    return hotelObjects.map(item => item.toJSON())
}

const nonExistentId = async () => {
    const someHotel = {
        name: 'Kanyoni',
        type: 'Rustic',
        city: 'Kisii',
        address: 'CBD',
        distance: '0.5km',
        photos: ["photo1", "photo2", "photo3"],
        title: 'Kanyoni Rest House By Kanyoni Holdings',
        desc: "Luxurious Hotel & Restaurant located near city center with superb Kisii dishes",
        rating: 5,
        rooms: ["Presidential", "King", "Business", "Luxury"],
        cheapestPrice: 700,
        featured: true,
    }

    const someHotelObject = new Hotel(someHotel)
    const savedSomeHotel = await someHotelObject.save()
    await Hotel.findByIdAndDelete(savedSomeHotel._id)
    return savedSomeHotel._id.toString()
}


const validHotelData = {
    name: 'Kanyoni',
    type: 'Rustic',
    city: 'Kisii',
    address: 'CBD',
    distance: '0.5km',
    photos: ["photo1", "photo2", "photo3"],
    title: 'Kanyoni Rest House By Kanyoni Holdings',
    desc: "Luxurious Hotel & Restaurant located near city center with superb Kisii dishes",
    rating: 5,
    rooms: ["Presidential", "King", "Business", "Luxury"],
    cheapestPrice: 700,
    featured: true,
}
const inValidHotelData = {
    address: 'CBD',
    distance: '0.5km',
    photos: ["photo1", "photo2", "photo3"],
    title: 'Kanyoni Rest House By Kanyoni Holdings',
    desc: "Luxurious Hotel & Restaurant located near city center with superb Kisii dishes",
    rating: 5,
    rooms: ["Presidential", "King", "Business", "Luxury"],
    cheapestPrice: 700,
    featured: true,
}

module.exports = { someHotels, hotelsInDB, nonExistentId, validHotelData , inValidHotelData}
const mongoose = require('mongoose')
const Hotel = require('../models/hotel')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./testHelper')

beforeEach(async () => {
    await Hotel.deleteMany({})
    for (let hotel of helper.someHotels) {
        const hotelObject = new Hotel(hotel)
        await hotelObject.save()
    }
})


describe('when there is initially some hotels saved', () => {
    test('hotels are returned as json', async () => {
        await api.get('/api/hotels')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all hotels are returned', async () => {
        const response = await api.get('/api/hotels')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.someHotels.length)
    })

    test('a specific hotel is within the returned hotels', async () => {
        const response = await api.get('/api/hotels')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const names = response.body.map(item => item.name)
        expect(names).toContain(helper.someHotels[0].name)
    })
})

describe('viewing a specific hotel', () => {
    test('succeeds given a valid id', async () => {
        const hotelsAtStart = await helper.hotelsInDB()
        const hotelToSearch = hotelsAtStart[0]
        const response = await api.get(`/api/hotels/${hotelToSearch.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.name).toBe(hotelToSearch.name)
    })

    test('fails  with status code 404 if id does not exists', async () => {
        const nonExistentId = await helper.nonExistentId()
        await api.get(`/api/hotels/${nonExistentId}`)
            .expect(404)
    })

    test('fails  with status code 400 if id is invalid', async () => {
        const invaliId = 'uedweufhdw0ew'
        await api.get(`/api/hotels/${invaliId}`)
            .expect(400)
    })
})

describe('addition of a new hotel', () => {
    test('succeeds with valid data', async () => {
        const hotelsAtStart = await helper.hotelsInDB()
        const response = await api.post(`/api/hotels`)
            .send(helper.validHotelData)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const hotelsAtEnd = await helper.hotelsInDB()
        expect(hotelsAtEnd).toHaveLength(hotelsAtStart.length + 1)
    })

    test('fails with code 400 given invalid data', async () => {
        const hotelsAtStart = await helper.hotelsInDB()
        const response = await api.post(`/api/hotels`)
            .send(helper.inValidHotelData)
            .expect(400)

        const hotelsAtEnd = await helper.hotelsInDB()
        expect(hotelsAtEnd).toHaveLength(hotelsAtStart.length)
    })
})

describe('deletion of a hotel', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const hotelsAtStart = await helper.hotelsInDB()
        const hotelToDelete = hotelsAtStart[0].id
        await api.delete(`/api/hotels/${hotelToDelete}`)
            .expect(204)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
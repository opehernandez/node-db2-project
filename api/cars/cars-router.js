// DO YOUR MAGIC
const express = require('express')
const router = express.Router()

const { checkVinNumberValid, checkVinNumberUnique, checkCarPayload, checkCarId, errHandler } = require('./cars-middleware')
const Cars = require('./cars-model')

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.json(cars)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car[0])
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res, next) => {
    Cars.create(req.body)
        .then(carCreated => {
            res.status(201).json(carCreated[0])
        })
})


router.use(errHandler)

module.exports = router


const Cars = require('./cars-model')
const validator = require('vin-validator')
const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params
  Cars.getById(id)
    .then(car => {
      if(car.length === 0) {
        const err = {status: 404, message: `car with id ${id} is not found`}
        next(err)
      }
      else {
        req.car = car
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
  !vin ? res.status(400).json({message: `vin is missing`})
  :
  !make ? res.status(400).json({message: `make is missing`})
  :
  !model ? res.status(400).json({message: `model is missing`})
  :
  !mileage && mileage !== 0 ? res.status(400).json({message: `mileage is missing`})
  :
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  
  validator.validate(vin) ? next() : res.status(400).json({message: `vin ${vin} is invalid`})
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  Cars.getByVin(vin)
    .then(car => {
      car.length !== 0 ? res.status(400).json({message: `vin ${vin} already exists`})
      :
      next()
    })
}

const errHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message})
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  errHandler
}

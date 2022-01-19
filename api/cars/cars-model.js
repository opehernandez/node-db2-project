const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars')
    .where({ id })
}

const getByVin = (vin) => {
  return db('cars')
    .where({ vin })
}

const create = (data) => {
  // DO YOUR MAGIC
  return db('cars')
    .insert(data)
      .then(id => {
        return getById(id[0])
      })
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}

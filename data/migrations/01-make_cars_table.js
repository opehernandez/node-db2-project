exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable('cars', table => {
    table.increments()
    table.text('vin', 100).unique().notNullable()
    table.text('make', 50).notNullable()
    table.text('model',50).notNullable()
    table.integer('mileage').notNullable()
    table.text('title')
    table.text('transmission')
  })
};

exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists('cars')
};

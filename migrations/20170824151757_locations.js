
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments();
    table.integer('location_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
};

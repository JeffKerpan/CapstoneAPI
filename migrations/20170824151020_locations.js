
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments();
    table.string('location_name', 255).notNull().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
};

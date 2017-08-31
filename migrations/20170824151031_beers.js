
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beers', (table) => {
    table.increments('id');
    table.integer('number_beers');
    table.integer('user_id').index().references('users.id').notNull().onDelete('cascade');
    table.integer('location_id').index().references('locations.id').notNull().onDelete('cascade');
    table.string('friend_name', 255).notNull().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schmea.dropTable('beers');
};

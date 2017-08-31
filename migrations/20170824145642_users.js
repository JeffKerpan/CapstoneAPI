
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('user_name', 255).notNull().defaultTo('');
    table.string('first_name', 255).notNull().defaultTo('');
    table.string('last_name', 255).notNull().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          user_name: 'test',
          first_name: 'test',
          last_name: 'test',
          hashed_password: 'test'
        }
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};

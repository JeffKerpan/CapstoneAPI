
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          user_name: 'Test',
          first_name: 'Test',
          last_name: 'test',
          hashed_password: 'Test'
        },
        {
          id: 2,
          user_name: 'Friend',
          first_name: 'F',
          last_name: 'F',
          hashed_password: 'F'
        }
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};

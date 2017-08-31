
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beers').del()
    .then(function () {
      // Inserts seed entries
      return knex('beers').insert([
        {
          id: 1,
          number_beers: 2,
          user_id: 1,
          location_id: 1,
          friend_name: 'F'
        }
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('beers_id_seq', (SELECT MAX(id) FROM beers));");
    });
};

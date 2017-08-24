
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([{
          id: 1,
          location_name: 'Backcountry'
        }
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations));");
    });
};

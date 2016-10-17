'use strict';

exports.seed = function(knex) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([{
        id: 1,
        title: 'Cowboys from Hell',
        artist: 'Pantera',
        image_url: 'http://pantera.com/wp-content/uploads/2014/03/cfh800.jpg',
        sc_id: 272105509,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')              }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tracks', (SELECT MAX(id) FROM tracks));"
      );
    });
};

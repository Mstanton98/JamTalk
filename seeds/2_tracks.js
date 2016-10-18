'use strict';

exports.seed = function(knex) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([{
        id: 1,
        title: 'Psycosocial',
        genre: 'metal',
        embed_link: '<iframe scrolling="no" frameborder="no" id="song" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/203876387&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true">        </iframe>',
        sc_id: 203876387,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tracks', (SELECT MAX(id) FROM tracks));"
      );
    });
};

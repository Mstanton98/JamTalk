'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('genre').notNullable().defaultTo('');
    table.string('embed_link', [320]).notNullable().defaultTo('');
    table.integer('sc_id').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.droptable('tracks')
};

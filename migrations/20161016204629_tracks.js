'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('artist').notNullable().defaultTo('');
    table.string('url').notNullable().defaultTo('');
    table.string('image').defaultTo('http://www.clker.com/cliparts/q/L/P/Y/t/6/no-image-available-md.png')
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.droptable('tracks')
};

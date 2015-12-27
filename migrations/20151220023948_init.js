'use strict';

exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('posts', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('link').notNullable();
    table.text('detail').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};

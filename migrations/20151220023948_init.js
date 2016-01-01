'use strict';

exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('posts', function(table) {
    table.increments();
    table.string('uuid').notNullable();
    table.string('title').notNullable();
    table.string('link').notNullable();
    table.text('content').notNullable();
    table.string('hash').notNullable();
    table.dateTime('post_created_at');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};

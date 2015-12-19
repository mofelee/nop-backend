exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.boolean('active').notNull().defaultTo(true);
      table.timestamps();
    }),

    knex.schema.createTableIfNotExists('posts', function(table) {
      table.increments();
      table.string('title').notNullable();
      table.integer('owner_id').unsigned().notNull();
      table.boolean('deleted').notNull().defaultTo(false);
      table.timestamps();
    }),

    knex.schema.createTableIfNotExists('post_details', function(table) {
      table.increments();
      table.text('post_text').notNullable();
      table.integer('post_id').unsigned().notNull();
      table.integer('sequence').notNull().defaultTo(1);
      table.timestamps();
    }),

    knex.schema.createTableIfNotExists('comments', function(table) {
      table.increments();
      table.text('comment').notNullable();
      table.integer('commenter_id').unsigned().notNull();
      table.boolean('deleted').notNull().defaultTo(false);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('post_details'),
    knex.schema.dropTable('comments')
  ]);
};

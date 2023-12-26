exports.up = function(knex) {
    return knex.schema
      .createTable('resources', function(table) {
        table.increments('resource_id').primary();
        table.string('resource_name').notNullable().unique();
        table.string('resource_description');
      })
      .createTable('tasks', function(table) {
        table.increments('task_id').primary();
        table.string('task_description').notNullable();
        table.string('task_notes');
        table.boolean('task_completed').defaultTo(false);
        table.integer('project_id').notNullable().references('project_id').inTable('projects');
      })
      .createTable('project_resources', function(table) {
        table.increments('id').primary();
        table.integer('project_id').notNullable().references('project_id').inTable('projects');
        table.integer('resource_id').notNullable().references('resource_id').inTable('resources');
      });
  };

  exports.down = function(knex) {
    return knex.schema
      .dropTable('project_resources')
      .dropTable('tasks')
      .dropTable('resources')
      .dropTable('projects');
  };

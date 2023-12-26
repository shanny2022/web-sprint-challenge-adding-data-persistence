exports.up = async function (knex) {
  await knex.schema
      .createTable('projects', table => {
          table.increments('project_id');
          table.string('project_name', 255).notNullable();
          table.string('project_description', 255);
          table.integer('project_completed').defaultTo(0);
      })
      .createTable('resources', table => {
          table.increments('resource_id');
          table.string('resource_name', 255).notNullable().unique();
          table.string('resource_description', 255);
      })
      .createTable('tasks', table => {
          table.increments('task_id');
          table.string('task_description', 255).notNullable();
          table.string('task_notes', 255);
          table.integer('task_completed').defaultTo(0);
          table.integer('project_id')
              .unsigned()
              .notNullable()
              .references('project_id')
              .inTable('projects')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT');
      })
      .createTable('project_resources', table => {
          table.integer('project_id')
              .unsigned()
              .notNullable()
              .references('project_id')
              .inTable('projects')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT');
          table.integer('resource_id')
              .unsigned()
              .notNullable()
              .references('resource_id')
              .inTable('resources')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT');
          table.primary(['project_id', 'resource_id']);
      });
};

exports.down = async function (knex) {
  await knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
};

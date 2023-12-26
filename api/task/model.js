const db = require('../data/db-config');

function getTasks() {
  return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select('tasks.*', 'projects.project_name', 'projects.project_description');
}

function createTask(task) {
  return db('tasks').insert(task).returning('*');
}

module.exports = {
  getTasks,
  createTask,
};

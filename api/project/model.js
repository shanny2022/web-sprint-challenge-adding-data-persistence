const db = require('../data/db-config');

function getProjects() {
  return db('projects').select('*');
}

function createProject(project) {
  return db('projects').insert(project).returning('*');
}

module.exports = {
  getProjects,
  createProject,
};

const db = require('../data/db-config');

function getResources() {
  return db('resources').select('*');
}

function createResource(resource) {
  return db('resources').insert(resource).returning('*');
}

module.exports = {
  getResources,
  createResource,
};

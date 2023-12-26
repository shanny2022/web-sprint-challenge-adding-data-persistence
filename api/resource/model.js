const db = require('../../data/dbConfig');

function getAll() {
    return db('resources');
}

async function createResource({ resource_name, resource_description }) {
    const [resource_id] = await db('resources').insert({
        resource_name,
        resource_description,
    });

    const newResource = await db('resources').where({ resource_id }).first();

    return {
        resource_id: newResource.resource_id,
        resource_name: newResource.resource_name,
        resource_description: newResource.resource_description,
    };
}

module.exports = {
    getAll,
    createResource,
};

const db = require('../../data/dbConfig');

function getAll() {
    return db('projects').select('*').then(projects => {
        return projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed),
        }));
    });
}

async function createProject({ project_name, project_description, project_completed }) {
    const [project_id] = await db('projects').insert({
        project_name,
        project_description,
        project_completed: project_completed ? 1 : 0,
    });

    const newProject = await db('projects').where({ project_id }).first();

    return {
        ...newProject,
        project_completed: Boolean(newProject.project_completed),
    };
}

module.exports = {
    getAll,
    createProject,
};

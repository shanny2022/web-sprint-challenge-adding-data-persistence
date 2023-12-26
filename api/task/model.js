const db = require('../../data/dbConfig');

function getAll() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
        .then(tasks => {
            const tasksWithBoolean = tasks.map(task => ({
                ...task,
                task_completed: !!task.task_completed,
            }));
            return tasksWithBoolean;
        });
}


async function createTask({ task_description, task_notes, task_completed, project_id }) {
    const [task_id] = await db('tasks').insert({
        task_description,
        task_notes,
        task_completed,
        project_id,
    });

    const newTask = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
        .where('t.task_id', task_id)
        .first();

    return {
        task_id: newTask.task_id,
        task_description: newTask.task_description,
        task_notes: newTask.task_notes,
        task_completed: !!newTask.task_completed,
        project_name: newTask.project_name,
        project_description: newTask.project_description,
    };
}

module.exports = {
    getAll,
    createTask,
};

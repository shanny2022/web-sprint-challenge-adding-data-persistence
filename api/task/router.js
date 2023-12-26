const router = require('express').Router();
const Task = require('./model');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.getAll();
        console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Task.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found!',
        message: 'The route you wanted ain\'t here, bro. Try again.',
    });
});

module.exports = router;

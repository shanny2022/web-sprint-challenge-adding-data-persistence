const express = require('express');
const Tasks = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.post('/', async (req, res) => {
  const taskData = req.body;

  try {
    const newTask = await Tasks.createTask(taskData);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new task' });
  }
});

module.exports = router;

const express = require('express');
const Projects = require('../models/Project');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.post('/', async (req, res) => {
  const projectData = req.body;

  try {
    const newProject = await Projects.createProject(projectData);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new project' });
  }
});

module.exports = router;

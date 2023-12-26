const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectsRouter = require('./api/projects');
const resourcesRouter = require('./api/resources');
const tasksRouter = require('./api/tasks');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

server.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
module.exports = server;

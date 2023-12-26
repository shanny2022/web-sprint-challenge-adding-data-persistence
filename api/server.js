const express = require("express");

const server = express();
const resourceRouter = require("./resource/router");
const projectRouter = require("./project/router");
const taskRouter = require("./task/router");

server.use(express.json());


server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "There was an issue with the server",
        message: err.message
    })
})

module.exports = server;

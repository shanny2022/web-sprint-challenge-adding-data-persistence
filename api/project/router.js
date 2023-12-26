const router = require('express').Router()

const Project = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.getAll()
        res.status(200).json(projects)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Project.createProject(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});


router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found!',
        message: 'The route you wanted aint here bro, try again'
    })
})



module.exports = router

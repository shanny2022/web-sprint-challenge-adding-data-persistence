const router = require('express').Router();
const Resource = require('./model');

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resource.getAll();
        res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newResource = await Resource.createResource(req.body);
        res.status(201).json(newResource);
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
module.exports = router;

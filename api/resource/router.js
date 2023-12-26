const express = require('express');
const Resources = require('../models/Resource');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Resources.getResources();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get resources' });
  }
});

router.post('/', async (req, res) => {
  const resourceData = req.body;

  try {
    const newResource = await Resources.createResource(resourceData);
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new resource' });
  }
});

module.exports = router;

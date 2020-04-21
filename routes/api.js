const express = require('express');
const router = express.Router();

const makeBuild = require('../controllers/makeBuild');

router.post('/build', makeBuild);

module.exports = router;

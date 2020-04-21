const express = require('express');
const router = express.Router();

const makeBuild = require('../controllers/makeBuild');
const checkHealth = require('../controllers/checkHealth');

router.post('/build', makeBuild);
router.get('/health', checkHealth);

module.exports = router;

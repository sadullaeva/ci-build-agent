const express = require('express');
const router = express.Router();

const runBuild = require('../controllers/runBuild');

router.post('/build', runBuild);

const express = require('express');
const { addTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/addtask', addTask);

router.get('/gettasks');

module.exports = router;

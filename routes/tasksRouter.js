const express = require('express');
const { addTask } = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/addtask', verifyToken, addTask);

router.get('/gettasks');

module.exports = router;

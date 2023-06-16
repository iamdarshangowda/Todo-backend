const express = require('express');
const { addTask, getTasks } = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/task', verifyToken, addTask);

router.get('/task/{id}');

router.get('/tasks', verifyToken, getTasks);

router.delete('/task/{id}');

router.put('/task/{id}');

module.exports = router;

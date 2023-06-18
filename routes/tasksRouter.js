const express = require('express');
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/task', verifyToken, addTask);

router.get('/tasks', verifyToken, getTasks);

router.delete('/task', verifyToken, deleteTask);

router.put('/task', verifyToken, updateTask);

module.exports = router;

const express = require('express');
const {
  addSticky,
  getStickies,
  updateSticky,
  deleteSticky,
} = require('../controllers/stickyController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/sticky', verifyToken, addSticky);

router.get('/stickies', verifyToken, getStickies);

router.delete('/sticky', verifyToken, deleteSticky);

router.put('/sticky', verifyToken, updateSticky);

// router.get('/stickyCount', verifyToken, countTasks);

module.exports = router;

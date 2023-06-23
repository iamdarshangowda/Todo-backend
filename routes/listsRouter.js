const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { addList, getLists, updateLists } = require('../controllers/listController');
const router = express.Router();

router.post('/list', verifyToken, addList);

router.get('/lists', verifyToken, getLists);

router.put('/list', verifyToken, updateLists);

module.exports = router;

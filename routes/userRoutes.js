const express = require('express');
const router = express.Router();
const { userSignup, userLogin, userRedirect } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/verify', verifyToken, userRedirect);

module.exports = router;

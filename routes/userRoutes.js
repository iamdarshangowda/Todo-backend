const express = require('express');
const router = express.Router();
const { userSignup, userLogin, userRedirect } = require('../controllers/userController');

router.post('/signup', userSignup);

router.post('/login', userLogin);

module.exports = router;

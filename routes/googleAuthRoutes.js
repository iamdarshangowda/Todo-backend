const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/failure', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    //successRedirect: process.env.CLIENT_URL_HOME,
    failureRedirect: '/failure',
    session: true,
  }),
  (req, res) => {
    // const { username, email, _id } = req.user;
    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       username,
    //       email,
    //       id: _id,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET
    // );

    //res.redirect(`${process.env.CLIENT_URL_HOME}?accessToken=${accessToken}`);
    res.redirect(`${process.env.CLIENT_URL_HOME}`);
  }
);

router.get('/getUser', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send('done');
  }
});

module.exports = router;

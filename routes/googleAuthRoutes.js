const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    failureRedirect: '/failure',
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL_HOME}`);
  }
);

router.get('/getUser', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res
      .status(200)
      .clearCookie('connect.sid', {
        path: '/',
      })
      .json({ message: 'Looged out Successfully' });
  });
});

module.exports = router;

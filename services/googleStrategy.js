const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true,
    scope: ['profile', 'email'],
  },
  async function (accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;

    // Check if user exists
    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await User.create({
        username: profile.displayName,
        email,
        password: 'google-login',
        googleId: profile.id,
      });

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(googleLogin);

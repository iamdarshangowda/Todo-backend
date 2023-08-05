const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async function (accessToken, refreshToken, profile, done) {
    const { email, name, sub } = profile._json;

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
        username: name,
        email,
        password: 'google-login',
        googleId: sub,
      });

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(googleLogin);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const doc = await User.findOne({ _id: id });
    return done(null, doc);
  } catch (err) {
    console.log(err);
  }
});

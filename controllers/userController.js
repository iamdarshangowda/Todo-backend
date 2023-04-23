const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /users/signup
//@access public
const userSignup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please provide email, username and password');
  }

  const userAlreadyAvailable = await User.findOne({ email });

  if (userAlreadyAvailable) {
    res.status(400);
    throw new Error('User already registered');
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  if (user) {
    // Create Token
    const accessToekn = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '50m' }
    );

    res.status(201).json({ _id: user.id, email: user.email, accessToekn });
  } else {
    res.status(400);
    throw new Error('User data not valid');
  }
});

//@desc Login user
//@route POST /users/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToekn = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '50m' }
    );

    res.status(200).json({ accessToekn });
  } else {
    res.status(404);
    throw new Error('Email or Password is not valid');
  }
});

module.exports = { userSignup, userLogin };

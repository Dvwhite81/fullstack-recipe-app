const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require ('../models/user');
const { verifyJWT } = require('../utils/validation');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const user = req.body;

  const usernameExists = await User.findOne({ username: user.username });

  if (usernameExists) {
    return res.json({
      success: false,
      message: 'Username already exists',
    });
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    username: user.username,
    password: user.password,
    token: '',
    recipes: [],
  });

  await newUser.save();
  res.json({
    success: true,
    message: 'Registered successfully',
    user: newUser,
  });
});

authRouter.post('/login', async (req, res) => {
  const loggingUser = req.body;

  const userExists = await User.findOne({ username: loggingUser.username });
  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const isCorrect = await bcrypt.compare(loggingUser.password, userExists.password);

  if (!isCorrect) {
    return res.json({
      success: false,
      message: 'Incorrect password',
    });
  }

  const payload = {
    id: userExists._id,
    username: userExists.username,
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 86400 },
    (err, token) => {
      if (err) {
        return res.json({
          success: false,
          message: `Error authenticating: ${err}`,
        });
      }

      userExists.token = `Bearer ${token}`;

      userExists.save();

      return res.json({
        success: true,
        message: 'Logged in successfully',
        user: userExists,
        token: `Bearer ${token}`,
      });
    }
  );
});

authRouter.get('/getUser', verifyJWT, (req, res) => {
  res.json({
    success: true,
    isLoggedIn: true,
    username: req.user.username,
    recipes: req.user.recipes,
  });
});

// Logout - localStorage.removeItem('token')

module.exports = authRouter;

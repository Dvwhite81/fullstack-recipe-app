const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

// Get user by token
userRouter.get('/:token', async (req, res) => {
  const { token } = req.params;

  const userExists = await User.findOne({ token: token });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that token',
    });
  }

  res.json({
    success: true,
    message: 'Found user by token successfully',
    user: userExists,
  });
});

// Get user recipes
userRouter.get('/:username/recipes', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }
  res.json({
    success: true,
    recipes: userExists.recipes,
  });
});

// User save recipe
userRouter.post('/:username/recipes', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const { recipe } = req.body;
  const { recipes } = userExists;

  userExists.recipes = [...recipes, recipe];
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Saved recipe successfully',
      newRecipe: recipe,
      recipes: updatedUser.recipes,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error saving recipe',
    });
  }
});

// User remove saved recipe
userRouter.put('/:username/recipes', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const recipe = req.body;
  const { recipes } = userExists;

  userExists.recipes = recipes.filter((r) => r.uri !== recipe.uri);
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Deleted recipe successfully',
      recipes: updatedUser.recipes,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error deleting recipe',
    });
  }
});

module.exports = userRouter;

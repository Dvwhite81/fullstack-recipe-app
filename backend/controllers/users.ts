import { Router } from 'express';
import 'express-async-errors';
import bcrypt from 'bcrypt';
import User from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Maybe verify lengths

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

usersRouter.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log('user:', user);

  if (!user) {
    return res.status(404).end();
  }

  const { recipe } = req.body;
  console.log('recipe:', recipe);
  user.recipes = user.recipes.concat(recipe);

  const updatedUser = await user.save();
  res.json(updatedUser);
});

export default usersRouter;

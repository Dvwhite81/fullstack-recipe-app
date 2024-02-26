import { Response, Router } from 'express';
import Recipe from '../models/recipe';

const recipesRouter = Router();

recipesRouter.get('/', async (req, res: Response) => {
  console.log('GET');
  const recipes = await Recipe
    .find({})
    .populate('user', { username: 1 });
  console.log('recipes:', recipes);
  res.json(recipes);
});

recipesRouter.get('/:id', async (req, res: Response) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) res.json(recipe);
  else res.status(404).end();
});

recipesRouter.post('/', async (req, res: Response) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const { recipe } = body;
  const { uri, label, image, ingredientLines, url } = recipe;

  const newRecipe = new Recipe({
    uri,
    label,
    image,
    ingredientLines,
    url,
    user: user.id,
  });

  const savedRecipe = await newRecipe.save();
  user.recipes = user.recipes.concat(savedRecipe._id);
  await user.save();
  res.status(201).json(savedRecipe);
});

recipesRouter.delete('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const recipeToDelete = await Recipe.findById(id);

  if (recipeToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await Recipe.findByIdAndDelete(id);
    res.status(204).end();
  }
});

recipesRouter.put('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { uri, label, image, ingredientLines, url } = req.body;

  const recipe = {
    uri,
    label,
    image,
    ingredientLines,
    url,
  };

  const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
  res.json(updatedRecipe);
});

export default recipesRouter;

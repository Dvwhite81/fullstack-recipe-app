import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  uri: String,
  label: String,
  image: String,
  ingredientLines: [String],
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

recipeSchema.set('toJSON', {
  transform: (document, returnedRecipe) => {
    returnedRecipe.id = returnedRecipe._id.toString();
    delete returnedRecipe._id;
    delete returnedRecipe.__v;
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;

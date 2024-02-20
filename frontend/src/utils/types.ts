export interface UserType {
  _id: string,
  username: string,
  password: string,
  recipes: Recipe[],
  createdAt: string,
  updatedAt: string,
}

export interface Recipe {
  uri: string,
  label: string,
  image: string,
  ingredientLines: string[],
  url: string,
}

export interface SavedRecipe {
  recipe: Recipe,
}

export interface AuthResult {
  success: boolean,
  message: string,
  user?: UserType,
  token?: string,
}

export interface UserResult {
  success: boolean,
  message: string,
  newRecipe?: Recipe,
  recipes?: Recipe[],
}

export interface RecipeResult {
  recipe: Recipe,
}

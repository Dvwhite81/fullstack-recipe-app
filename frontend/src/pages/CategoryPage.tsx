import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Recipe, UserType } from '../utils/types';
import { getCategoryRecipes } from '../services/recipeService';
import DisplayRecipes from '../components/DisplayRecipes';

interface CategoryPageProps {
  category: string
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
  loggedInUser: UserType | null
}

const CategoryPage = ({
  category,
  savedRecipes,
  handleSave,
  handleRemoveSave,
  loggedInUser,
}: CategoryPageProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const results = await getCategoryRecipes(category);
      setRecipes(results);
    };

    fetchRecipes();
  }, [category]);

  return (
    <Container fluid>
      <h2 className='pad-left'>{category}</h2>
      <DisplayRecipes
        recipes={recipes}
        savedRecipes={savedRecipes}
        handleSave={handleSave}
        handleRemoveSave={handleRemoveSave}
        loggedInUser={loggedInUser}
      />
    </Container>
  );
};

export default CategoryPage;

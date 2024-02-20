import { Container } from 'react-bootstrap';
import { Recipe, UserType } from '../utils/types';
import RecipeCard from './RecipeCard';

export interface DisplayProps {
  recipes: Recipe[]
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
  loggedInUser: UserType | null
}

const DisplayRecipes = ({
  recipes,
  savedRecipes,
  handleSave,
  handleRemoveSave,
  loggedInUser,
}: DisplayProps) => {
  return (
    <Container fluid>
      <Container className='grid-container'>
        {recipes.map((recipe, idx) => (
          <RecipeCard
            key={idx}
            recipe={recipe}
            savedRecipes={savedRecipes}
            handleSave={handleSave}
            handleRemoveSave={handleRemoveSave}
            loggedInUser={loggedInUser}
          />
        ))}
      </Container>
    </Container>
  );
};

export default DisplayRecipes;

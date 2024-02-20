import { Container } from 'react-bootstrap';
import { Recipe, UserType } from '../utils/types';
import DisplayRecipes from '../components/DisplayRecipes';
import { useNavigate } from 'react-router-dom';

interface SavedRecipesProps {
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
  loggedInUser: UserType | null
}

const SavedRecipes = ({
  savedRecipes,
  handleSave,
  handleRemoveSave,
  loggedInUser,
}: SavedRecipesProps) => {
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate('/');
    return;
  }

  return (
    <Container fluid>
      <DisplayRecipes
        recipes={savedRecipes}
        savedRecipes={savedRecipes}
        handleSave={handleSave}
        handleRemoveSave={handleRemoveSave}
        loggedInUser={loggedInUser}
      />
    </Container>
  );
};

export default SavedRecipes;

import { Button } from 'react-bootstrap';
import { DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import { Recipe } from '../utils/types';

interface SaveBtnProps {
  recipe: Recipe
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
}

const SaveBtn = ({
  recipe,
  savedRecipes,
  handleSave,
  handleRemoveSave,
}: SaveBtnProps) => {
  return (
    <Button className='save-btn' variant='dark'>
      {savedRecipes.includes(recipe) ? (
        <DashCircleFill onClick={() => handleRemoveSave(recipe)} />
      ) : (
        <PlusCircleFill onClick={() => handleSave(recipe)} />
      )}
    </Button>
  );
};

export default SaveBtn;

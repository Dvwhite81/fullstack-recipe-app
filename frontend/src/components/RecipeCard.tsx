import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Recipe, UserType } from '../utils/types';
import SaveBtn from './SaveBtn';

interface RecipeCardProps {
  recipe: Recipe
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
  loggedInUser: UserType | null
}

const RecipeCard = ({
  recipe,
  savedRecipes,
  handleSave,
  handleRemoveSave,
  loggedInUser,
}: RecipeCardProps) => {
  const { label, image, ingredientLines, url } = recipe;

  const shortenLabel = (str: string) => {
    if (str.length <= 30) {
      return str;
    }

    let result = '';
    const words = str.split(' ');

    for (const word of words) {
      if (result.length + word.length <= 30) {
        result += ' ' + word;
      }
    }
    return result + '...';
  };

  const shortenIngredients = (ingredients: string[]) => {
    const totalLength = ingredients.reduce((acc, val) => acc + val.length, 0);

    if (ingredients.length <= 5 && totalLength <= 200) {
      return ingredients;
    }

    const shortened = [];
    let newTotalLength = 0;

    for (const ingredient of ingredients) {
      if (shortened.length < 5 && newTotalLength + ingredient.length <= 200) {
        shortened.push(ingredient);
        newTotalLength += ingredient.length;
      }
    }

    shortened.push('...');
    return shortened;
  };

  const shortenedLabel = shortenLabel(label);
  const shortenedIngredients = shortenIngredients(ingredientLines);

  return (
    <Card bg='dark' data-bs-theme='dark'>
      <Card.Header>
        <Link to={url}>{shortenedLabel}</Link>
      </Card.Header>
      <Card.Img variant='top' src={image} alt={`${label} image`} />
      <Card.Body>
        {loggedInUser && (
          <SaveBtn
            recipe={recipe}
            savedRecipes={savedRecipes}
            handleSave={handleSave}
            handleRemoveSave={handleRemoveSave}
          />
        )}
        <Card.Title>Ingredients</Card.Title>
        <ListGroup>
          {shortenedIngredients.map((line, idx) => (
            <ListGroupItem key={idx} variant='dark'>
              <Card.Text>{line}</Card.Text>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;

import { SyntheticEvent } from 'react';
import { Container } from 'react-bootstrap';
import { Recipe, UserType } from '../utils/types';
import DisplayRecipes from '../components/DisplayRecipes';
import Search from '../components/Search';

interface HomeProps {
  query: string
  setQuery: (value: string) => void
  handleSubmit: (e: SyntheticEvent) => void
  recipes: Recipe[]
  savedRecipes: Recipe[]
  handleSave: (recipe: Recipe) => void
  handleRemoveSave: (recipe: Recipe) => void
  loggedInUser: UserType | null
}

const Home = ({
  query,
  setQuery,
  handleSubmit,
  recipes,
  savedRecipes,
  handleSave,
  handleRemoveSave,
  loggedInUser,
}: HomeProps) => {
  return (
    <Container fluid>
      <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
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

export default Home;

import { SyntheticEvent, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { redirect, Route, Routes } from 'react-router-dom';
import { getRecipes } from './services/recipeService';
import { Recipe, UserResult, UserType } from './utils/types';
import { CATEGORIES } from './utils/helpers';
import userService from './services/userService';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import Login from './pages/Login';
import MainLogo from './components/MainLogo';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    setMessage('Logged Out!');
  };

  const handleSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const results = await getRecipes(query);
    setRecipes(results);
    setQuery('');
  };

  const handleSave = async (recipe: Recipe) => {
    if (!loggedInUser) return;

    const result: UserResult = await userService.addUserRecipe(
      loggedInUser.username,
      recipe
    );

    if (result) {
      const { message, newRecipe } = result;

      setMessage(message);
      if (newRecipe) {
        setSavedRecipes([...savedRecipes, recipe]);
      }
    }
  };

  const removeSave = async (recipe: Recipe) => {
    if (loggedInUser && window.confirm('Unsave recipe?')) {
      const result = await userService.deleteUserRecipe(
        loggedInUser.username,
        recipe
      );

      if (result) {
        const { message, recipes } = result;
        setMessage(message);
        if (recipes) {
          setSavedRecipes(recipes);
        }
      }
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const data = await userService.getUserByToken(token);

        if (data.success) {
          const { user } = data;
          setLoggedInUser(user);
        }
      } else {
        setLoggedInUser(null);
      }
    };

    checkLoggedIn();
    redirect('/');
  });

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    const { username } = loggedInUser;

    const fetchRecipes = async () => {
      const saved = await userService.getUserRecipes(username);
      if (saved) {
        setSavedRecipes(saved.recipes);
      }
    };

    fetchRecipes();
  });

  return (
    <Container fluid id='main-container'>
      <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Notification message={message} setMessage={setMessage} />
      <Container
        fluid
        className='d-flex flex-column'
        style={{ height: 'var(--main-height)' }}
      >
        <MainLogo />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                query={query}
                setQuery={setQuery}
                handleSubmit={handleSearchSubmit}
                recipes={recipes}
                savedRecipes={savedRecipes}
                handleSave={handleSave}
                handleRemoveSave={removeSave}
                loggedInUser={loggedInUser}
              />
            }
          />
          {CATEGORIES.map((category) => (
            <Route
              key={category}
              path={`/categories/${category}`}
              element={
                <CategoryPage
                  category={category}
                  savedRecipes={savedRecipes}
                  handleSave={handleSave}
                  handleRemoveSave={removeSave}
                  loggedInUser={loggedInUser}
                />
              }
            />
          ))}
          {loggedInUser ? (
            <>
              <Route
                path='/profile'
                element={<Profile loggedInUser={loggedInUser} />}
              />
              <Route
                path='/saved'
                element={
                  <SavedRecipes
                    savedRecipes={savedRecipes}
                    handleSave={handleSave}
                    handleRemoveSave={removeSave}
                    loggedInUser={loggedInUser}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path='/register'
                element={
                  <Register
                    setLoggedInUser={setLoggedInUser}
                    setMessage={setMessage}
                  />
                }
              />
              <Route
                path='/login'
                element={
                  <Login
                    setLoggedInUser={setLoggedInUser}
                    setMessage={setMessage}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Container>
    </Container>
  );
}

export default App;

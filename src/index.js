//stylesheet
import './index.css';

//dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

//context
import { AuthProvider } from './util/auth.js';

//components
import App from './app/App';
import ErrorPage from './routes/errorPage/ErrorPage';
import AllRecipes from './routes/allRecipes/AllRecipes';
import RecipeDetails from './routes/recipeDetails/RecipeDetails';
import SearchResults from './routes/searchResults/SearchResults';
import CreateAccount from './routes/createAccount/CreateAccount';
import SignIn from './routes/signIn/SignIn';
import UserRecipes from './routes/userRecipes/UserRecipes';
import UserRecipeDetails from './routes/userRecipeDetails/UserRecipeDetails';
import EditRecipe from './routes/editRecipe/EditRecipe';
import AddRecipe from './routes/addRecipe/AddRecipe';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <AllRecipes /> },
          {
            path: "/all-recipes",
            element: <AllRecipes />,
          },
          {
            path: "/all-recipes/:id",
            element: <RecipeDetails />,
          },
          {
            path: "/search-results",
            element: <SearchResults />,
          },
          {
            path: "/create-account",
            element: <CreateAccount />,
          },
          {
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "/users/:id/recipes",
            element: <UserRecipes />,
          },
          {
            path: "/users/:id/recipes/:id",
            element: <UserRecipeDetails />,
          },
          {
            path: "/users/:id/recipes/:id/edit",
            element: <EditRecipe />,
          },
          {
            path: "/users/:id/add-recipe",
            element: <AddRecipe />,
          },

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

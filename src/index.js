import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './app/App';

import ErrorPage from './routes/errorPage/ErrorPage';
import Recipes from './routes/recipes/Recipes';
import RecipeDetails from './routes/recipeDetails/RecipeDetails';
import EditRecipe from './routes/editRecipe/EditRecipe';
import AddRecipe from './routes/addRecipe/addRecipe';
import SearchResults from './routes/searchResults/searchResults';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Recipes /> },
          {
            path: "/recipe/:id",
            element: <RecipeDetails />,
          },
          {
            path: "/recipe/:id/edit",
            element: <EditRecipe />,
          },
          {
            path: "/",
            element: <Recipes />,
            // loader: recipesLoader,
          },
          {
            path: "/searchResults",
            element: <SearchResults />,
            // loader: recipesLoader,
          },
          {
            path: "/addRecipe",
            element: <AddRecipe />,
            // loader: recipesLoader,
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

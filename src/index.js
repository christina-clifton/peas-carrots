import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import App, {
  // loader as appLoader,
  // action as appAction
} from './app/App';

import ErrorPage from './routes/errorPage/ErrorPage';
import Recipes, {
  // loader as recipesLoader
} from './routes/recipes/Recipes';
import RecipeDetails from './routes/recipeDetails/RecipeDetails';

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
            path: "recipe/:id",
            element: <RecipeDetails />,
          },
          {
            path: "recipes",
            element: <Recipes />,
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

import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;

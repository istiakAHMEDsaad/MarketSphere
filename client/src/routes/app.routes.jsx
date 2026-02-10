import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import AllJobs from '../pages/AllJobs';

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
      {
        path: '/jobs',
        element: <AllJobs />,
      },
    ],
  },
]);

export default router;

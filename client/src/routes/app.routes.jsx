import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import AllJobs from '../pages/AllJobs';
import SignInAuth from '../pages/Auth/SignInAuth';
import SignUpAuth from '../pages/Auth/SignUpAuth';
import PrivateRoutes from './PrivateRoutes';
import JobCardDetails from '../components/Card/JobCardDetails';

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
      {
        path: '/login',
        element: <SignInAuth />,
      },
      {
        path: '/register',
        element: <SignUpAuth />,
      },
      {
        path: '/job/:id',
        element: (
          <PrivateRoutes>
            <JobCardDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;

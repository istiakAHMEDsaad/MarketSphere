import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import AllJobs from '../pages/AllJobs';
import SignInAuth from '../pages/Auth/SignInAuth';
import SignUpAuth from '../pages/Auth/SignUpAuth';
import PrivateRoutes from './PrivateRoutes';
import JobCardDetails from '../components/Card/JobCardDetails';
import AddJob from '../pages/AddJob';
import MyPostedJobs from '../pages/MyPostedJobs';
import UpdateJob from '../pages/UpdateJob';
import MyBids from '../pages/MyBids';
import BidRequests from '../pages/BidRequests';

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
      {
        path: '/add-job',
        element: (
          <PrivateRoutes>
            <AddJob />
          </PrivateRoutes>
        ),
      },
      {
        path: '/my-posted-jobs',
        element: (
          <PrivateRoutes>
            <MyPostedJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: '/my-bids',
        element: (
          <PrivateRoutes>
            <MyBids />
          </PrivateRoutes>
        ),
      },
      {
        path: '/bid-requests',
        element: (
          <PrivateRoutes>
            <BidRequests />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;

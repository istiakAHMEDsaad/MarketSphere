import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

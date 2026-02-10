import { useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import { useLocation, Navigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (user) return children;

  return <Navigate to='/' state={location.pathname} />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;

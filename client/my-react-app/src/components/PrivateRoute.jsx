import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  // If no token, force navigation to Login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected page (children)
  return children;
};

export default PrivateRoute;
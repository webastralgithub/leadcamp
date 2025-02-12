import React from 'react';
import {Navigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;

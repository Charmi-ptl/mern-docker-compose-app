// components/StudentPrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const StudentPrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('studentToken');
  return isAuthenticated ? children : <Navigate to="/student-login" />;
};

export default StudentPrivateRoute;

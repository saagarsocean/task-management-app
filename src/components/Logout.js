import React from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
  // Clear token from localStorage or perform any other necessary logout actions
  localStorage.removeItem('token');
  // Redirect to login page after logout
  return <Navigate to="/login" />;
}

export default Logout;

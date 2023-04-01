import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    // integration of custom hook here
    const { isUserLoggedIn, userRole } = useAuth();

    // navigating to login page if user is not logged in
    return isUserLoggedIn ? children : userRole === 'admin' ? <Navigate to={'/admin'} /> : <Navigate to={'/'} />;
};

export default PrivateRoute;
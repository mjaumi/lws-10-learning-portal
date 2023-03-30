import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    // integration of custom hook here
    const isUserLoggedIn = useAuth();

    // integration of react-router-dom here
    const location = useLocation();

    // navigating to login page if user is not logged in
    return isUserLoggedIn ? children : location.pathname.includes('admin') ? <Navigate to={'/admin'} /> : <Navigate to={'/'} />;
};

export default PrivateRoute;
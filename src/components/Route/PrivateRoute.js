import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    // integration of custom hook here
    const { isUserLoggedIn, userRole } = useAuth();

    // integration or react-router-dom hooks here
    const location = useLocation();

    // navigating user to pages based on their roles here
    if (isUserLoggedIn) {
        if (location.pathname.includes('admin')) {
            if (userRole === 'admin') {
                return children;
            } else {
                return <Navigate to={'/'} />;
            }
        } else {
            if (userRole === 'student') {
                return children;
            } else {
                return <Navigate to={'/admin'} />;
            }
        }
    } else {
        return <Navigate to={'/'} />;
    }
};

export default PrivateRoute;
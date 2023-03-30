import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoute = ({ children }) => {
    // integration of custom hook here
    const isUserLoggedIn = useAuth();

    // integration of react-router-dom here
    const location = useLocation();

    // navigating to dashboard or course player if user is logged in
    return !isUserLoggedIn ? children : location.pathname.includes('admin') ? <Navigate to={'/admin/dashboard'} /> : <Navigate to={'/course-player'} />;
};

export default PublicRoute;
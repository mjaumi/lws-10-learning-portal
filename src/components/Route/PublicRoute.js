import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoute = ({ children }) => {
    // integration of custom hook here
    const { isUserLoggedIn, userRole } = useAuth();

    // navigating to dashboard or course player if user is logged in
    return !isUserLoggedIn ? children : userRole === 'admin' ? <Navigate to={'/admin/dashboard'} /> : <Navigate to={'/course-player'} />;
};

export default PublicRoute;
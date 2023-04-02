import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useGetFirstVideoId from '../../hooks/useGetFirstVideoId';

const PublicRoute = ({ children }) => {
    // integration of custom hook here
    const { isUserLoggedIn, userRole } = useAuth();
    const { videoId, isFirstVideoFetched } = useGetFirstVideoId();

    // navigating to dashboard or course player if user is logged in
    return !isUserLoggedIn ? children : userRole === 'admin' ? <Navigate to={'/admin/dashboard'} /> : isFirstVideoFetched && <Navigate to={`/course-player/${videoId}`} />;
};

export default PublicRoute;
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import useHasStudentSubmittedQuiz from '../../hooks/useHasStudentSubmittedQuiz';
import { toast } from 'react-toastify';

const QuizRoute = ({ children }) => {
    // integration of react-redux hooks here
    const { user } = useSelector(state => state.auth);

    // integration of react-router-dom hooks here
    const { videoId } = useParams();

    // integration of custom hooks here
    const { hasLoaded, hasSubmittedQuiz } = useHasStudentSubmittedQuiz(user.id, videoId);

    // redirecting user to the course player page if he/she had already submitted the quiz
    useEffect(() => {
        if (hasLoaded && hasSubmittedQuiz) {
            toast.warning('You Have Already Submitted The Quiz');
        }
    }, [hasLoaded, hasSubmittedQuiz, videoId]);

    // navigating user to leaderboard if he/she already submitted the quiz
    return (hasLoaded && hasSubmittedQuiz) ? <Navigate to={'/leader-board'} /> : children;
};

export default QuizRoute;
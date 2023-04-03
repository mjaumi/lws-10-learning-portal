import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { quizMarkApi } from '../features/quizMark/quizMarkApi';

// custom hook to check has student submitted the quiz or not
const useHasStudentSubmittedQuiz = (studentId, videoId) => {
    // integration of react hooks here
    const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [submittedQuizzes, setSubmittedQuizzes] = useState(undefined);

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // getting quiz mark entries to check if the student has submitted the quiz or not
    useEffect(() => {
        dispatch(quizMarkApi.endpoints.getQuizMarkByStudentAndVideoId.initiate({
            studentId,
            videoId: Number(videoId)
        }))
            .unwrap()
            .then(data => {
                setSubmittedQuizzes(data);
                setHasLoaded(true);
            })
            .catch();

        if (hasLoaded) {
            if (submittedQuizzes.length) {
                console.log(submittedQuizzes);
                setHasSubmittedQuiz(true);
            } else {
                setHasSubmittedQuiz(false);
            }
        }
    }, [dispatch, studentId, videoId, hasLoaded, submittedQuizzes]);

    return {
        hasSubmittedQuiz,
        hasLoaded
    };
}

export default useHasStudentSubmittedQuiz;

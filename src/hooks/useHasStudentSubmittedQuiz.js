import { useEffect, useState } from 'react';
import { useLazyGetQuizMarkByStudentAndVideoIdQuery } from '../features/quizMark/quizMarkApi';

// custom hook to check has student submitted the quiz or not
const useHasStudentSubmittedQuiz = (studentId, videoId) => {
    // integration of RTK Query hooks here
    const [triggerGetQuizMarkByStudentAndVideoIdQuery, { data, isSuccess }] = useLazyGetQuizMarkByStudentAndVideoIdQuery()

    // integration of react hooks here
    const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // getting quiz mark entries to check if the student has submitted the quiz or not
    useEffect(() => {
        triggerGetQuizMarkByStudentAndVideoIdQuery({ studentId, videoId }, false);

        if (isSuccess) {
            if (data.length) {
                setHasSubmittedQuiz(true);
            } else {
                setHasSubmittedQuiz(false);
            }
            setHasLoaded(isSuccess);
        }
    }, [studentId, videoId, data, isSuccess, triggerGetQuizMarkByStudentAndVideoIdQuery]);

    return {
        hasSubmittedQuiz,
        hasLoaded,
    };
}

export default useHasStudentSubmittedQuiz;

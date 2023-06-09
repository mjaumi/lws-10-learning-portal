import React, { useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuizzesByVideoIdQuery } from '../../features/quizzes/quizzesApi';
import { useDispatch, useSelector } from 'react-redux';
import objectsEqual from '../../utils/objectsEqual';
import { useAddQuizMarkMutation } from '../../features/quizMark/quizMarkApi';
import { toast } from 'react-toastify';
import { resetQuizAnswers } from '../../features/selectQuizAnswer/selectQuizAnswerSlice';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

const QuizSet = () => {
    // integration of react-router-dom hooks here
    const { videoId } = useParams();

    // integration of RTK Query hooks here
    const { data: quizzes, isLoading, isError } = useGetQuizzesByVideoIdQuery(videoId);
    const [addQuizMark, { isLoading: isSubmitLoading, isError: isSubmitError, isSuccess }] = useAddQuizMarkMutation();

    // integration of react-redux hooks here
    const { quizAnswers } = useSelector(state => state.selectedQuizAnswers);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // integration of react-router-dom hooks here
    const navigate = useNavigate();

    // notifying user based on quiz answer submit success or error 
    useEffect(() => {
        if (isSuccess) {
            toast.success('Answer Submitted Successfully!!');
            navigate('/leader-board');
        }

        if (isSubmitError) {
            toast.error('Failed To Submit The Answers!!');
        }
    }, [isSubmitError, isSuccess, navigate]);

    // this function is checking the correct answers
    const isAnswersCorrect = (questions, answers) => {
        return questions?.length === answers?.length && questions.every((value, index) => objectsEqual(value, answers[index]));
    }

    // handler function to submit answers
    const submitAnswersHandler = () => {
        const correctAnswers = quizAnswers.filter(answer => isAnswersCorrect(answer.selectedOptions, quizzes[answer.quizIndex].options));

        // checking if user has answered all the questions or not
        const isAllQuestionsAnswered = quizAnswers.map(answer => {
            const isAnswered = answer.selectedOptions.reduce((isOptionSelected, option) => {
                if (option.isCorrect) {
                    isOptionSelected = true;
                }

                return isOptionSelected;
            }, false);

            return isAnswered;
        });

        if (!isAllQuestionsAnswered.includes(false)) {
            addQuizMark({
                student_id: user.id,
                student_name: user.name,
                video_id: quizzes[0].video_id,
                video_title: quizzes[0].video_title,
                totalQuiz: quizzes.length,
                totalCorrect: correctAnswers.length,
                totalWrong: quizzes.length - correctAnswers.length,
                totalMark: quizzes.length * 5,
                mark: correctAnswers.length * 5,
            });
            dispatch(resetQuizAnswers());
        } else {
            toast.warning('Please Answer All The Questions!!');
        }
    }

    // deciding what to render here
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <Error error={'Failed To Load The Quizzes!!'} />;
    }

    if (!isLoading && !isError && !quizzes.length) {
        content = <Error error={'No Quiz Found!!'} />;
    }

    if (!isLoading && !isError && quizzes.length) {
        content =
            <>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold'>{quizzes.length === 1 ? 'Quiz' : 'Quizzes'} for '{quizzes[0].video_title}'</h1>
                    <p className='text-sm text-slate-200'>Each question contains 5 Mark</p>
                </div>
                <div className='space-y-8 '>
                    {
                        quizzes.map((quiz, index) => <QuizQuestion
                            key={quiz.id}
                            index={index}
                            quiz={quiz}
                        />)
                    }
                </div>

                <button onClick={submitAnswersHandler} className='btn btn-sm btn-secondary border-2 border-secondary px-6 rounded-full text-black font-medium ml-auto hover:bg-primary hover:text-white duration-300 flex items-center capitalize mt-8 disabled:loading' disabled={isSubmitLoading}>
                    <AiOutlineFileDone className={`mr-2 ${isSubmitLoading ? 'hidden' : 'block'}`} />
                    Submit Answers
                </button>
            </>;
    }

    // rendering quiz set component here
    return (
        <div className='mx-auto max-w-7xl px-5 lg:px-0'>
            {content}
        </div>
    );
};

export default QuizSet;
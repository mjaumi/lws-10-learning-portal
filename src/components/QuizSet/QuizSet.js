import React from 'react';
import QuizQuestion from './QuizQuestion';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useGetQuizzesByVideoIdQuery } from '../../features/quizzes/quizzesApi';

const QuizSet = () => {
    // integration of react-router-dom hooks here
    const { videoId } = useParams();

    // integration or RTK Query hooks here
    const { data: quizzes, isLoading, isError } = useGetQuizzesByVideoIdQuery(videoId);

    // deciding what to render here
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !quizzes.length) {
        content = <p>No Quiz Found!!</p>;
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

                <button className='btn btn-sm btn-secondary border-2 border-secondary px-6 rounded-full text-black font-medium ml-auto hover:bg-primary hover:text-white duration-300 flex items-center capitalize mt-8'>
                    <AiOutlineFileDone className='mr-2' />
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
import React from 'react';
import QuizQuestionOption from './QuizQuestionOption';

const QuizQuestion = ({ index, quiz }) => {
    // destructuring the quiz object here
    const { question, options } = quiz || {};

    return (
        <div className='quiz'>
            <h4 className='question'>Quiz {index + 1} - {question}</h4>
            <form className='quizOptions'>
                {
                    options.map(option => <QuizQuestionOption
                        key={option.id}
                        option={option}
                        quizIndex={index}
                    />)
                }
            </form>
        </div>
    );
};

export default QuizQuestion;
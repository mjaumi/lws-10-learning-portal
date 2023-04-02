import React from 'react';

const QuizQuestionOption = ({ option }) => {

    // rendering quiz question option component here
    return (
        <label htmlFor='option'>
            <input type='checkbox' id='option' />
            {option.option}
        </label>
    );
};

export default QuizQuestionOption;
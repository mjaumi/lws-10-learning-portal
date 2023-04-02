import React, { useEffect, useState } from 'react';
import { MdDoneAll } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addQuizAnswer } from '../../features/selectQuizAnswer/selectQuizAnswerSlice';

const QuizQuestionOption = ({ option, quizIndex }) => {
    // integration of react hooks here
    const [isOptionChecked, setIsOptionChecked] = useState(false);

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addQuizAnswer({
            quizIndex,
            optionIndex: option.id - 1,
            option: {
                id: option.id,
                option: option.option,
                isCorrect: isOptionChecked,
            },
        }));
    }, [dispatch, isOptionChecked, option, quizIndex]);

    // rendering quiz question option component here
    return (
        <label onClick={() => setIsOptionChecked(!isOptionChecked)} htmlFor='option' className={`${isOptionChecked && '!bg-secondary text-primary'}`}>
            <MdDoneAll className={`${isOptionChecked ? 'visible' : 'invisible'} h-5 w-5`} />
            {option.option}
        </label>
    );
};

export default QuizQuestionOption;
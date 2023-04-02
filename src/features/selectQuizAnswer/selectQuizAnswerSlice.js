import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    quizAnswers: [
        {
            quizIndex: 1,
            selectedOptions: [
                {
                    'id': 1,
                    'option': 'A function that is called after a certain time interval',
                    'isCorrect': true
                }
            ],
        },
    ],
}

// initializing select quiz answer slice here to get user's selected option for quiz
const selectQuizAnswerSlice = createSlice({
    name: 'selectQuizAnswer',
    initialState,
    reducers: {
        addQuizAnswer: (state, action) => {
            const existedQuizIndex = state.quizAnswers.findIndex(quiz => quiz.quizIndex === action.payload.quizIndex);

            if (existedQuizIndex !== -1) {
                state.quizAnswers[existedQuizIndex].selectedOptions[action.payload.optionIndex] = action.payload.option;
            } else {
                let selectedQuizOptions = [];

                selectedQuizOptions[action.payload.optionIndex] = action.payload.option;

                state.quizAnswers.push({
                    quizIndex: action.payload.quizIndex,
                    selectedOptions: selectedQuizOptions,
                });
            }
        },
        resetQuizAnswers: state => {
            state.quizAnswers = [];
        }
    },
});

export const {
    addQuizAnswer,
    resetQuizAnswers,
} = selectQuizAnswerSlice.actions;
export default selectQuizAnswerSlice.reducer;

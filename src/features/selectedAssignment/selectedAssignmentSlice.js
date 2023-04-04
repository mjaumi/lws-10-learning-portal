import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    selectedAssignment: {},
};

// creating selected assignment slice to store selected assignment from user
const selectedAssignmentSlice = createSlice({
    name: 'selectedAssignment',
    initialState,
    reducers: {
        addSelectedAssignment: (state, action) => {
            state.selectedAssignment = action.payload;
        },
        removeSelectedAssignment: state => {
            state.selectedAssignment = {};
        },
    },
});

export const {
    addSelectedAssignment,
    removeSelectedAssignment,
} = selectedAssignmentSlice.actions;
export default selectedAssignmentSlice.reducer;

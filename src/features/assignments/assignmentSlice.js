import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    assignmentToEdit: undefined,
}

// defining the assignment slice here
const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        addAssignmentToEdit: (state, action) => {
            state.assignmentToEdit = action.payload;
        },
        removeAssignmentFromEdit: state => {
            state.assignmentToEdit = undefined;
        },
    },
});

export const {
    addAssignmentToEdit,
    removeAssignmentFromEdit,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;

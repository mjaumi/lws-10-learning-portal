import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    dataToEdit: undefined,
}

// initializing the edit slice here
const editSlice = createSlice({
    name: 'editData',
    initialState,
    reducers: {
        getDataToEdit: (state, action) => {
            state.dataToEdit = action.payload;
        },
        removeDataFromEdit: state => {
            state.dataToEdit = undefined;
        },
    },
});

export const {
    getDataToEdit,
    removeDataFromEdit,
} = editSlice.actions;
export default editSlice.reducer;

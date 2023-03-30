import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    videoToEdit: undefined,
}

// initializing the video slice here
const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getVideoToEdit: (state, action) => {
            state.videoToEdit = action.payload;
        },
        removeVideoFromEdit: state => {
            state.videoToEdit = undefined;
        }
    },
});

export const {
    getVideoToEdit,
    removeVideoFromEdit,
} = videoSlice.actions;
export default videoSlice.reducer;

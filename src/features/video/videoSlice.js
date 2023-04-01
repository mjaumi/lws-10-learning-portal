import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    videoToPlay: undefined,
}

// initializing the video slice here to get video for video player
const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getVideoToPlay: (state, action) => {
            state.videoToPlay = action.payload;
        },
    },
});

export const { getVideoToPlay } = videoSlice.actions;
export default videoSlice.reducer;

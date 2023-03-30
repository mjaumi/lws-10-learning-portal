import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    accessToken: undefined,
    user: undefined,
};

// initializing the auth slice here
const authSlice = createSlice({
    name: 'learningPortalAuth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: state => {
            state.accessToken = undefined;
            state.user = undefined;
        },
    },
});

export const {
    userLoggedIn,
    userLoggedOut,
} = authSlice.actions;
export default authSlice.reducer;

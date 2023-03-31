import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import videoReducer from '../features/videos/videoSlice';
import editReducer from '../features/edit/editSlice';
import assignmentReducer from '../features/assignments/assignmentSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    assignment: assignmentReducer,
    auth: authReducer,
    editData: editReducer,
    video: videoReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware),
});

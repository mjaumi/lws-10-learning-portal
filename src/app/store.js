import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import editReducer from '../features/edit/editSlice';
import selectQuizAnswerReducer from '../features/selectQuizAnswer/selectQuizAnswerSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    editData: editReducer,
    selectedQuizAnswers: selectQuizAnswerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware),
});

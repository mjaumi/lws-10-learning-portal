import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware),
});

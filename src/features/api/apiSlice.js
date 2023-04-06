import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

// creating the base query with headers here
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
})

// initiating the api slice here
export const apiSlice = createApi({
    reducerPath: 'learningPortalAPI',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }

        return result;
    },
    tagTypes: [],
    endpoints: builder => ({}),
});
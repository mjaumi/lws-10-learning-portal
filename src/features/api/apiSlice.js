import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initiating the api slice here
export const apiSlice = createApi({
    reducerPath: 'learningPortalAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: [],
    endpoints: builder => ({}),
});
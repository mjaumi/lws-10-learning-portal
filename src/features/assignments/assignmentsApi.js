import { apiSlice } from '../api/apiSlice';

// initializing the assignments APIs here
export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignments from the server
        getAssignments: builder.query({
            query: () => '/assignments',
        }),
    }),
});

export const {
    useGetAssignmentsQuery,
} = assignmentsApi;

import { apiSlice } from '../api/apiSlice';

// initializing the users APIs here
export const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the students from the server
        getStudents: builder.query({
            query: () => '/users?role_like=student',
        }),
    }),
});

export const {
    useGetStudentsQuery,
} = usersApi;

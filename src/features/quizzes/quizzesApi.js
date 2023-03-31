import { apiSlice } from '../api/apiSlice';

// initializing the quizzes APIs here
export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the quizzes from the server 
        getQuizzes: builder.query({
            query: () => '/quizzes',
        }),
    }),
});

export const {
    useGetQuizzesQuery,
} = quizzesApi;

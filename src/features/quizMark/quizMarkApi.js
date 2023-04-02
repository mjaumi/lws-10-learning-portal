import { apiSlice } from '../api/apiSlice';

// initializing the quiz mark APIs here 
export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the quiz marks from the server
        getQuizMarks: builder.query({
            query: () => '/quizMark',
        }),
        addQuizMark: builder.mutation({
            query: data => ({
                url: '/quizMark',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetQuizMarksQuery,
    useAddQuizMarkMutation,
} = quizMarkApi;

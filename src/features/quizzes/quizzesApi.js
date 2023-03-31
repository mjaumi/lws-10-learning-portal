import { apiSlice } from '../api/apiSlice';

// initializing the quizzes APIs here
export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the quizzes from the server 
        getQuizzes: builder.query({
            query: () => '/quizzes',
        }),
        // POST mutation to add new quiz to the server
        addQuiz: builder.mutation({
            query: data => ({
                url: '/quizzes',
                method: 'POST',
                body: data,
            }),

            // updating quizzes in redux store pessimistically after adding a new quiz
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                const addedQuiz = await queryFulfilled;

                if (addedQuiz?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined,
                        draftQuizzes => {
                            draftQuizzes.push(addedQuiz.data);
                        })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetQuizzesQuery,
    useAddQuizMutation,
} = quizzesApi;

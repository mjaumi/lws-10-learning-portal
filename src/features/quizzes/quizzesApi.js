import { apiSlice } from '../api/apiSlice';
import { getDataToEdit } from '../edit/editSlice';

// initializing the quizzes APIs here
export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the quizzes from the server 
        getQuizzes: builder.query({
            query: () => '/quizzes',
        }),
        // GET query to get a single quiz from the server
        getQuiz: builder.query({
            query: quizId => `/quizzes/${quizId}`,

            async onQueryStarted(quizId, { queryFulfilled, dispatch }) {
                const quizToEdit = await queryFulfilled;

                if (quizToEdit?.data?.id) {
                    dispatch(getDataToEdit(quizToEdit.data));
                }
            }
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
        // DELETE mutation to delete a quiz from the server
        deleteQuiz: builder.mutation({
            query: quizId => ({
                url: `/quizzes/${quizId}`,
                method: 'DELETE',
            }),

            // updating quizzes in redux store optimistically when a quiz is deleted
            async onQueryStarted(quizId, { queryFulfilled, dispatch }) {
                const deleteQuizResult = dispatch(
                    apiSlice.util.updateQueryData('getQuizzes', undefined,
                        draftQuizzes => {
                            const deletedQuizIndex = draftQuizzes.findIndex(q => q.id === quizId);

                            draftQuizzes.splice(deletedQuizIndex, 1);
                        })
                );

                await queryFulfilled.catch(() => {
                    deleteQuizResult.undo();
                });
            }
        }),
        // PATCH mutation to updated quizzes after editing
        editQuiz: builder.mutation({
            query: ({ quizId, data }) => ({
                url: `/quizzes/${quizId}`,
                method: 'PATCH',
                body: data,
            }),

            // updating quizzes on redux store pessimistically after editing a quiz
            async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
                const editedQuiz = await queryFulfilled;

                if (editedQuiz?.data?.id) {
                    dispatch(
                        apiSlice.util.updateQueryData('getQuizzes', undefined,
                            draftQuizzes => {
                                const editedQuizIndex = draftQuizzes.findIndex(q => q.id === quizId);

                                draftQuizzes.splice(editedQuizIndex, 1, editedQuiz.data);
                            })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetQuizzesQuery,
    useLazyGetQuizQuery,
    useAddQuizMutation,
    useDeleteQuizMutation,
    useEditQuizMutation,
} = quizzesApi;

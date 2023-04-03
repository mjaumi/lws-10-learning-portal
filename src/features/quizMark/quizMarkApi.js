import { apiSlice } from '../api/apiSlice';

// initializing the quiz mark APIs here 
export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the quiz marks from the server
        getQuizMarks: builder.query({
            query: () => '/quizMark',
        }),
        // GET query to get quiz marks by studentId & videoId
        getQuizMarkByStudentAndVideoId: builder.query({
            query: ({ studentId, videoId }) => `/quizMark?student_id_like=${studentId}&video_id_like=${videoId}`,
        }),
        // POST mutation to add new quiz mark in the server
        addQuizMark: builder.mutation({
            query: data => ({
                url: '/quizMark',
                method: 'POST',
                body: data,
            }),

            // updating quiz marks pessimistically after a quiz is submitted 
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                const addedQuizMark = await queryFulfilled;

                if (addedQuizMark?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getQuizMarks', undefined,
                        draftQuizMarks => {
                            draftQuizMarks.push(addedQuizMark.data);
                        })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetQuizMarksQuery,
    useLazyGetQuizMarkByStudentAndVideoIdQuery,
    useGetQuizMarkByStudentIdQuery,
    useAddQuizMarkMutation,
} = quizMarkApi;

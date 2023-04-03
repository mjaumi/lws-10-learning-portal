import { apiSlice } from '../api/apiSlice';

// initializing the assignment mark APIs here
export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignment mark from the server
        getAssignmentMark: builder.query({
            query: () => '/assignmentMark',
        }),
        // GET query to get assignment marks by studentId & assignmentId
        getAssignmentMarkByStudentAndAssignmentId: builder.query({
            query: ({ studentId, assignmentId }) => `/assignmentMark?student_id_like=${studentId}&assignment_id_like=${assignmentId}`,
        }),
        // POST mutation to add new assignment mark in the server
        addAssignmentMark: builder.mutation({
            query: data => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                const addedAssignmentMark = await queryFulfilled;

                if (addedAssignmentMark?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getAssignmentMark', undefined,
                        draftAssignmentMark => {
                            draftAssignmentMark.push(addedAssignmentMark.data);
                        }));
                }
            }
        }),
        // PATCH mutation to update assignment mark in the server
        updateAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data,
            }),

            // updating assignment mark in redux store pessimistically after marks are published
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                const updateMarkResult = await queryFulfilled;

                if (updateMarkResult?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getAssignmentMark', undefined,
                        draftAssignmentMark => {
                            const updatedAssignmentIndex = draftAssignmentMark.findIndex(a => a.id === id);

                            draftAssignmentMark.splice(updatedAssignmentIndex, 1, updateMarkResult.data);
                        })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetAssignmentMarkQuery,
    useLazyGetAssignmentMarkByStudentAndAssignmentIdQuery,
    useAddAssignmentMarkMutation,
    useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;

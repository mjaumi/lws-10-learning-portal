import { apiSlice } from '../api/apiSlice';

// initializing the assignment mark APIs here
export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignment mark from the server
        getAssignmentMark: builder.query({
            query: () => '/assignmentMark',
        }),
        // GET query to get assignment marks by studentId
        getAssignmentMarkByStudentId: builder.query({
            query: studentId => `/assignmentMark?student_id_like=${studentId}`,
        }),
        // POST mutation to add new assignment mark in the server
        addAssignmentMark: builder.mutation({
            query: data => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data,
            }),

            // updating redux store assignment marks pessimistically after adding an assignment
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                const addedAssignmentMark = await queryFulfilled;

                if (addedAssignmentMark?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getAssignmentMarkByStudentId', data.student_id,
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
    useGetAssignmentMarkByStudentIdQuery,
    useAddAssignmentMarkMutation,
    useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;

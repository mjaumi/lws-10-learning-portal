import { apiSlice } from '../api/apiSlice';

export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignment mark from the server
        getAssignmentMark: builder.query({
            query: () => '/assignmentMark',
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
    useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;

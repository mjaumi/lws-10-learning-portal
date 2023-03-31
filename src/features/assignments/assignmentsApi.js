import { apiSlice } from '../api/apiSlice';

// initializing the assignments APIs here
export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignments from the server
        getAssignments: builder.query({
            query: () => '/assignments',
        }),
        // POST mutation to add new assignment in the server
        addAssignment: builder.mutation({
            query: data => ({
                url: '/assignments',
                method: 'POST',
                body: data,
            }),

            // updating assignments on redux store pessimistically after adding an assignment
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                const addedAssignment = await queryFulfilled;

                if (addedAssignment?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined,
                        draftAssignments => {
                            draftAssignments.push(addedAssignment.data);
                        })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetAssignmentsQuery,
    useAddAssignmentMutation,
} = assignmentsApi;

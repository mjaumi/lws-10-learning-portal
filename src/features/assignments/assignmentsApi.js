import { apiSlice } from '../api/apiSlice';
import { assignmentMarkApi } from '../assignmentMark/assignmentMarkApi';
import { getDataToEdit } from '../edit/editSlice';

// initializing the assignments APIs here
export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the assignments from the server
        getAssignments: builder.query({
            query: () => '/assignments',
        }),
        // GET query to get a single assignment from the server
        getAssignment: builder.query({
            query: assignmentId => `/assignments/${assignmentId}`,

            // getting single assignment to redux store here 
            async onQueryStarted(assignmentId, { queryFulfilled, dispatch }) {
                const assignmentToEdit = await queryFulfilled;

                if (assignmentToEdit?.data?.id) {
                    dispatch(getDataToEdit(assignmentToEdit.data));
                }
            }
        }),
        // GET query to get assignments by video id from the server
        getAssignmentsByVideoId: builder.query({
            query: videoId => `/assignments?video_id_like=${videoId}`,
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
        // DELETE mutation to delete an assignment from the server
        deleteAssignment: builder.mutation({
            query: assignmentId => ({
                url: `/assignments/${assignmentId}`,
                method: 'DELETE',
            }),

            // updating assignments on redux store optimistically while deleting an assignment
            async onQueryStarted(assignmentId, { queryFulfilled, dispatch }) {
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData('getAssignments', undefined,
                        draftAssignments => {
                            const deletedAssignmentIndex = draftAssignments.findIndex(a => a.id === assignmentId);

                            draftAssignments.splice(deletedAssignmentIndex, 1);
                        })
                );

                await queryFulfilled.catch(() => {
                    deleteResult.undo();
                })
            }
        }),
        editAssignment: builder.mutation({
            query: ({ assignmentId, data }) => ({
                url: `/assignments/${assignmentId}`,
                method: 'PATCH',
                body: data,
            }),

            // updating assignments on redux store pessimistically after editing an assignment
            async onQueryStarted({ assignmentId }, { queryFulfilled, dispatch, getState }) {
                const prevAssignment = getState().learningPortalAPI.queries[`getAssignment(${assignmentId})`]?.data;

                const editedAssignment = await queryFulfilled;

                if (editedAssignment?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined,
                        draftAssignments => {
                            const editedAssignmentIndex = draftAssignments.findIndex(a => a.id === assignmentId);

                            draftAssignments.splice(editedAssignmentIndex, 1, editedAssignment.data);
                        })
                    );

                    if (prevAssignment.totalMark !== editedAssignment.data.totalMark || prevAssignment.title !== editedAssignment.data.title) {
                        console.log('NOT EQUAL');

                        let submittedAssignments = [];

                        await dispatch(assignmentMarkApi.endpoints.getAssignmentMarkByAssignmentId.initiate(assignmentId))
                            .unwrap()
                            .then(data => submittedAssignments = [...data])
                            .catch();

                        submittedAssignments.map(submittedAssignment => dispatch(
                            assignmentMarkApi.endpoints.editAssignmentMark.initiate({
                                id: submittedAssignment.id,
                                data: {
                                    title: editedAssignment.data.title,
                                    totalMark: Number(editedAssignment.data.totalMark),
                                }
                            })
                        ));
                    }
                }
            }
        })
    }),
});

export const {
    useGetAssignmentsQuery,
    useLazyGetAssignmentQuery,
    useGetAssignmentsByVideoIdQuery,
    useAddAssignmentMutation,
    useDeleteAssignmentMutation,
    useEditAssignmentMutation,
} = assignmentsApi;

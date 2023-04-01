import { apiSlice } from '../api/apiSlice';
import { assignmentsApi } from '../assignments/assignmentsApi';
import { getDataToEdit } from '../edit/editSlice';
import { quizzesApi } from '../quizzes/quizzesApi';

// initializing the videos APIs here
export const videosApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get videos from server
        getVideos: builder.query({
            query: () => '/videos',
        }),
        // GET query to get single video from server
        getVideo: builder.query({
            query: videoId => `/videos/${videoId}`,

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const video = await queryFulfilled;

                if (video?.data?.id) {
                    dispatch(getDataToEdit(video.data));
                }
            }
        }),
        // POST mutation to add new videos to the server
        addVideo: builder.mutation({
            query: data => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),

            // updating videos in redux store pessimistically after adding a new video
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const video = await queryFulfilled;

                if (video?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getVideos', undefined,
                        draftVideos => {
                            draftVideos.push(video.data);
                        })
                    );
                }
            }
        }),
        // DELETE mutation for deleting videos from the server
        deleteVideo: builder.mutation({
            query: videoId => ({
                url: `/videos/${videoId}`,
                method: 'DELETE',
            }),

            // updating videos in redux store optimistically when the video is deleted
            async onQueryStarted(videoId, { queryFulfilled, dispatch }) {
                let deleteResult = dispatch(
                    apiSlice.util.updateQueryData('getVideos', undefined,
                        draftVideos => {
                            const deletedVideoIndex = draftVideos.findIndex(v => v.id === videoId);

                            draftVideos.splice(deletedVideoIndex, 1);
                        })
                );

                try {
                    await queryFulfilled;

                    // deleting related assignments & quizzes after the video is deleted
                    let relatedAssignments = [];
                    let relatedQuizzes = [];

                    await dispatch(assignmentsApi.endpoints.getAssignmentsByVideoId.initiate(videoId))
                        .unwrap()
                        .then(data => relatedAssignments = [...data])
                        .catch();

                    relatedAssignments.map(assignment => dispatch(
                        assignmentsApi.endpoints.deleteAssignment.initiate(assignment.id)
                    ));

                    await dispatch(quizzesApi.endpoints.getQuizByVideoId.initiate(videoId))
                        .unwrap()
                        .then(data => relatedQuizzes = [...data])
                        .catch();

                    console.log(relatedAssignments, relatedQuizzes);

                    relatedQuizzes.map(quiz => dispatch(
                        quizzesApi.endpoints.deleteQuiz.initiate(quiz.id)
                    ));

                } catch (error) {
                    deleteResult.undo();
                }
            }
        }),
        // PATCH mutation to edit video information in the server
        editVideo: builder.mutation({
            query: ({ videoId, data }) => ({
                url: `/videos/${videoId}`,
                method: 'PATCH',
                body: data,
            }),

            // updating videos in redux store pessimistically when a video is edited 
            async onQueryStarted({ videoId }, { queryFulfilled, dispatch, getState }) {
                const unEditedVideo = getState().learningPortalAPI.queries[`getVideo(${videoId})`]?.data;

                const editedVideoResult = await queryFulfilled;

                if (editedVideoResult?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getVideos', undefined,
                        draftVideos => {
                            const editedVideoIndex = draftVideos.findIndex(v => v.id === videoId);

                            draftVideos.splice(editedVideoIndex, 1, editedVideoResult.data);
                        })
                    );

                    // updating related quizzes & assignments when the video title is edited
                    if (unEditedVideo.title !== editedVideoResult.data.title) {
                        let relatedAssignments = [];
                        let relatedQuizzes = [];

                        await dispatch(assignmentsApi.endpoints.getAssignmentsByVideoId.initiate(videoId))
                            .unwrap()
                            .then(data => relatedAssignments = [...data])
                            .catch();

                        relatedAssignments.map(assignment => dispatch(
                            assignmentsApi.endpoints.editAssignment.initiate({
                                assignmentId: assignment.id,
                                data: {
                                    video_title: editedVideoResult.data.title,
                                },
                            })
                        ));

                        await dispatch(quizzesApi.endpoints.getQuizByVideoId.initiate(videoId))
                            .unwrap()
                            .then(data => relatedQuizzes = [...data])
                            .catch();

                        relatedQuizzes.map(quiz => dispatch(
                            quizzesApi.endpoints.editQuiz.initiate({
                                quizId: quiz.id,
                                data: {
                                    video_title: editedVideoResult.data.title,
                                },
                            })
                        ));
                    }
                }
            }
        }),
    }),
});

export const {
    useGetVideosQuery,
    useLazyGetVideoQuery,
    useAddVideoMutation,
    useDeleteVideoMutation,
    useEditVideoMutation,
} = videosApi;

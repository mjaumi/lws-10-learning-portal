import { apiSlice } from '../api/apiSlice';
import { getVideoToEdit } from './videoSlice';

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
                    dispatch(getVideoToEdit(video.data));
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

                await queryFulfilled.catch(() => {
                    deleteResult.undo();
                });
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
            async onQueryStarted({ videoId }, { queryFulfilled, dispatch }) {
                const editedVideoResult = await queryFulfilled;

                if (editedVideoResult?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getVideos', undefined,
                        draftVideos => {
                            const editedVideoIndex = draftVideos.findIndex(v => v.id === videoId);

                            draftVideos.splice(editedVideoIndex, 1, editedVideoResult.data);
                        })
                    );
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

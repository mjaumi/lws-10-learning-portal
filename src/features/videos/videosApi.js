import { apiSlice } from '../api/apiSlice';

export const videosApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get videos from server
        getVideos: builder.query({
            query: () => '/videos',
        }),
        // POST mutation to add new videos to the server
        addVideo: builder.mutation({
            query: data => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),

            // updating videos in store pessimistically after adding a new video 
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const video = await queryFulfilled;

                console.log(video.data);

                if (video?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getVideos', undefined,
                        draftVideos => {
                            draftVideos.push(video.data);
                        })
                    );
                }
            }
        }),
    }),
});

export const {
    useGetVideosQuery,
    useAddVideoMutation,
} = videosApi;

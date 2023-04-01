import React, { useEffect } from 'react';
import VideoPlaylistItem from './VideoPlaylistItem';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import { useDispatch } from 'react-redux';
import { getVideoToPlay } from '../../features/video/videoSlice';

const VideoPlaylist = () => {
    // integration of RTK Query hooks here
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // setting first video to play on load
    useEffect(() => {
        if (videos?.length) {
            dispatch(getVideoToPlay(videos[0]));
        }
    }, [dispatch, videos]);

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !videos.length) {
        content = <p>No Videos Found</p>;
    }

    if (!isLoading && !isError && videos.length) {
        content =
            <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-base-100 p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
                {
                    videos.map(video => <VideoPlaylistItem
                        video={video}
                    />)
                }
            </div>;
    }

    // rendering video playlist component here
    return content;
};

export default VideoPlaylist;
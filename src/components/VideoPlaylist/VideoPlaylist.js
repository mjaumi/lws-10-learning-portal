import React from 'react';
import VideoPlaylistItem from './VideoPlaylistItem';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

const VideoPlaylist = () => {
    // integration of RTK Query hooks here
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <Error error={'Failed To Load The Videos!!'} />;
    }

    if (!isLoading && !isError && !videos.length) {
        content = <Error error={'No Videos Found!!'} />;
    }

    if (!isLoading && !isError && videos.length) {
        content =
            <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-base-100 p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
                {
                    videos.map(video => <VideoPlaylistItem
                        key={video.id}
                        video={video}
                    />)
                }
            </div>;
    }

    // rendering video playlist component here
    return content;
};

export default VideoPlaylist;
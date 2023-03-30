import React from 'react';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import VideosTableRow from './VideosTableRow';

const VideosTable = () => {
    // integration of RTK Query hooks here
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !videos.length) {
        content = <p>No Videos Found!!</p>;
    }

    if (!isLoading && !isError && videos.length) {
        content =
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                    <tr>
                        <th className='table-th'>Video Title</th>
                        <th className='table-th'>Description</th>
                        <th className='table-th'>Action</th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-slate-600/50'>

                    {
                        videos.map(video => <VideosTableRow
                            key={video.id}
                            videoId={video.id}
                            title={video.title}
                            description={video.description}
                        />)
                    }

                </tbody>
            </table>;
    }

    // rendering the admin videos table component here
    return content;
};

export default VideosTable;
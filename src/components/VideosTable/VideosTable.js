import React from 'react';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import VideosTableRow from './VideosTableRow';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Warning from '../UI/Warning';

const VideosTable = () => {
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
        content = <Warning warning={'No Videos Found!! But You Can Add Some.'} />;
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
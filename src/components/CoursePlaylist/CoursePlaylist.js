import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoPlaylist from '../VideoPlaylist/VideoPlaylist';



const CoursePlaylist = () => {

    // rendering course player component here
    return (
        <div className='mx-auto max-w-7xl px-5 lg:px-0'>
            <div className='grid grid-cols-3 gap-2 lg:gap-8'>
                <VideoPlayer />
                <VideoPlaylist />
            </div>
        </div>
    );
};

export default CoursePlaylist;
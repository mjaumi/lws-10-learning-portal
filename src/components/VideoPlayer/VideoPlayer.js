import moment from 'moment/moment';
import React from 'react';
import { useSelector } from 'react-redux';

const VideoPlayer = () => {
    // integration of react-redux hooks here
    const { title, url, description, createdAt } = useSelector(state => state.video.videoToPlay) || {};

    // rendering the video player component here
    return (
        <div className='col-span-full w-full space-y-8 lg:col-span-2'>
            <iframe width='100%' className='aspect-video' src={url}
                title={title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>

            <div>
                <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
                    {title}
                </h1>
                <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
                    Uploaded on {moment(createdAt).format('DD MMMM YYYY')}
                </h2>

                <div className='flex gap-4'>
                    <a href='./Quiz.html'
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                        এসাইনমেন্ট
                    </a>

                    <a href='./Quiz.html'
                        className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                        কুইজে অংশগ্রহণ করুন
                    </a>
                </div>
                <p className='mt-4 text-sm text-slate-400 leading-6'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default VideoPlayer;
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignmentsApi } from '../../features/assignments/assignmentsApi';
import { quizzesApi } from '../../features/quizzes/quizzesApi';
import { FaBan } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom';

const VideoPlayer = () => {
    // integration of react-redux hooks here
    const { id: videoId, title, url, description, createdAt } = useSelector(state => state.video.videoToPlay) || {};

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // integration of react hooks here
    const [relatedAssignments, setRelatedAssignments] = useState(undefined);
    const [relatedQuizzes, setRelatedQuizzes] = useState(undefined);

    // fetching related assignments & quizzes on video loading
    useEffect(() => {
        if (videoId) {
            dispatch(assignmentsApi.endpoints.getAssignmentsByVideoId.initiate(videoId))
                .unwrap()
                .then(data => setRelatedAssignments([...data]))
                .catch();

            dispatch(quizzesApi.endpoints.getQuizzesByVideoId.initiate(videoId))
                .unwrap()
                .then(data => setRelatedQuizzes([...data]))
                .catch();
        }
    }, [dispatch, videoId]);

    // rendering the video player component here
    return (
        <div className='col-span-full w-full space-y-8 lg:col-span-2'>
            <iframe width='100%' className='aspect-video' src={url}
                title={title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
                            {title}
                        </h1>
                        <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
                            Uploaded on {moment(createdAt).format('DD MMMM YYYY')}
                        </h2>
                    </div>
                    <div className='mr-3'>
                        {
                            (relatedQuizzes?.length === 1) ?
                                <span className='flex items-center text-xs text-warning'>
                                    <ImWarning className='mr-1 h-4 w-4' />
                                    কুইজ বাকী আছে
                                </span>
                                :
                                relatedQuizzes?.length > 1 ?
                                    <span className='flex items-center text-xs text-success'>
                                        <FiCheckCircle className='mr-1 h-4 w-4' />
                                        কুইজ দিয়েছেন
                                    </span>
                                    :
                                    <span className='flex items-center text-xs text-base-200'>
                                        <FaBan className='mr-1 h-4 w-4' />
                                        কুইজ নেই
                                    </span>
                        }
                    </div>
                </div>

                <div className='flex gap-4'>
                    {
                        relatedAssignments?.length > 0 &&
                        <a href='./Quiz.html' className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                            এসাইনমেন্ট
                        </a>
                    }

                    {
                        relatedQuizzes?.length > 0 &&
                        <Link to={'/quiz'} className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                            কুইজে অংশগ্রহণ করুন
                        </Link>
                    }
                </div>
                <p className='mt-4 text-sm text-slate-400 leading-6'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default VideoPlayer;
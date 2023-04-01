import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { removeDataFromEdit } from '../../features/edit/editSlice';
import { useAddVideoMutation, useEditVideoMutation } from '../../features/videos/videosApi';
import { toast } from 'react-toastify';

const VideoModal = ({ isModalOpen, setIsModalOpen }) => {
    // integration or RTK Query hooks here
    const [addVideo, { isSuccess, isError, isLoading }] = useAddVideoMutation();
    const [editVideo, { isSuccess: isEditSuccess, isError: isEditError, isLoading: isEditLoading }] = useEditVideoMutation();

    // integration of react-redux hooks here
    const videoToEdit = useSelector(state => state.editData.dataToEdit);
    const dispatch = useDispatch();

    // destructuring the video object here
    const { id, title: videoTitle, description: videoDescription, url: videoUrl, views: videoViews, duration: videoDuration, createdAt } = videoToEdit || {};

    // integration or react hooks here
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [views, setViews] = useState('');
    const [description, setDescription] = useState('');

    // setting the modal input values with the existing video value here
    useEffect(() => {
        if (id) {
            setIsModalOpen(true);

            setTitle(videoTitle);
            setUrl(videoUrl);
            setDuration(videoDuration);
            setViews(videoViews);
            setDescription(videoDescription);
        }
    }, [id, setIsModalOpen, videoTitle, videoUrl, videoDuration, videoViews, videoDescription]);

    // informing and navigating user based on video add success or error here
    useEffect(() => {
        if (isSuccess) {
            toast.success('Video Added Successfully!!');
            setIsModalOpen(false);
        }

        if (isError) {
            toast.error('Failed To Add New Video!!');
        }
    }, [isSuccess, isError, setIsModalOpen]);

    // informing and navigating user based on video edit success or error here
    useEffect(() => {
        if (isEditSuccess) {
            toast.success('Video Edited Successfully!!');
            setIsModalOpen(false);
        }

        if (isEditError) {
            toast.error('Failed To Edit The Video!!');
        }
    }, [isEditSuccess, isEditError, setIsModalOpen]);

    // this function is resetting the form
    const resetForm = () => {
        setTitle('');
        setUrl('');
        setDuration('');
        setViews('');
        setDescription('');
    }

    // handler function to handle video form submission
    const videoFormHandler = e => {
        e.preventDefault();

        if (videoToEdit?.id) {
            editVideo({
                videoId: id,
                data: {
                    title,
                    description,
                    url,
                    views,
                    duration,
                    createdAt,
                }
            });
            dispatch(removeDataFromEdit());
        } else {
            addVideo({
                title,
                description,
                url,
                views,
                duration,
                createdAt: moment().format('YYYY-MM-DDThh:mm:ss.ms'),
            });
        }
    }

    // handler function to handle modal close
    const modalCloseHandler = () => {
        setIsModalOpen(false);

        if (videoToEdit?.id) {
            dispatch(removeDataFromEdit());
            resetForm();
        }
    }

    // rendering video modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='video-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box relative bg-primary border-2 border-secondary'>
                    <button onClick={modalCloseHandler} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>{id ? 'Edit Video' : 'Add New Video'}</h3>
                    <form onSubmit={videoFormHandler}>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Video Title
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Video Title Here...' className='input input-bordered w-full bg-neutral' required value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Video URL
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Video URL Here...' className='input input-bordered w-full bg-neutral' required value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Video Duration
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Video Duration Here...' className='input input-bordered w-full bg-neutral' required value={duration} onChange={e => setDuration(e.target.value)} />
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Video Views
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Video Views Here...' className='input input-bordered w-full bg-neutral' required value={views} onChange={e => setViews(e.target.value)} />
                        </div>
                        <div className='form-control text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Video Description
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <textarea className='textarea textarea-bordered h-32 bg-neutral' placeholder='Video Description Here...' required value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                        </div>
                        <div className='modal-action'>
                            <button type='button' onClick={modalCloseHandler} className='btn btn-sm btn-accent border-2 border-accent hover:bg-transparent rounded-full w-28 capitalize'>
                                <ImCancelCircle className='mr-2' />
                                Cancel
                            </button>
                            <button type='submit' className='btn btn-sm btn-secondary border-2 border-secondary hover:bg-transparent hover:text-white rounded-full capitalize w-28 px-5 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading || isEditLoading}>
                                <BsFillCloudUploadFill className='mr-2' />
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
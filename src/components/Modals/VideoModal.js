import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useAddVideoMutation } from '../../features/videos/videosApi';

const VideoModal = ({ isModalOpen, setIsModalOpen }) => {
    // integration or RTK Query hooks here
    const [addVideo, { isSuccess, isError, isLoading }] = useAddVideoMutation();

    // integration or react hooks here
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [views, setViews] = useState('');
    const [description, setDescription] = useState('');

    console.log(moment().format('YYYY-MM-DDTHH:mm:ss.ms'));

    // informing and navigating user based on registration success or error here
    useEffect(() => {
        if (isSuccess) {
            console.log('Video Added Successfully!!.');
            setIsModalOpen(false);
        }

        if (isError) {
            console.log('Failed To Add New Video!!');
        }
    }, [isSuccess, isError, setIsModalOpen]);

    // handler function to handle video form submission
    const videoFormHandler = e => {
        e.preventDefault();

        addVideo({
            title,
            description,
            url,
            views,
            duration,
            createdAt: moment().format('YYYY-MM-DDThh:mm:ss.ms'),
        });
    }

    // rendering video modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='video-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box relative bg-primary border-2 border-secondary'>
                    <button onClick={() => setIsModalOpen(false)} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>Add New Video</h3>
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
                            <button type='button' onClick={() => setIsModalOpen(false)} className='btn btn-sm btn-accent border-2 border-accent hover:bg-transparent rounded-full w-28 capitalize'>
                                <ImCancelCircle className='mr-2' />
                                Cancel
                            </button>
                            <button type='submit' className='btn btn-sm btn-secondary border-2 border-secondary hover:bg-transparent hover:text-white rounded-full capitalize w-28 px-5 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
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
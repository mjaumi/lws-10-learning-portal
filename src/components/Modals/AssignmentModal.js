import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useAddAssignmentMutation } from '../../features/assignments/assignmentsApi';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const AssignmentModal = ({ isModalOpen, setIsModalOpen }) => {
    // integration of RKT Query hooks here
    const [addAssignment, { isSuccess, isError, isLoading }] = useAddAssignmentMutation();
    const { data: videos } = useGetVideosQuery();

    // integration of react hooks here
    const [title, setTitle] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [totalMark, setTotalMark] = useState('');

    // informing and navigating user based on assignment add success or error here
    useEffect(() => {
        if (isSuccess) {
            console.log('Video Added Successfully!!.');
            setIsModalOpen(false);
        }

        if (isError) {
            console.log('Failed To Add New Video!!');
        }
    }, [isSuccess, isError, setIsModalOpen]);

    // handler function to handle assignment form submission
    const assignmentFormHandler = e => {
        e.preventDefault();

        addAssignment({
            title,
            video_id: videos.find(video => video.title === videoTitle).id,
            video_title: videoTitle,
            totalMark,
        });
    }

    // handler function to handle modal close
    const modalCloseHandler = () => {
        setIsModalOpen(false);
    }

    // rendering the assignment modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='video-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box relative bg-primary border-2 border-secondary'>
                    <button onClick={modalCloseHandler} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>Add New Assignment</h3>
                    <form onSubmit={assignmentFormHandler}>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Assignment Title
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Assignment Title Here...' className='input input-bordered w-full bg-neutral' required value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Select Assignment Video
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <select className='select select-bordered w-full bg-neutral font-normal' required value={videoTitle} onChange={e => setVideoTitle(e.target.value)}>
                                <option value='' hidden>Select Video</option>
                                {
                                    videos?.map(video => <option key={video.id}>
                                        {video.title}
                                    </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Assignment Marks
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='number' min={1} placeholder='Assignment Marks Here...' className='input input-bordered w-full bg-neutral' required value={totalMark} onChange={e => setTotalMark(e.target.value)} />
                        </div>
                        <div className='modal-action'>
                            <button type='button' onClick={modalCloseHandler} className='btn btn-sm btn-accent border-2 border-accent hover:bg-transparent rounded-full w-28 capitalize'>
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

export default AssignmentModal;
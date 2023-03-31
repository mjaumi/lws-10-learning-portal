import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useAddAssignmentMutation, useEditAssignmentMutation } from '../../features/assignments/assignmentsApi';
import { removeAssignmentFromEdit } from '../../features/assignments/assignmentSlice';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const AssignmentModal = ({ isModalOpen, setIsModalOpen }) => {
    // integration of RKT Query hooks here
    const [addAssignment, { isSuccess, isError, isLoading }] = useAddAssignmentMutation();
    const [editAssignment, { isSuccess: isEditSuccess, isError: isEditError, isLoading: isEditLoading }] = useEditAssignmentMutation();
    const { data: videos } = useGetVideosQuery();

    // integration of react-redux hooks here
    const assignmentToEdit = useSelector(state => state.assignment.assignmentToEdit);
    const dispatch = useDispatch();

    // destructuring the assignment to edit object here
    const { id, video_title, title: assignmentTitle, totalMark: assignmentMark } = assignmentToEdit || {};

    // integration of react hooks here
    const [title, setTitle] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [totalMark, setTotalMark] = useState('');

    // setting the modal input values with the existing assignment value here
    useEffect(() => {
        if (id) {
            setIsModalOpen(true);

            setTitle(assignmentTitle);
            setVideoTitle(video_title);
            setTotalMark(assignmentMark);
        }
    }, [id, setIsModalOpen, video_title, assignmentTitle, assignmentMark]);

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

    // informing and navigating user based on assignment edit success or error here
    useEffect(() => {
        if (isEditSuccess) {
            console.log('Video Edited Successfully!!.');
            setIsModalOpen(false);
        }

        if (isEditError) {
            console.log('Failed To Edit The Video!!');
        }
    }, [isEditSuccess, isEditError, setIsModalOpen]);

    // this function is resetting the form
    const resetForm = () => {
        setTitle('');
        setVideoTitle('');
        setTotalMark('');
    }

    // handler function to handle assignment form submission
    const assignmentFormHandler = e => {
        e.preventDefault();

        if (id) {
            editAssignment({
                assignmentId: id,
                data: {
                    title,
                    video_id: videos.find(video => video.title === videoTitle).id,
                    video_title: videoTitle,
                    totalMark,
                }
            })
        } else {
            addAssignment({
                title,
                video_id: videos.find(video => video.title === videoTitle).id,
                video_title: videoTitle,
                totalMark,
            });
        }

        resetForm();
    }

    // handler function to handle modal close
    const modalCloseHandler = () => {
        setIsModalOpen(false);

        if (id) {
            dispatch(removeAssignmentFromEdit());
            resetForm();
        }
    }

    // rendering the assignment modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='video-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box relative bg-primary border-2 border-secondary'>
                    <button onClick={modalCloseHandler} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>{id ? 'Edit Assignment' : 'Add New Assignment'}</h3>
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

export default AssignmentModal;
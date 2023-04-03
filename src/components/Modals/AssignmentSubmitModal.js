import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useAddAssignmentMarkMutation } from '../../features/assignmentMark/assignmentMarkApi';

const AssignmentSubmitModal = ({ isModalOpen, setIsModalOpen, assignment }) => {
    // destructuring the assignments here
    const { id, title, totalMark } = assignment || {};

    // integration of RTK Query hooks here
    const [addAssignmentMark, { isLoading, isSuccess, isError }] = useAddAssignmentMarkMutation();

    // integration of react-redux hooks here
    const { user } = useSelector(state => state.auth);

    // integration of react hooks here
    const [repoLink, setRepoLink] = useState('');

    // informing user based on assignment submit success or error here
    useEffect(() => {
        if (isSuccess) {
            toast.success('Assignment Submitted Successfully!!');
            setRepoLink('');
            setIsModalOpen(false);
        }

        if (isError) {
            toast.error('Failed To Submit The Assignment!!');
        }
    }, [isSuccess, isError, setIsModalOpen]);

    // handler function to handle assignment submission
    const assignmentSubmitHandler = e => {
        e.preventDefault();

        addAssignmentMark({
            student_id: user.id,
            student_name: user.name,
            assignment_id: id,
            title,
            createdAt: moment().format('YYYY-MM-DDThh:mm:ss.ms'),
            totalMark,
            mark: 0,
            repo_link: repoLink,
            status: 'pending',
        });
    }

    // handler function to handle modal close
    const modalCloseHandler = () => {
        setIsModalOpen(false);
        setRepoLink('');
    }

    // rendering assignment submit modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='assignment-submit-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box relative bg-primary border-2 border-secondary'>
                    <button onClick={modalCloseHandler} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>Submit Assignment</h3>
                    <form onSubmit={assignmentSubmitHandler}>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Github Repository Link
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Github Repository Link Here...' className='input input-bordered w-full bg-neutral' required value={repoLink} onChange={e => setRepoLink(e.target.value)} />
                        </div>
                        <div className='modal-action justify-center'>
                            <button type='submit' className='btn btn-sm btn-secondary border-2 border-secondary hover:bg-transparent hover:text-white rounded-full capitalize px-5 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
                                <BsFillCloudUploadFill className='mr-2' />
                                Submit Assignment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmitModal;
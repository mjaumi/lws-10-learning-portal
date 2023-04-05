import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import { MdAssignment } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addSelectedAssignment } from '../../features/selectedAssignment/selectedAssignmentSlice';

const SelectAssignmentToSubmit = ({ assignment, userAssignments }) => {
    // destructuring the assignment object here
    const { id, title } = assignment || {};

    // integration of react-redux hooks here
    const dispatch = useDispatch();


    // checking if user submitted the assignment or not
    const hasUserSubmittedTheAssignment = userAssignments?.reduce((submitted, assignmentData) => {
        if (assignmentData.assignment_id === id) {
            submitted = true;
        }
        return submitted;
    }, false);

    // handler function to select a particular assignment
    const SelectAssignmentToSubmitHandler = () => {
        dispatch(addSelectedAssignment(assignment));
    }

    // rendering select assignment to submit component here
    return (
        <div className='w-full flex items-center gap-2 p-2 py-3'>
            <MdAssignment className='h-5 w-5' />
            <div className='flex justify-between items-center w-full'>
                <p className='text-slate-50 text-sm font-medium'>{title}</p>
                <div className='flex items-center'>
                    <div className='mr-4'>
                        {
                            !hasUserSubmittedTheAssignment ?
                                <span className='flex items-center text-xs text-warning'>
                                    <ImWarning className='mr-1 h-4 w-4' />
                                    জমা দেননি
                                </span>
                                :
                                <span className='flex items-center text-xs text-success'>
                                    <FiCheckCircle className='mr-1 h-4 w-4' />
                                    জমা দিয়েছেন
                                </span>
                        }
                    </div>
                    {
                        !hasUserSubmittedTheAssignment &&
                        <button onClick={SelectAssignmentToSubmitHandler} className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'>
                            জমা দিন
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default SelectAssignmentToSubmit;
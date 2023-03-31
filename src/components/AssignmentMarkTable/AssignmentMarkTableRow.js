import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useUpdateAssignmentMarkMutation } from '../../features/assignmentMark/assignmentMarkApi';

const AssignmentMarkTableRow = ({ assignmentMarkRow }) => {
    // destructuring the assignment mark row component here
    const { id, title, createdAt, student_name, repo_link, status, mark, totalMark } = assignmentMarkRow || {};

    // integration or RTK Query hooks here
    const [updateAssignmentMark, { isSuccess, isError, isLoading }] = useUpdateAssignmentMarkMutation();

    // integration of react hooks here
    const [assignmentMark, setAssignmentMark] = useState(mark);

    // informing and navigating user based on video delete success or error here
    useEffect(() => {
        if (isSuccess) {
            console.log('Assignment Mark Updated Successfully!!.');
        }

        if (isError) {
            console.log('Failed To Update The Assignment Mark!!');
        }
    }, [isSuccess, isError]);

    // handler function to handle marks update form submission
    const updateFormHandler = e => {
        e.preventDefault();

        updateAssignmentMark({
            id,
            data: {
                mark: assignmentMark,
                status: 'published',
            }
        });
    }

    // rendering assignment mark table row component here
    return (
        <tr>
            <td className='table-td'>{title}</td>
            <td className='table-td'>{moment(createdAt).format('DD MMM YYYY LTS')}</td>
            <td className='table-td'>{student_name}</td>
            <td className='table-td'>{repo_link}</td>
            {
                status === 'pending' ?
                    <td className='table-td input-mark'>
                        <form className='flex items-center' onSubmit={updateFormHandler}>
                            <input min={0} max={totalMark} value={assignmentMark} onChange={e => setAssignmentMark(e.target.value)} />
                            <button type='submit' className='ml-3 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
                                <svg fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor'
                                    className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'>
                                    <path strokeLinecap='round' strokeLinejoin='round'
                                        d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                            </button>
                        </form>
                    </td>
                    :
                    <td className='table-td'>{mark}</td>
            }

        </tr>
    );
};

export default AssignmentMarkTableRow;
import React from 'react';
import { useGetAssignmentsQuery } from '../../features/assignments/assignmentsApi';
import AssignmentTableRow from './AssignmentTableRow';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Warning from '../UI/Warning';

const AssignmentTable = () => {
    // integration of RTK Query hooks here
    const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <Error error={'Failed To Load The Assignments!!'} />;
    }

    if (!isLoading && !isError && !assignments.length) {
        content = <Warning warning={'No Assignments Found!! But You Can Add Some.'} />;
    }

    if (!isLoading && !isError && assignments.length) {
        content =
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                    <tr>
                        <th className='table-th'>Title</th>
                        <th className='table-th'>Video Title</th>
                        <th className='table-th'>Mark</th>
                        <th className='table-th'>Action</th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-slate-600/50'>
                    {
                        assignments.map(assignment => <AssignmentTableRow
                            key={assignment.id}
                            assignmentId={assignment.id}
                            title={assignment.title}
                            videoTitle={assignment.video_title}
                            marks={assignment.totalMark}
                        />)
                    }
                </tbody>
            </table>;
    }



    // rendering assignment table component here
    return content;
};

export default AssignmentTable;
import React from 'react';
import { useGetAssignmentsQuery } from '../../features/assignments/assignmentsApi';
import AssignmentTableRow from './AssignmentTableRow';

const AssignmentTable = () => {
    // integration of RTK Query hooks here
    const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !assignments.length) {
        content = <p>No Videos Found!!</p>;
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
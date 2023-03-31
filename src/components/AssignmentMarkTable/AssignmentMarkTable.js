import React from 'react';
import AssignmentMarkTableRow from './AssignmentMarkTableRow';

const AssignmentMarkTable = ({ assignmentMark }) => {

    // rendering the assignment mark table here
    return (
        <table className='divide-y-1 text-base divide-gray-600 w-full'>
            <thead>
                <tr>
                    <th className='table-th'>Assignment</th>
                    <th className='table-th'>Date</th>
                    <th className='table-th'>Student Name</th>
                    <th className='table-th'>Repo Link</th>
                    <th className='table-th'>Mark</th>
                </tr>
            </thead>

            <tbody className='divide-y divide-slate-600/50'>
                {
                    assignmentMark.map(assignmentMarkRow => <AssignmentMarkTableRow
                        key={assignmentMarkRow.id}
                        assignmentMarkRow={assignmentMarkRow}
                    />)
                }
            </tbody>
        </table>
    );
};

export default AssignmentMarkTable;
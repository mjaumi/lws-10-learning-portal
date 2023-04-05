import React from 'react';
import AssignmentMarkTable from '../../components/AssignmentMarkTable/AssignmentMarkTable';
import { useGetAssignmentMarkQuery } from '../../features/assignmentMark/assignmentMarkApi';
import Layout from '../../layouts/Layout';
import PageTitle from '../../components/UI/PageTitle';

const AssignmentMark = () => {
    // integration of RTK Query hooks here
    const { data: assignmentMark, isLoading, isError } = useGetAssignmentMarkQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !assignmentMark.length) {
        content = <p>No Assignments To Show!!</p>;
    }

    if (!isLoading && !isError && assignmentMark.length) {
        content =
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <ul className='assignment-status'>
                        <li>Total <span>{assignmentMark.length}</span></li>
                        <li>Pending <span>{assignmentMark.reduce((pendingCount, assignment) => assignment.status === 'pending' ? (pendingCount + 1) : pendingCount, 0)}</span></li>
                        <li>Mark Sent <span>{assignmentMark.reduce((pendingCount, assignment) => assignment.status === 'published' ? (pendingCount + 1) : pendingCount, 0)}</span></li>
                    </ul>
                    <div className='overflow-x-auto mt-4'>
                        <AssignmentMarkTable assignmentMark={assignmentMark} />
                    </div>
                </div>
            </div>;

    }

    // rendering the assignment mark page here
    return (
        <Layout>
            <PageTitle title={'Assignment Mark'} />
            {content}
        </Layout>
    );
};

export default AssignmentMark;
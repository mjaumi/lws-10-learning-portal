import React from 'react';
import AssignmentMarkTable from '../../components/AssignmentMarkTable/AssignmentMarkTable';
import Layout from '../../layouts/Layout';

const AssignmentMark = () => {

    // rendering the assignment mark page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <ul className='assignment-status'>
                        <li>Total <span>4</span></li>
                        <li>Pending <span>3</span></li>
                        <li>Mark Sent <span>1</span></li>
                    </ul>
                    <div className='overflow-x-auto mt-4'>
                        <AssignmentMarkTable />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AssignmentMark;
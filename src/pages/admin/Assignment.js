import React from 'react';
import AssignmentTable from '../../components/AssignmentTable/AssignmentTable';
import Layout from '../../layouts/Layout';

const Assignment = () => {

    // rendering the assignment page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button className='btn ml-auto'>Add Assignment</button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <AssignmentTable />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Assignment;
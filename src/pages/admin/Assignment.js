import React, { useState } from 'react';
import AssignmentTable from '../../components/AssignmentTable/AssignmentTable';
import AssignmentModal from '../../components/Modals/AssignmentModal';
import Layout from '../../layouts/Layout';

const Assignment = () => {
    // integration of react hooks here
    const [isModalOpen, setIsModalOpen] = useState(false);

    // rendering the assignment page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button onClick={() => setIsModalOpen(true)} className='btn btn-sm btn-secondary border-2 border-secondary px-6 rounded-full text-black font-medium ml-auto hover:bg-primary hover:text-white duration-300 flex items-center capitalize'>

                            Add Assignment
                        </button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <AssignmentTable />
                    </div>
                </div>
                <AssignmentModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
        </Layout>
    );
};

export default Assignment;
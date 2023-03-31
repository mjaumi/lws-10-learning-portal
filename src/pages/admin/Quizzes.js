import React, { useState } from 'react';
import { MdQuiz } from 'react-icons/md';
import QuizzesModal from '../../components/Modals/QuizzesModal';
import QuizzesTable from '../../components/QuizzesTable/QuizzesTable';
import Layout from '../../layouts/Layout';

const Quizzes = () => {
    // integration of react hooks here
    const [isModalOpen, setIsModalOpen] = useState(false);

    // rendering the quizzes page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button onClick={() => setIsModalOpen(true)} className='btn btn-sm btn-secondary border-2 border-secondary px-6 rounded-full text-black font-medium ml-auto hover:bg-primary hover:text-white duration-300 flex items-center capitalize'>
                            <MdQuiz className='mr-2' />
                            Add Quiz
                        </button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <QuizzesTable />
                    </div>
                    <QuizzesModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Quizzes;
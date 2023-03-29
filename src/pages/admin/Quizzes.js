import React from 'react';
import QuizzesTable from '../../components/QuizzesTable/QuizzesTable';
import Layout from '../../layouts/Layout';

const Quizzes = () => {

    // rendering the quizzes page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button className='btn ml-auto'>Add Quiz</button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <QuizzesTable />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Quizzes;
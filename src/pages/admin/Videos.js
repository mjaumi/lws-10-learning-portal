import React from 'react';
import VideosTable from '../../components/VideosTable/VideosTable';
import Layout from '../../layouts/Layout';

const Videos = () => {

    // rendering the videos page here
    return (
        <Layout>
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button className='btn ml-auto'>Add Video</button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <VideosTable />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Videos;
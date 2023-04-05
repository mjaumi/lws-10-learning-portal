import React, { useState } from 'react';
import VideosTable from '../../components/VideosTable/VideosTable';
import Layout from '../../layouts/Layout';
import { RiVideoAddFill } from 'react-icons/ri';
import VideoModal from '../../components/Modals/VideoModal';
import PageTitle from '../../components/UI/PageTitle';

const Videos = () => {
    // integration or react hooks here
    const [isModalOpen, setIsModalOpen] = useState(false);

    // rendering the videos page here
    return (
        <Layout>
            <PageTitle title={'Videos'} />
            <div className='mx-auto max-w-full px-5 lg:px-20'>
                <div className='px-3 py-20 bg-opacity-10'>
                    <div className='w-full flex'>
                        <button onClick={() => setIsModalOpen(true)} className='btn btn-sm btn-secondary border-2 border-secondary px-6 rounded-full text-black font-medium ml-auto hover:bg-primary hover:text-white duration-300 flex items-center capitalize'>
                            <RiVideoAddFill className='mr-2' />
                            Add Video
                        </button>
                    </div>
                    <div className='overflow-x-auto mt-4'>
                        <VideosTable />
                    </div>
                    <VideoModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Videos;
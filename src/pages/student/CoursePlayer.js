import React from 'react';
import Layout from '../../layouts/Layout';
import CoursePlaylist from '../../components/CoursePlaylist/CoursePlaylist';
import PageTitle from '../../components/UI/PageTitle';

const CoursePlayer = () => {

    // rendering the course player page here
    return (
        <Layout>
            <PageTitle title={'Course Player'} />
            <CoursePlaylist />
        </Layout>
    );
};

export default CoursePlayer;
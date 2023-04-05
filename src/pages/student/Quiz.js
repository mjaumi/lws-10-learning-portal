import React from 'react';
import QuizSet from '../../components/QuizSet/QuizSet';
import Layout from '../../layouts/Layout';
import PageTitle from '../../components/UI/PageTitle';

const Quiz = () => {

    // rendering quiz page here
    return (
        <Layout>
            <PageTitle title={'Quiz'} />
            <QuizSet />
        </Layout>
    );
};

export default Quiz;
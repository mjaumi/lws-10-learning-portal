import React from 'react';
import LeaderBoardTable from '../../components/LeaderBoardTable/LeaderBoardTable';
import Layout from '../../layouts/Layout';
import PageTitle from '../../components/UI/PageTitle';

const LeaderBoard = () => {

    // rendering leader board page here
    return (
        <Layout>
            <PageTitle title={'Leaderboard'} />
            <LeaderBoardTable />
        </Layout>
    );
};

export default LeaderBoard;
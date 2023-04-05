import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title }) => {

    // rendering the web page title here
    return (
        <Helmet>
            <title>{title} || LWS Learning Portal</title>
        </Helmet>
    );
};

export default PageTitle;
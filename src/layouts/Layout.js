import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Layout = ({ children }) => {

    // defining the student webpages layout here
    return (
        <>
            <Navbar />
            <section className='py-6 bg-primary h-[calc(100vh_-_64px)]'>
                {children}
            </section>
        </>
    );
};

export default Layout;
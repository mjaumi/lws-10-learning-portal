import React from 'react';
import logo from '../assets/image/learning-portal.svg';

const LoginRegistrationPageLayout = ({ children, pageTitle }) => {

    // defining login registration page layout here
    return (
        <section className='py-6 bg-primary h-screen grid place-items-center'>
            <div className='mx-auto max-w-md px-5 lg:px-0'>
                <div>
                    <img className='h-12 mx-auto' src={logo} alt='logo' />
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
                        {pageTitle}
                    </h2>
                </div>
                {children}
            </div>
        </section>
    );
};

export default LoginRegistrationPageLayout;
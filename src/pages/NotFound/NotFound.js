import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';

const NotFound = () => {
    // integration of react-redux hooks here
    const { user } = useSelector(state => state.auth);

    // integration or react-router-dom hooks here
    const navigate = useNavigate();

    // handler function to return user to homepage
    const returnToHomepageHandler = () => {
        if (user) {
            if (user.role === 'student') {
                navigate('/');
            } else {
                navigate('/admin');
            }
        } else {
            navigate('/');
        }
    }

    // rendering 404 page here
    return (
        <section className='h-screen w-screen'>
            <PageTitle title={'404 Page Not Found'} />
            <div className='h-full flex flex-col justify-center items-center'>
                <h1 className='text-9xl font-bold text-secondary'>404</h1>
                <h3 className='text-4xl font-semibold mt-3 text-secondary'>Page Not Found!!</h3>
                <button onClick={returnToHomepageHandler} className='btn btn-secondary capitalize mt-10 px-20 border-2 border-secondary hover:bg-transparent hover:text-secondary'>Return To Homepage</button>
            </div>
        </section>
    );
};

export default NotFound;
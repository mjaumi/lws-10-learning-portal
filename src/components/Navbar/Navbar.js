import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/learning-portal.svg';
import { userLoggedOut } from '../../features/auth/authSlice';

const Navbar = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    // integration of react-router-dom hooks here
    const location = useLocation()
    const navigate = useNavigate();

    // handler function to handle logout
    const logOutHandler = () => {
        localStorage.clear();
        dispatch(userLoggedOut());

        if (location.pathname.includes('admin')) {
            navigate('/admin');
        } else {
            navigate('/');
        }
    }

    // rendering the student navbar component here
    return (
        <nav className='shadow-md'>
            <div className='max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3'>
                <Link to={location.pathname.includes('admin') ? '/admin/dashboard' : '/course-player'}>
                    <img className='h-10' src={logo} alt='logo' />
                </Link>
                <div className='flex items-center gap-3'>
                    {
                        !location.pathname.includes('admin') &&
                        <Link to={'/leader-board'} className='hover:text-[#34B5FD] duration-200 font-semibold'>Leaderboard</Link>
                    }
                    <h2 className='font-bold'>{user?.name}</h2>
                    {
                        location.pathname.includes('admin') ?
                            <button
                                onClick={logOutHandler}
                                className='flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                                    stroke='currentColor' className='w-6 h-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round'
                                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75' />
                                </svg>
                                Logout
                            </button>
                            :
                            <button
                                onClick={logOutHandler}
                                className='flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan '>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                                    stroke='currentColor' className='w-6 h-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round'
                                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75' />
                                </svg>
                                Logout
                            </button>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
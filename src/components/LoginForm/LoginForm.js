import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import { userLoggedOut } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import useGetFirstVideoId from '../../hooks/useGetFirstVideoId';

const LoginForm = () => {
    // integration or RTK Query hooks here
    const [login, { data, isError, isLoading }] = useLoginMutation();

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // integration or react hooks here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // integration of react-router-dom hooks here
    const location = useLocation();
    const navigate = useNavigate();

    // integration of custom hooks here
    const { videoId, isFirstVideoFetched } = useGetFirstVideoId();

    // navigating and informing user based on login success or error here
    useEffect(() => {
        if (data?.accessToken && data.user) {
            if (location.pathname.includes('admin')) {
                if (data.user.role === 'admin') {
                    toast.success('Login Successful!!');
                    navigate('/admin/dashboard');
                } else {
                    toast.error('Wrong Admin Credentials!!');
                    localStorage.clear();
                    dispatch(userLoggedOut());
                }
            } else {
                if (data.user.role === 'student') {
                    toast.success(`Logged In Successfully!! Welcome, ${data.user.name}`);

                    if (isFirstVideoFetched) {
                        navigate(`/course-player/${videoId}`);
                    }
                } else {
                    toast.error('Wrong Student Credentials!!');
                    localStorage.clear();
                    dispatch(userLoggedOut());
                }
            }
        }

        if (isError) {
            toast.error('Incorrect Email Or Password!!');
        }
    }, [data, dispatch, isError, navigate, location, videoId, isFirstVideoFetched]);

    // handler function to handle login
    const loginHandler = e => {
        e.preventDefault();

        login({
            email,
            password,
            path: location.pathname.includes('admin') ? 'admin' : 'student',
        });
    }

    // rendering the log in form component here
    return (
        <form onSubmit={loginHandler} className='mt-8 space-y-6'>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                    <label htmlFor='email-address' className='sr-only'>Email address</label>
                    <input id='email-address' name='email' type='email' autoComplete='email' required
                        className='login-input rounded-t-md' placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password' className='sr-only'>Password</label>
                    <input id='password' name='password' type='password' autoComplete='current-password' required
                        className='login-input rounded-b-md' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </div>

            <div className='flex items-center justify-end'>
                <div className='text-sm'>
                    <Link to={'/registration'} className='font-medium text-violet-600 hover:text-violet-500'>

                        {
                            !location.pathname.includes('admin') ?
                                'Create New Account'
                                :
                                'Forgot your password?'
                        }
                    </Link>
                </div>
            </div>

            <div>
                <button type='submit'
                    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
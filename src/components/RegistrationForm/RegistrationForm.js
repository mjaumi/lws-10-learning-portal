import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';

const RegistrationForm = () => {
    // integration of RTK Query hooks here
    const [register, { isSuccess, isError, isLoading, error }] = useRegisterMutation();

    // integration of react hooks here
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // integration of react-router-dom hooks here
    const navigate = useNavigate();

    // informing and navigating user based on registration success or error here
    useEffect(() => {
        if (isSuccess) {
            console.log('Registration Successful!! Please, Login To Your Account.');
            navigate('/');
        }

        if (isError) {
            console.log(error?.data);
        }
    }, [isSuccess, isError, navigate, error]);

    // handler function to handle new user registration
    const registrationHandler = e => {
        e.preventDefault();

        if (password === confirmPassword) {
            register({
                email,
                password,
                role: 'student',
                name,
            });
        } else {
            console.log('Password Mismatched!!');
        }
    }

    // rendering registration form component here
    return (
        <form onSubmit={registrationHandler} className='mt-8 space-y-6'>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                    <label htmlFor='name' className='sr-only'>Name</label>
                    <input id='name' name='name' type='name' autoComplete='name' required
                        className='login-input rounded-t-md' placeholder='Student Name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email-address' className='sr-only'>Email address</label>
                    <input id='email-address' name='email' type='email' autoComplete='email' required
                        className='login-input ' placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password' className='sr-only'>Password</label>
                    <input id='password' name='password' type='password' autoComplete='current-password' required
                        className='login-input' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='confirm-password' className='sr-only'>Confirm Password</label>
                    <input id='confirm-password' name='confirm-password' type='password'
                        autoComplete='confirm-password' required className='login-input rounded-b-md'
                        placeholder='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
            </div>

            <div className='flex items-center justify-end'>
                <div className='text-sm'>
                    <Link to={'/'} className='font-medium text-violet-600 hover:text-violet-500'>
                        Login To Your Account
                    </Link>
                </div>
            </div>

            <div>
                <button type='submit'
                    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
                    Create Account
                </button>
            </div>
        </form>

    );
};

export default RegistrationForm;
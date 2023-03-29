import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';

const AdminLogin = () => {

    // rendering admin log in page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Sign in to Admin Account'}>
            <LoginForm />
        </LoginRegistrationPageLayout>
    );
};

export default AdminLogin;
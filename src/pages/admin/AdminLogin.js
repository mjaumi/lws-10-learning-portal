import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';
import PageTitle from '../../components/UI/PageTitle';

const AdminLogin = () => {

    // rendering admin log in page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Sign in to Admin Account'}>
            <PageTitle title={'Admin Login'} />
            <LoginForm />
        </LoginRegistrationPageLayout>
    );
};

export default AdminLogin;
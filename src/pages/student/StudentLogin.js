import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';
import PageTitle from '../../components/UI/PageTitle';

const StudentLogin = () => {

    // rendering the student log in page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Sign in to Student Account'}>
            <PageTitle title={'Login'} />
            <LoginForm />
        </LoginRegistrationPageLayout>
    );
};

export default StudentLogin;
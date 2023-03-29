import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';

const StudentLogin = () => {

    // rendering the student log in page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Sign in to Student Account'}>
            <LoginForm />
        </LoginRegistrationPageLayout>
    );
};

export default StudentLogin;
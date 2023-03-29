import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';

const StudentRegistration = () => {

    // rendering student registration page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Create Your New Account'}>
            <RegistrationForm />
        </LoginRegistrationPageLayout>
    );
};

export default StudentRegistration;
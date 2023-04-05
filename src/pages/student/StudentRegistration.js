import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginRegistrationPageLayout from '../../layouts/LoginRegistrationPageLayout';
import PageTitle from '../../components/UI/PageTitle';

const StudentRegistration = () => {

    // rendering student registration page here
    return (
        <LoginRegistrationPageLayout pageTitle={'Create Your New Account'}>
            <PageTitle title={'Registration'} />
            <RegistrationForm />
        </LoginRegistrationPageLayout>
    );
};

export default StudentRegistration;
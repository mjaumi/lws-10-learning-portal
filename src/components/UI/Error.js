import React from 'react';

const Error = ({ error }) => {

    // rendering error component here
    return (
        <div className='mt-10 flex justify-center'>
            <h4 className='text-accent text-xl font-medium capitalize'>{error}</h4>
        </div>
    );
};

export default Error;
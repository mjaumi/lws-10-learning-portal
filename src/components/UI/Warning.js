import React from 'react';

const Warning = ({ warning }) => {

    // rendering the warning component here
    return (
        <div className='mt-10 flex justify-center'>
            <h4 className='text-warning text-xl font-medium capitalize'>{warning}</h4>
        </div>
    );
};

export default Warning;
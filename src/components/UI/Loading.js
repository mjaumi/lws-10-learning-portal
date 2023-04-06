import React from 'react';
import { ThreeDots } from 'react-loading-icons'

const Loading = ({ className }) => {

    // rendering Loading icon component here
    return (
        <div className={`mt-10 flex justify-center ${className}`}>
            <ThreeDots fill='#34B5FD' width={'60px'} />
        </div>
    );
};

export default Loading;
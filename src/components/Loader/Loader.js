import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='h-screen grid place-items-center'>
            <ClimbingBoxLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;
import React from 'react';

const HomeSearch = () => {
    return (
        <div className='w-10/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <div className='flex justify-center items-center'>
                <div>
                    <input type="text" placeholder="Type here" className="input input-bordered input-secondary w-full focus:border-0" />
                </div>
                <div>
                    <button className='btn btn-secondary'>Search</button>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
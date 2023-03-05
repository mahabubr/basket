import React, { useState } from 'react';

const HomeSearch = () => {

    const [search, setSearch] = useState('')

    return (
        <div className='w-10/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <div className='flex justify-center items-center'>
                <div>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-secondary w-full focus:border-0" />
                </div>
                <div>
                    <button type='submit' className='btn btn-secondary'>Search</button>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
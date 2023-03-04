import React from 'react';
import HomeSearch from './HomeSearch/HomeSearch';
import Products from './Products/Products';

const HomeLayout = () => {
    return (
        <div className='my-20'>
            <HomeSearch></HomeSearch>
            <Products></Products>
        </div>
    );
};

export default HomeLayout;
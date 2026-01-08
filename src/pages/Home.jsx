import React from 'react';
import MainBanner from '../components/MainBanner/MainBanner';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div className='mt-10'>
            <MainBanner></MainBanner>
            <Categories></Categories>
        </div>
    );
};

export default Home;
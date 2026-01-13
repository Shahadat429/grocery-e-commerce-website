import React from 'react';
import MainBanner from '../components/MainBanner/MainBanner';
import Categories from './Categories/Categories';
import BestSeller from '../components/bestseller/BestSeller';
import BottomBanner from '../components/Bottom Banner/BottomBanner';
import NewsLetter from '../components/NewsLetter/NewsLetter';

const Home = () => {
    return (
        <div className='mt-10'>
            
            <MainBanner></MainBanner>
            <Categories></Categories>
            <BestSeller></BestSeller>
            <BottomBanner></BottomBanner>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;
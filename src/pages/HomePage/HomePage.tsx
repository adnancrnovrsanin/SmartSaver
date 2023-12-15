import React from 'react';
import Navbar from '../../components/navbar/navbar';
import HomeGrid from '../HomeGrid/HomeGrid';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <HomeGrid />
        </div>
    );
};

export default HomePage;

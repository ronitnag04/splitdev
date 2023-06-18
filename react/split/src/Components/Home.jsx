import React from 'react';
import Navbar from './Home_Components/Navbar';
import Hero from './Home_Components/Hero';
import Body from './Home_Components/Body';
import News from './News';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Body/>
    </div>
  );
}

export default Home;

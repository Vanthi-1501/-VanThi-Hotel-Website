import React from 'react';
import Hero from '../components/sections/Hero';
import UserStatsSection from '../components/sections/UserStatsSection';
import About from '../components/sections/About';
import RoomGrid from '../components/sections/RoomGrid';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

function Home() {
  return (
    <>
      <Hero />
      <UserStatsSection />
      <About />
      <RoomGrid />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}

export default Home;

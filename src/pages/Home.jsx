import React, { useState } from 'react';
import Hero from '../components/sections/Hero';
import UserStatsSection from '../components/sections/UserStatsSection';
import About from '../components/sections/About';
import RoomGrid from '../components/sections/RoomGrid';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

function Home() {
  const [searchFilter, setSearchFilter] = useState(null);

  const handleSearch = (criteria) => {
    setSearchFilter(criteria);
    // Cuộn xuống phần danh sách phòng
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <UserStatsSection />
      <About />
      <RoomGrid filter={searchFilter} />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}

export default Home;

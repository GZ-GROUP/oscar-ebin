import Navbar from "../layouts/Navbar";
import HeroSection from "../features/home/HeroSection";
import HowToSection from "../features/home/HowToSection";
import ReadySection from "../features/home/ReadySection";
import ContactUsSection from "../features/home/ContactUsSection";
import BrandsSection from "../features/home/BrandsSection";
import CharacteristicsSection from "../features/home/CharacteristicsSection";
import Footer from "../layouts/Footer";
import React from 'react';
    
    function Home() {
  return (
    <div className="home">
      <HeroSection />
      <BrandsSection />
      <div id="how-to"><HowToSection /></div>
      <div id="characteristics"><CharacteristicsSection /></div>
      <ReadySection />
      <div id="contact"><ContactUsSection /></div>
    </div>
  );
}
    export default Home;
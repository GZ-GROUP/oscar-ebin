import HeroSection from "../features/home/HeroSection";
import HowToSection from "../features/home/HowToSection";
import ReadySection from "../features/home/ReadySection";
import ContactUsSection from "../features/home/ContactUsSection";
import BrandsSection from "../features/home/BrandsSection";
import CharacteristicsSection from "../features/home/CharacteristicsSection";
import React from 'react';
    
    function Home() {
        return(
                <div className="home">
                    <HeroSection />
                    <BrandsSection />
                    <HowToSection />
                    <CharacteristicsSection />
                    <ContactUsSection />
                    <ReadySection />


                </div>

        )
        
    }

    export default Home;
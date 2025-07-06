import React, {useState} from 'react';
import Header from '../components/LandingPage/Header';
import HeroSection from '../components/LandingPage/HeroSection';
import KeunggulanSection from '../components/LandingPage/KeunggulanSection';
import FasilitasSection from '../components/LandingPage/FasilitasSection';
import PilihanKamar from '../components/LandingPage/PilihanKamar';

const LandingPage = () => {
    const [user] = useState({ role: 'guest' });



  return (
    <div className="font-jakarta">
      <Header />
      <HeroSection user={user} />
      <KeunggulanSection />
      <FasilitasSection />
      <PilihanKamar user={user}/>
    </div>
  );
};

export default LandingPage;

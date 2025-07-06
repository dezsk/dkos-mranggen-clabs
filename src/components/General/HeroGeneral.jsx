import React from 'react';
import BangunanKost from '../../assets/LandingPage/BangunanKost.svg';

const HeroSection = ({scrollToRef}) => {

const handleScroll = () => {
  scrollToRef.current?.scrollIntoView({
    behavior: 'smooth'});
  }; 

return(
  <section className="relative bg-white py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative">
        <img
          src={BangunanKost}
          alt="Kost"
          className="w-full h-[400px] object-cover rounded-xl brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-12 text-white">
          <h2 className="text-3xl mb-2 font-semibold  text-[#50A75F]">Hunian Aman dan Nyaman Dekat Kampus?</h2>
          <h1 className="text-7xl font-extrabold mb-4 text-black">D’Kost Mranggen <p>Solusinya!!!</p></h1>
          <div className="flex gap-4">
            <button 
            onClick={handleScroll}
            className="bg-[#50A75F] border border-white text-white font-semibold
            px-4 py-2 rounded hover:bg-[#3c8a4b] transition">
              Ajukan Sewa
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>  
);
};

export default HeroSection;

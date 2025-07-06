import React from 'react';
import logo from '../../assets/Header/DkostMranggen.svg';

const Header = () => { 
  return(
  <header className="bg-[#50A75F] text-white px-8 py-4 flex justify-between items-center">
    <img src={logo} alt="Logo" className="w-36" />
    <div className="space-x-3">
    </div>
  </header>
  );
};

export default Header;

import React from 'react';
import logo from '../../assets/Header/DkostMranggen.svg';
import AuthModal from '../Auth/FormLogin';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const[showModal, setShowModal] = React.useState(false);
  
  const navigate = useNavigate();
  const backtoHome = () => {
    navigate('/');
  }

  return(
  <header className="bg-[#50A75F] text-white px-8 py-4 flex justify-between items-center">
    <img src={logo} alt="Logo" className="w-36" onClick={backtoHome} />
    <div className="space-x-3">
      <button 
      onClick={()=> setShowModal(true)}
      className="border-2 border-white px-4 py-1 rounded 
      hover:bg-white hover:text-[#50A75F] transition
      text-l font-bold">Masuk</button>
    </div>

    {showModal && <AuthModal onClose={() => setShowModal(false)} />}
  </header>
  );
};

export default Header;

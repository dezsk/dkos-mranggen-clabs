import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/Header/DkostMranggen.svg';
import {FaUserCircle, FaBell} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderHome = () => {
    const username = localStorage.getItem('username') || 'Muhammad Umar Hatta';
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate('/PageDashboardUser');
  };

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate('/');
  };


  return (
    <header className="bg-[#50A75F] text-white px-8 py-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="w-36" />

      <div className="flex-1 flex justify-center">
        <span className="text-lg font-bold">{username}</span>
      </div>

      <div className="space-x-4 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">Profile</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleProfile}
              >
                Dashboard
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          )}
        </div>
        <button className="flex items-center space-x-2">
          <FaBell className="text-2xl" />
          <span className="hidden md:inline">Notifications</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderHome;

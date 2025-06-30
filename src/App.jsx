import React from 'react';

const Header = () => {
  return (
    <header className="bg-green-700 text-white py-4 px-8 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">D'Kost Mranggen</h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="material-icons">notifications</span>
        </button>
        <button className="w-8 h-8 rounded-full bg-white text-green-700 font-bold flex items-center justify-center">
          U
        </button>
      </div>
    </header>
  );
};

export default Header;
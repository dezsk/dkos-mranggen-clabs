import React from 'react';
import { FaUserCircle, FaBell, FaHome, FaBed, FaUsers, FaCog } from 'react-icons/fa';

const SideMenu = ({setActivePage, activePage}) => {

    return (
      <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <FaUserCircle className="text-4xl text-[#444]" />
            <div>
              <p className="font-semibold text-xl">Mamik Harini</p>
              <p className="text-m text-gray-500">Pemilik Kos</p>
            </div>
          </div>

          <nav className="space-y-4 text-xl">

            <button
              onClick={() => setActivePage('KosSaya')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KosSaya' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaHome className="text-lg" />
              <span>Kos Saya</span>
            </button>
            
            <button
              onClick={() => setActivePage('KelolaKamardanIklan')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KelolaKamardanIklan' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaBed className="text-lg" />
              <span>Kelola Kamar dan Iklan</span>
            </button>

            <button
              onClick={() => setActivePage('KelolaPenghuni')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KelolaPenghuni' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaUsers className="text-lg" />
              <span>Kelola Penghuni</span>
            </button>

            <button
              onClick={() => setActivePage('Pengaturan')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'Pengaturan' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaCog className="text-lg" />
              <span>Pengaturan</span>
            </button>

          </nav>
        </aside>
    );

};
export default SideMenu;
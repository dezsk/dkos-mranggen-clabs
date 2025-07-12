import React from 'react';
import { FaUserCircle, FaWallet,FaClock, FaBed, FaUsers, FaCog } from 'react-icons/fa';

const SideMenu = ({setActivePage, activePage}) => {

    return (
      <aside className="w-80 bg-[#F5F5F5] border-r min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <FaUserCircle className="text-4xl text-[#444]" />
            <div>
              <p className="font-semibold text-xl">Umar Hatta</p>
              <p className="text-m text-gray-500">Penyewa Kos</p>
            </div>
          </div>

          <nav className="space-y-4 text-xl">

            <button
              onClick={() => setActivePage('KosSaya')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KosSaya' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaBed className="text-lg" />
              <span>Kamar Saya</span>
            </button>
            
            <button
              onClick={() => setActivePage('RiwayatTransaksi')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === '' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaClock className="text-lg" />
              <span>Riwayat Transaksi</span>
            </button>

            <button
              onClick={() => setActivePage('KelolaTagihan')}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 hover:text-[#50A75F] ${
                activePage === 'KelolaTagihan' ? 'font-bold text-green-600' : 'text-gray-700'
              }`}>
              <FaWallet className="text-lg" />
              <span>Tagihan</span>
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
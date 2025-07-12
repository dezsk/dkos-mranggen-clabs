import React from 'react';
import { FaUserCircle, FaBell, FaHome, FaBed, FaUsers, FaCog } from 'react-icons/fa';


const KosSaya = () => {

    return (
    <div className="Kos Saya">
        <main className="flex-1 p-10">
          <h2 className="text-[#50a75F] font-semibold mb-4 text-xl">Kamar Saya</h2>
          <p className="text-gray-700 mb-6">Hai, Umar Hatta</p>

          <form className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Kos</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-white"
                value="D'Kost Mranggen"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nomor Kamar</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-white"
                value="A1"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Alamat Kos</label>
              <textarea
                className="w-full border px-4 py-2 rounded bg-white"
                rows="3"
                readOnly
                defaultValue={`Jl. Imogiri Barat, Bakung, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191`}
              />
            </div>
          </form>
        </main>
      </div>
    );

};
export default KosSaya;
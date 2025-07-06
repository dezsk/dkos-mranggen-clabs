import React from 'react';
import { FaWifi, FaDoorOpen, FaBolt} from 'react-icons/fa';

const DeskripsiKamarA = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#50A75F] mb-2">D’Kost Mranggen Kamar Tipe A</h2>

          {/* Spesifikasi */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Spesifikasi tipe kamar</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><FaDoorOpen /> Luas kamar 3x3 meter</li>
              <li className="flex items-center gap-2"><FaBolt /> Sudah termasuk listrik</li>
              <li className="flex items-center gap-2"><FaWifi /> Sudah termasuk wifi / internet</li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default DeskripsiKamarA;
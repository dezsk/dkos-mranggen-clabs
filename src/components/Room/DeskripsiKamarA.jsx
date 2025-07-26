import React, { useEffect, useState } from 'react';
import { FaWifi, FaDoorOpen, FaBolt } from 'react-icons/fa';

const DeskripsiKamarA = () => {
  const [kamarA, setKamarA] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchKamarA = async () => {
      try {
        const res = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resData = await res.json();
        const kosts = Array.isArray(resData.data) ? resData.data : [];
        const kamar = kosts.find((kost) => kost.roomType === 'A');

        if (kamar) {
          setKamarA(kamar);
        }
      } catch (error) {
        console.error('Gagal mengambil data kamar A:', error);
      }
    };

    fetchKamarA();
  }, []);

  if (!kamarA) {
    return <p className="text-center mt-6">Memuat deskripsi kamar...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#50A75F] mb-4">
          D’Kost Mranggen – Kamar Tipe A
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Spesifikasi Tipe Kamar</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <FaDoorOpen className="text-[#50A75F]" />
              {kamarA.description || 'Luas kamar tidak tersedia'}
            </li>
            {kamarA.facilities?.includes('Listrik') && (
              <li className="flex items-center gap-3">
                <FaBolt className="text-[#50A75F]" />
                Sudah termasuk listrik
              </li>
            )}
            {kamarA.facilities?.includes('Wifi') ||
            kamarA.facilities?.includes('Wi-Fi') ||
            kamarA.facilities?.includes('Internet') ? (
              <li className="flex items-center gap-3">
                <FaWifi className="text-[#50A75F]" />
                Sudah termasuk Wi-Fi / Internet
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeskripsiKamarA;

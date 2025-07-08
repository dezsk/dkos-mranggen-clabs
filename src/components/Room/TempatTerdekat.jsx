import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const TempatTerdekat = () => {
  const places = [
    "Kampus I Politeknik ATK Yogyakarta",
    "Sekolah Tinggi Teknologi Kedirgantaraan (STTKD)",
    "Institut Seni Indonesia Yogyakarta",
    "Rumah Sakit RBAZAIS Yogyakarta",
    "Stadion Sultan Agung Bantul",
    "Terminal Giwangan Yogyakarta",
  ];

  return (
    <div className='max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8'>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Tempat Terdekat</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {places.map((place, i) => (
            <li key={i}><FaMapMarkerAlt className="inline mr-1" /> {place}</li>
          ))}
        </ul>
      </div>
    </div>  
  );
};

export default TempatTerdekat;

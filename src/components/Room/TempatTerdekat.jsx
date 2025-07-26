import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const TempatTerdekat = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const kosts = Array.isArray(data.data) ? data.data : [];
        const allRules = kosts.flatMap((kost) => kost.rules || []);
        const uniqueRules = [...new Set(allRules)];
        setPlaces(uniqueRules);
      })
      .catch((error) => {
        console.error("Gagal ambil data tempat terdekat:", error);
      });
  }, []);

  return (
    <div className='max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8'>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Tempat Terdekat</h3>
        <ul className="pl-5 space-y-1 text-gray-700 list-none"> {/* Ubah list-style di sini jika perlu */}
          {places.map((place, i) => (
            <li key={i}>
              <FaMapMarkerAlt className="inline mr-1 text-red-500" /> {place}
            </li>
          ))}
        </ul>
      </div>
    </div>  
  );
};

export default TempatTerdekat;

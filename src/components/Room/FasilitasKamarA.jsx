import React, { useEffect, useState } from 'react';
import { FaBolt,FaTint,FaWifi,FaBed, FaArchive,FaDoorClosed,FaChair, FaFan, FaShower, FaToilet, FaQuestion, FaBath } from 'react-icons/fa';

const FasilitasKamarA = () => {
  const [fasilitas, setFasilitas] = useState([]);

  const iconMap = {
    'Listrik': <FaBolt />,
    'Air': <FaTint />,
    'Wifi': <FaWifi />,
    'Tempat Tidur': <FaBed />,
    'Lemari': <FaArchive />,
    'Meja dan Kursi': <FaChair />,
    'Pintu kamar': <FaDoorClosed />,
    'Kipas angin': <FaFan />,
    'Kamar Mandi Dalam': <FaShower />,
    'Ember dan Gayung': <FaBath />,
    'Toilet Duduk': <FaToilet />,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const kosts = Array.isArray(data.data) ? data.data : [];
        const kamarA = kosts.find((kost) => kost.roomType === "A");
        setFasilitas(kamarA?.facilities || []);
      })
      .catch((error) => {
        console.error("Gagal ambil data fasilitas:", error);
      });
  }, []);

  return (
    <div className='max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Fasilitas Kamar Tipe A</h3>
        <ul className='space-y-2 text-gray-700'>
          {fasilitas.map((item, idx) => (
            <li key={idx} className='flex items-center gap-2'>
              {iconMap[item] || <FaQuestion />} {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FasilitasKamarA;

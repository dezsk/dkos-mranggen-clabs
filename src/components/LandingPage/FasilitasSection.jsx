import React from 'react';
import { FaWifi, FaBed, FaChair, FaKey, FaShower, FaClock } from 'react-icons/fa';

const fasilitas = [
  { icon: <FaBed />, label: 'Tempat tidur' },
  { icon: <FaChair />, label: 'Meja dan Kursi' },
  { icon: <FaKey />, label: 'Kipas Angin' },
  { icon: <FaShower />, label: 'Toilet dalam' },
  { icon: <FaClock />, label: 'Akses 24 jam' },
  { icon: <FaWifi />, label: 'Internet Kencang' }
];

const FasilitasSection = () => (
  <section className="bg-[#50A75F] text-white py-10 px-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Fasilitas D’Kost Mranggen</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {fasilitas.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default FasilitasSection;

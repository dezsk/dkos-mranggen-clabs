import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const keunggulan = [
  "Lokasi strategis dekat kampus & jalan utama",
  "Kamar bersih, luas, dan nyaman",
  "Lingkungan aman dan eksklusif",
  "Wifi kencang dan fasilitas lengkap",
  "Booking online & bebas ribet",
  "Ramah Penghuni"
];

const KeunggulanSection = () => (
  <section className="bg-white py-10 px-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Kenapa harus D’Kost Mranggen?</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {keunggulan.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <FaCheckCircle className="text-[#50A75F] mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default KeunggulanSection;

import React from 'react';
import { FaBed, FaChair, FaDoorClosed, FaFan, FaShower, FaToilet } from 'react-icons/fa';

const FasilitasKamarA = () => {
  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold mb-2">Fasilitas Kamar</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li><FaBed className="inline mr-1" /> Tempat tidur</li>
        <li><FaDoorClosed className="inline mr-1" /> Lemari</li>
        <li><FaChair className="inline mr-1" /> Meja dan kursi</li>
        <li><FaFan className="inline mr-1" /> Kipas angin</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Fasilitas Kamar Mandi</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li><FaShower className="inline mr-1" /> Kamar mandi dalam</li>
        <li><FaToilet className="inline mr-1" /> Ember dan gayung</li>
        <li><FaToilet className="inline mr-1" /> Toilet duduk</li>
      </ul>
    </div>
  );
};

export default FasilitasKamarA;
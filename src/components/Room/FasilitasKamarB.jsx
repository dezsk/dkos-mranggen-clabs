import React from 'react';
import { FaBed, FaChair, FaDoorClosed, FaFan, FaShower, FaToilet } from 'react-icons/fa';

const FasilitasKamarA = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Fasilitas Kamar Tipe B</h3>
        <ul className='space-y-2 text-gray-700'>
          <li className='flex items-center gap-2'><FaBed /> Tempat tidur</li>
          <li className='flex items-center gap-2'><FaChair /> Kursi</li>
          <li className='flex items-center gap-2'><FaDoorClosed /> Pintu kamar</li>
          <li className='flex items-center gap-2'><FaFan /> Kipas angin</li>
          <li className='flex items-center gap-2'><FaShower /> Kamar mandi dalam</li>
          <li className='flex items-center gap-2'><FaToilet /> Toilet jongkok</li>
        </ul>
      </div>
    </div>  
  );
};

export default FasilitasKamarA;
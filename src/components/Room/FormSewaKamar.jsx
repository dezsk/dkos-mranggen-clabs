import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormSewa = () => {
  const navigate = useNavigate();

  const handleAjukanSewa = () => {
    navigate('/PageFormSewaKamar');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ajukan Sewa</h3>
        <div className="bg-white shadow rounded p-4 max-w-md">
          <p>Kamar tersedia: <strong>9</strong></p>
          <p>Harga sewa per bulan: <strong>Rp 1.000.000</strong></p>
          <a
          href="https://wa.me/+6282227153016"
          target="_blank"
          rel="noopener noreferrer" 
          className='block w-full text-[#50A75F] text-center py-2 rounded border-2 border-[#50A75F] font-semibold mt-3'>
            Hubungi Pemilik
          </a>
          <button
            onClick={handleAjukanSewa}
            type="button"
            className="w-full bg-[#50A75F] text-white py-2 rounded hover:bg-[#3c8a4b] font-semibold mt-3"
          >
            Ajukan Sewa
          </button>
        </div>
      </div>
    </div>  
  );
};

export default FormSewa;
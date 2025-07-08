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
          <button className='w-full text-[#50A75F] py-2 rounded border-2 border-[#50A75F] font-semibold mb-2'>
            Hubungi Pemilik
          </button>
          <button
            onClick={handleAjukanSewa}
            type="button"
            className="w-full bg-[#50A75F] text-white py-2 rounded hover:bg-[#3c8a4b] font-semibold"
          >
            Ajukan Sewa
          </button>
        </div>
      </div>
    </div>  
  );
};

export default FormSewa;
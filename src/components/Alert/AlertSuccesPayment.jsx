import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AlertSuccesPayment = () => {

    const navigate = useNavigate();

    const handleKembaliKeHome = () => {
        navigate ('/HomePage');
    };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center w-80 relative">
        <FaCheckCircle className="text-[#50A75F] text-5xl mb-4" />
        <h2 className="text-lg font-semibold mb-2">Pembayaran Anda Berhasil</h2>
        <p className="text-sm italic text-[#989898] mb-4">
        Silahkan cek notifikasi secara berkala. Admin akan melakukan verfikasi 1 x 24 Jam.
        </p>
        <button
          onClick={handleKembaliKeHome}
          className="px-4 py-2 bg-[#50A75F] text-white rounded hover:bg-[#3c8a4b] transition"
        >
          Kembali Ke Home
        </button>
      </div>
    </div>
  );
};

export default AlertSuccesPayment;

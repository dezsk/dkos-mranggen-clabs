import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const AlertLogin = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center w-80 relative">
        <FaTimesCircle className="text-red-500 text-5xl mb-4" />
        <h2 className="text-lg font-semibold mb-2">Kamu belum login</h2>
        <p className="text-sm text-gray-700 mb-4">Silakan login terlebih dahulu untuk melanjutkan.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#50A75F] text-white rounded hover:bg-[#3c8a4b] transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AlertLogin;

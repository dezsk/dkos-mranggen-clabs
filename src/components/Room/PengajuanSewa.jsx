import React from 'react';

const FormSewa = () => {
  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold mb-2">Ajukan Sewa</h3>
      <div className="bg-white shadow rounded p-4 max-w-md">
        <p>Kamar tersedia: <strong>9</strong></p>
        <input
          type="text"
          placeholder="Masukkan Kos"
          className="w-full border px-3 py-2 rounded my-2"
        />
        <select className="w-full border px-3 py-2 rounded mb-2">
          <option>Per Bulan</option>
          <option>Per Tahun</option>
        </select>
        <button className="w-full bg-[#50A75F] text-white py-2 rounded hover:bg-[#3c8a4b] font-semibold">
          Ajukan Sewa
        </button>
      </div>
    </div>
  );
};

export default FormSewa;
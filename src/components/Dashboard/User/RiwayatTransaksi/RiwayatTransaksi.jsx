import React, { useState } from 'react';

const RiwayatTransaksi = () => {
  const [dari, setDari] = useState('');
  const [sampai, setSampai] = useState('');

  const dataRiwayat = [
    {
      id: 1,
      bulan: 1,
      status: 'Terbayar',
      tanggal: '16 Juni 2025, 10:00',
    },
    {
      id: 2,
      bulan: 2,
      status: 'Terbayar',
      tanggal: '16 Juni 2025, 10:00',
    },
    {
      id: 3,
      bulan: 3,
      status: 'Terbayar',
      tanggal: '16 Juni 2025, 10:00',
    },
  ];

  const filteredData = dataRiwayat.filter(item => {
    if (!dari && !sampai) return true;

    const itemDate = new Date(item.tanggal);
    const dariDate = dari ? new Date(dari) : null;
    const sampaiDate = sampai ? new Date(sampai) : null;

    return (
      (!dariDate || itemDate >= dariDate) &&
      (!sampaiDate || itemDate <= sampaiDate)
    );
  });

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-[#50a75F] font-semibold mb-4 text-xl">Riwayat Transaksi</h2>

      <h3 className='text-[#0f0f0f] font-semibold mt-10 text-l'>Cari Riwayat Transaksi</h3>

      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="dari" className="text-sm text-gray-600">Dari</label>
          <input
            type="date"
            id="dari"
            value={dari}
            onChange={(e) => setDari(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="sampai" className="text-sm text-gray-600">Sampai</label>
          <input
            type="date"
            id="sampai"
            value={sampai}
            onChange={(e) => setSampai(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <h3 className='text-[#0f0f0f] font-semibold mt-10 text-l'>Daftar Riwayat Transaksi</h3>
      {filteredData.map(item => (
        <div key={item.id} className="border rounded-lg p-4 mb-4">
          <div>
            <p className="text-green-700 font-bold mb-1">Terbayar</p>
            <p className="text-green-800 font-semibold">Pembayaran bulan ke–{item.bulan}</p>
          </div>
          <p className="text-sm text-gray-800">{item.tanggal}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 italic">Terkonfimasi admin pada <p>Selasa, 9 Juli 2025 pukul 10.30 WIB</p></span>
            <button className="bg-green-600 text-white px-5 py-1 rounded">Unduh Bukti Pembayaran</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiwayatTransaksi;

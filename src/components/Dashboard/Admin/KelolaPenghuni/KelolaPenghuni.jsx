import React from 'react';

const dataPenghuni = [
  {
    id: 1,
    nama: 'Muhammad Umar Hatta',
    tipeKamar: 'A',
    durasi: '1 Bulan',
    status: 'Aktif',
    noHp: '0123456789',
  },
  {
    id: 2,
    nama: 'Muhammad Umar Hatta',
    tipeKamar: 'A',
    durasi: '1 Bulan',
    status: 'Masa aktif 7 hari lagi',
    noHp: '0123456789',
  },
  {
    id: 3,
    nama: 'Muhammad Umar Hatta',
    tipeKamar: 'A',
    durasi: '1 Bulan',
    status: 'Habis',
    noHp: '0123456789',
  },
];

const getStatusStyle = (status) => {
  if (status === 'Aktif') return 'bg-green-500 text-white';
  if (status.includes('hari')) return 'bg-yellow-300 text-orange-700';
  return 'bg-red-600 text-white';
};

const KelolaPenghuni = ({setActivePage}) => {

  const DetailPengguna = () => {
    setActivePage('DetailPenghuni')
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kelola Penghuni</h1>
      <div className="space-y-6">
        {dataPenghuni.map((penghuni, index) => (
          <div
            key={penghuni.id}
            className="border rounded-md shadow p-4 flex justify-between items-start"
          >
            <div className="space-y-1 text-sm leading-6">
              <p className="text-green-700 font-semibold">
                Penghuni #{index + 1}
              </p>
              <p>Nama : {penghuni.nama}</p>
              <p>Tipe kamar : {penghuni.tipeKamar}</p>
              <p>Durasi sewa : {penghuni.durasi}</p>
              <p className="flex items-center gap-2">
                Status :
                <span
                  className={`text-xs px-2 py-1 rounded ${getStatusStyle(
                    penghuni.status
                  )}`}
                >
                  {penghuni.status}
                </span>
              </p>
              <p>Nomor handphone : {penghuni.noHp}</p>
            </div>
            <button 
            onClick={DetailPengguna}
            className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800">
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelolaPenghuni;

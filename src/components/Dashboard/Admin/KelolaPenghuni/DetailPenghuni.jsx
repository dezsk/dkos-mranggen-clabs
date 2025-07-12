import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const DetailPenghuni = ({setActivePage}) => {
  const [tab, setTab] = useState('kirim');

  const handleBack = () => {
    setActivePage('KelolaPenghuni')
  }

  return (
    <div className="p-4 max-w-xl bg-white rounded shadow-md text-sm text-gray-800">
      {/* Informasi Penghuni */}

      <div className="flex items-center gap-2 mb-4 text-[#989898]">
              <button onClick={handleBack} className="text-xl">
                <FaArrowLeft />
              </button>
              kembali
      </div>

      <div className="mb-5 space-y-1 leading-relaxed">
        <p className="text-lg font-bold text-black">Kelola Muhammad Umar Hatta</p>
        <p>Nama : Muhammad Umar Hatta</p>
        <p>Tipe kamar : A</p>
        <p>Durasi sewa : 1 Bulan</p>
        <p>Mulai sewa : 1 Januari 2025</p>
        <p>Berlaku sampai : 28 Februari 2025</p>
        <p>
          Status:{' '}
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            Aktif
          </span>
        </p>
        <p>Nomor handphone : 0123456789</p>
      </div>

      {/* Tab Header */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={() => setTab('kirim')}
          className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
            tab === 'kirim'
              ? 'bg-red-100 text-red-700 border-red-500'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Kirim Tagihan
        </button>
        <button
          onClick={() => setTab('konfirmasi')}
          className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
            tab === 'konfirmasi'
              ? 'bg-yellow-100 text-yellow-700 border-yellow-500'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Konfirmasi Pembayaran
        </button>
        <button
          onClick={() => setTab('riwayat')}
          className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
            tab === 'riwayat'
              ? 'bg-green-100 text-green-700 border-green-500'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Riwayat Pembayaran
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'kirim' && (
        <div className="border rounded-lg p-4 bg-white space-y-3">
          <p className="text-red-500 font-semibold text-sm">Kirim Tagihan</p>
          <p className="text-gray-800 font-medium">Tagihan bulan ke–2</p>
          <p className="text-gray-700">Jatuh tempo <strong>10 Juli 2025</strong></p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Tenggat 21 hari lagi</span>
            <button className="bg-green-600 text-white px-5 py-1 rounded text-sm hover:bg-green-700">
              Kirim Tagihan
            </button>
          </div>
        </div>
      )}

      {tab === 'konfirmasi' && (
        <div className="border rounded-lg p-4 bg-white space-y-2">
          <p className="text-yellow-500 font-semibold text-sm">Konfirmasi Pembayaran</p>
          <p className="text-gray-800 font-medium">Pembayaran bulan ke–2</p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <p className="text-xs text-gray-500">14 Juni 2025, 10.00</p>
          <div className="flex gap-4 mt-3">
            <button className="bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600">
              Verifikasi
            </button>
            <button className="border border-gray-400 px-4 py-1 rounded text-sm hover:bg-gray-100">
              Tandai Sudah Dibayar
            </button>
          </div>
        </div>
      )}

      {tab === 'riwayat' && (
        <div className="border rounded-lg p-4 bg-white space-y-3">
          <p className="text-green-600 font-semibold text-sm">Sudah Dibayar</p>
          <p className="text-gray-800 font-medium">Pembayaran bulan ke–1</p>
          <p className="text-black text-lg font-bold">Rp 900.000</p>
          <p className="text-sm text-gray-600">Terbayar pada 9 Juli 2025</p>
          <div className="flex justify-between items-center">
            <span className="text-xs italic text-gray-500">
              Terkonfirmasi admin pada 9 Juli 2025, 10:30 WIB
            </span>
            <button className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700">
              Unduh Bukti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPenghuni;

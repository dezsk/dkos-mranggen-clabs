import React from 'react';

const DetailPenghuni = ({ data }) => {
  const {
    nama,
    tipeKamar,
    durasiSewa,
    mulaiSewa,
    berakhirSewa,
    status,
    noHP,
    statusPembayaran,
    waktuPembayaran,
    bulanPembayaran,
  } = data;

  const renderStatusLabel = () => {
    switch (statusPembayaran) {
      case 'perlu-verifikasi':
        return (
          <div className="text-red-500 font-medium text-sm">Perlu diverifikasi</div>
        );
      case 'terverifikasi':
        return (
          <div className="text-green-600 font-medium text-sm">Terverifikasi</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow mb-6">
      <h2 className="font-semibold mb-2">Kelola {nama}</h2>
      <div className="text-sm space-y-1">
        <p><span className="font-semibold">Nama</span> : {nama}</p>
        <p><span className="font-semibold">Tipe kamar</span> : {tipeKamar}</p>
        <p><span className="font-semibold">Durasi sewa</span> : {durasiSewa}</p>
        <p><span className="font-semibold">Mulai sewa</span> : {mulaiSewa}</p>
        <p><span className="font-semibold">Berakhir sewa</span> : {berakhirSewa}</p>
        <p>
          <span className="font-semibold">Status</span> :{' '}
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full text-white ${status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'}`}>
            {status}
          </span>
        </p>
        <p><span className="font-semibold">Nomor handphone</span> : {noHP}</p>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold mb-1">Tagihan</h3>

        <div className="flex gap-4 flex-wrap">
          {/* Tombol Verifikasi */}
          <button
            disabled={statusPembayaran === 'terverifikasi'}
            className={`px-4 py-1 rounded border ${statusPembayaran === 'terverifikasi' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700 border-green-400'}`}
          >
            {statusPembayaran === 'terverifikasi' ? 'Sudah Dibayar' : 'Verifikasi Pembayaran'}
          </button>

          {renderStatusLabel()}
        </div>

        <div className="flex items-center justify-between mt-3 border rounded p-2">
          <div>
            <p className="font-medium text-green-700">Pembayaran bulan ke–{bulanPembayaran}</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            {waktuPembayaran}
            <br />
            <button className="text-sm bg-green-600 text-white px-3 py-1 rounded mt-1">Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPenghuni;

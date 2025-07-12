  import { useState } from "react";
  

  const TagihanPembayaran = ({ setActivePage }) => {
  const [tab, setTab] = useState('belum');

  const BayarKos = () => {
    setActivePage('FormBayarKos');
  };

  const TagihanBelumDibayar = () => (
    <div className="border rounded-lg p-4 mt-4">
      <p className="text-red-500 font-semibold mb-1">Belum Dibayar</p>
      <p className="text-gray-800 font-medium mt-4">Pembayaran bulan ke - 1</p>
      <p className="text-gray-700 mt-1">Jatuh tempo <strong>10 Juli 2025</strong></p>
      <p className="text-black text-xl font-bold mt-1">Rp 900.000</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">Tenggat 21 hari lagi</span>
        <button 
          onClick={BayarKos}
          className="bg-green-600 text-white px-5 py-1 rounded"
        >
          Bayar
        </button>
      </div>
    </div>
  );

  const MenungguKonfirmasi = () => (
    <div className='border rounded-lg p-4 mt-4'>
      <p className='text-yellow-500 font-semibold mb-1'>Menunggu Konfirmasi</p>
      <p className="text-gray-800 font-medium mt-4">Pembayaran bulan ke - 1</p>
      <p className="text-black text-xl font-bold mt-1">Rp 900.000</p>
    </div>
  );

  const TagihanSudahDibayar = () => (
    <div className="border rounded-lg p-4 mt-4">
      <p className="text-green-600 font-semibold mb-1">Sudah Dibayar</p>
      <p className="text-gray-700 text-sm">Pembayaran telah dikonfirmasi oleh admin</p>
      <p className="text-gray-800 font-medium mt-4">Pembayaran bulan ke - 1</p>
      <p className="text-gray-700"><span className='text-black font-medium'>Terbayar pada</span> 9 Juli 2025</p>
      <p className="text-black text-xl font-bold mt-1">Rp 900.000</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500 italic">Terkonfimasi admin pada <p>Selasa, 9 Juli 2025 pukul 10.30 WIB</p></span>
        <button className="bg-green-600 text-white px-5 py-1 rounded">Unduh Bukti Pembayaran</button>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-xl">
      <h2 className="font-bold text-lg mb-3 text-black">Tagihan</h2>

      <div className="flex gap-4">
        <button
          onClick={() => setTab('belum')}
          className={`px-4 py-1 border rounded-full text-sm font-semibold ${
            tab === 'belum'
              ? 'bg-red-100 text-red-700 border-red-600'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Belum Dibayar
        </button>

        <button
          onClick={() => setTab('menunggu')}
          className={`px-4 py-1 border rounded-full text-sm font-semibold ${
            tab === 'menunggu'
              ? 'bg-yellow-100 text-yellow-700 border-yellow-500'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Menunggu Konfirmasi
        </button>

        <button
          onClick={() => setTab('sudah')}
          className={`px-4 py-1 border rounded-full text-sm font-semibold ${
            tab === 'sudah'
              ? 'bg-green-100 text-green-700 border-green-600'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          Sudah Dibayar
        </button>
      </div>
      
      {tab === 'belum' && <TagihanBelumDibayar />}
      {tab === 'menunggu' && <MenungguKonfirmasi />}
      {tab === 'sudah' && <TagihanSudahDibayar />}
    </div>
  );
};

export default TagihanPembayaran;

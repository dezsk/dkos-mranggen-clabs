import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';




export default function FormSewa() {

  const navigate = useNavigate();

  const onClickBayarSewa = () => {
    navigate ('/PagePembayaran');
 };

  

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
      <button  className="text-xl"><FaBackward/> </button>
      kembali
      </div>
      <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
        Formulir Pengajuan Sewa Kamar A
      </h1>

      <form className="space-y-4">
        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Informasi Penyewa
        </h1>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penyewa</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap penyewa sesuai Kartu Identitas"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone</label>
          <input
            type="text"
            placeholder="Isi dengan nomor handphone yang aktif"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <p>Laki-laki</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Asal</label>
          <div className="relative">
            <textarea
              rows="4"
              placeholder="Masukkan alamat asal penyewa sesuai Kartu Identittas"
              className="w-full border border-gray-300 rounded px-3 py-2"
              
            />
            
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black">Dokumen Persyaratan Masuk Kos</h2>
          <p className="text-sm text-gray-500 mb-4">
            Dokumen diperlukan untuk verifikasi penyewa yang sah dan sesuai dengan data penyewa
          </p>
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <span className="text-3xl text-gray-400">
              </span>
              <span className="text-sm text-gray-600 font-medium">Upload di sini</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-xs text-gray-500 mt-2">Foto KTP</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-black">Biaya sewa kos</h2>
          <p className="text-sm text-gray-500 mb-1">Harga sewa perbulan</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Dibayarkan satu bulan sekali</span>
            <span className="text-lg font-bold text-black">Rp 900.000</span>
          </div>
        </div>


        <div className='mb-4'>
          <h2 className="text-lg font-semibold text-black">Tanggal Mulai Sewa</h2>
          <input
            type="date"
            placeholder="Masukkan rencana tanggal mulai sewa"
            className="w-1/2 border border-[#989898] rounded px-3 py-2"
          />
        </div>

        <button
          onClick={onClickBayarSewa}
          
          className="w-1/2 mx-auto mt-10 py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
          >
          Ajukan Sewa
        </button> 
      </form>
    </div>
  );
}

import React from 'react';
import { FaBackward } from 'react-icons/fa';
import AlertSuccesPayment from '../Alert/AlertSuccesPayment';

export default function FormSewa() {

    const [showAlert, setShowAlert] = React.useState(false);
    const onClickKirimBuktiPembayaran = () => {
        setShowAlert(true);
    };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
      <button  className="text-xl"><FaBackward/> </button>
      kembali
      </div>
      <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
        Ringkasan Penyewa
      </h1>

        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Informasi Penyewa
        </h1>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penyewa</label>
            <p className="italic text-[#989898]">Nama yang telah di input</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone</label>
          <p className="italic text-[#989898]">Nomor Handphone yang telah diinput</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <p className='italic text-[#989898]'>Laki-laki</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Asal</label>
          <p className="italic text-[#989898]">Alamat yang telah diinput</p>
        </div>

    <h1 className="text-xl font-semibold mt-4 mb-4 text-[#50A75F] flex items-center gap-2">
        Dokumen Persyaratan Masuk Kos
    </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto KTP</label>
          <p className="italic text-[#989898]">Foto KTP yang telah diinput</p>
        </div>

    <h1 className="text-xl font-semibold mt-4 mb-4 text-[#50A75F] flex items-center gap-2">
        Detail Sewa
    </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kamar</label>
          <p className="italic text-[#989898]">Kamar Tipe A/B</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Masuk</label>
          <p className="italic text-[#989898]">Tanggal yang telah diinput</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harga Sewa Perbulan</label>
          <p className="italic text-[#989898]">Rp 900.000/Rp 1000.000</p>
        </div>



        <div className='mt-4 mb-4 text-red-500'>
            <p> Silakan periksa kembali informasi di atas, jika masih ada yang salah bisa kembali ke halaman sebelumnya untuk merubah data
            Jika sudah sesuai, lanjut ke proses unggah bukti pembayaran untuk menyelesaikan pengajuan sewa.
            </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#50A75F]">Pembayaran dan Kirim Bukti Pembayaran</h2>
          <p className="text-sm text-black mb-4">
            Silakan lakukan pembayaran sebesar Rp 900.000 ke rekening berikut:
            [Nama Bank] – [No. Rekening] a.n. [Nama Pemilik Kos]
          </p>
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <span className="text-3xl text-gray-400">
              </span>
              <span className="text-sm text-gray-600 font-medium">Upload di sini</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-xs text-gray-500 mt-2">Bukti Pembayaran</p>
          </div>
        </div>

        <div className='mb-4 font-bold text-red-500 sm'>
            <p> Proses validasi maksimal 1x24 jam oleh admin.
            </p>
        </div>

        <button
            onClick={onClickKirimBuktiPembayaran}
            type='submit'
            className="w-1/2 mx-auto mt-10 py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
            >
            Kirim Bukti Pembayaran
        </button>
        {showAlert && <AlertSuccesPayment onClose={() => setShowAlert(false)} />}
    </div>
  );
}

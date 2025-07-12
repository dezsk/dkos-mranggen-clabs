import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import AlertPembayaranKosBulanan from '../../../Alert/AlertPembayaranKosBulanan';

export default function FormBayarKos({ setActivePage }) {
  const [showAlert, setShowAlert] = React.useState(false);

  const onClickKirimBuktiPembayaran = () => {
    setShowAlert(true);
  };

  const handleBack = () => {
    setActivePage('KelolaTagihan'); // Atau 'KosSaya', tergantung kamu ingin balik ke mana
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
        <button onClick={handleBack} className="text-xl">
          <FaArrowLeft />
        </button>
        kembali
      </div>
      <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
        Pembayaran Tagihan
      </h1>

      <h2 className="text-xl font-semibold mb-4 text-black flex items-center gap-2" >Tagihan Bulan ke - 1</h2>

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
        {showAlert && (<AlertPembayaranKosBulanan onClose={() => setShowAlert(false)}setActivePage={setActivePage}/>
        )}
    </div>
  );
}

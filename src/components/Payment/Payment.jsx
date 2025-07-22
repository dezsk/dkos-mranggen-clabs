import React, { useState } from 'react';
import { FaBackward } from 'react-icons/fa';
import AlertSuccesPayment from '../Alert/AlertSuccesPayment';

export default function FormSewa() {
  const [showAlert, setShowAlert] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorUpload, setErrorUpload] = useState('');

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
    setErrorUpload('');
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onClickKirimBuktiPembayaran = async () => {
    if (!paymentProof) {
      setErrorUpload('Silakan upload bukti pembayaran terlebih dahulu.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const paymentId = 'your-payment-id'; // <- Ganti ini sesuai ID dari backend

      const formData = new FormData();
      formData.append('proof', paymentProof);

      const response = await fetch(`https://dkos-mranggen-clabs-production.up.railway.app/api/bookings/payments/${paymentId}/proof`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload gagal, coba lagi.');
      }

      setShowAlert(true);
      setErrorUpload('');
    } catch (error) {
      setErrorUpload(error.message || 'Gagal upload bukti pembayaran, coba lagi.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
        <button onClick={handleBackButtonClick} className="text-xl"><FaBackward /></button>
        kembali
      </div>

      <h1 className="text-xl font-semibold mb-4 text-black">Ringkasan Penyewa</h1>

      <h2 className="text-xl font-semibold mb-4 text-[#50A75F]">Informasi Penyewa</h2>
      <div className="mb-2"><p className="italic text-[#989898]">Nama Penyewa: Nama yang telah diinput</p></div>
      <div className="mb-2"><p className="italic text-[#989898]">Nomor HP: Nomor yang telah diinput</p></div>
      <div className="mb-2"><p className="italic text-[#989898]">Jenis Kelamin: Laki-laki</p></div>
      <div className="mb-6"><p className="italic text-[#989898]">Alamat: Alamat yang telah diinput</p></div>

      <h2 className="text-xl font-semibold mb-4 text-[#50A75F]">Dokumen Persyaratan Masuk Kos</h2>
      <p className="italic text-[#989898] mb-6">Foto KTP yang telah diinput</p>

      <h2 className="text-xl font-semibold mb-4 text-[#50A75F]">Detail Sewa</h2>
      <div className="mb-2"><p className="italic text-[#989898]">Jenis Kamar: Kamar Tipe A/B</p></div>
      <div className="mb-2"><p className="italic text-[#989898]">Tanggal Masuk: Tanggal yang telah diinput</p></div>
      <div className="mb-6"><p className="italic text-[#989898]">Harga Sewa: Rp 900.000 / Rp 1.000.000</p></div>

      <div className="text-red-500 mb-4">
        <p>Periksa kembali informasi. Jika salah, kembali ke halaman sebelumnya.</p>
        <p>Jika sudah benar, upload bukti pembayaran untuk menyelesaikan pengajuan sewa.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#50A75F]">Pembayaran & Bukti Pembayaran</h2>
        <p className="text-sm text-black mb-4">
          Transfer Rp 900.000 ke rekening berikut: [Nama Bank] – [No. Rekening] a.n. [Nama Pemilik Kos]
        </p>
        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
          <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Upload di sini</span>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">Bukti Pembayaran</p>

          {previewImage && (
            <div className="mt-4">
              <p className="text-xs text-gray-500">Preview Bukti Pembayaran:</p>
              <img
                src={previewImage}
                alt="Preview Bukti Pembayaran"
                className="mt-2 max-w-xs border rounded shadow"
              />
            </div>
          )}
        </div>
      </div>

      {errorUpload && (
        <p className="text-sm text-red-500 text-center">{errorUpload}</p>
      )}

      <p className="text-red-500 font-bold mb-4">Validasi oleh admin maksimal 1x24 jam.</p>

      <button
        onClick={onClickKirimBuktiPembayaran}
        type="button"
        disabled={!paymentProof}
        className={`w-1/2 mx-auto mt-10 py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors ${
          paymentProof ? 'bg-[#50A75F] hover:bg-[#3c8a4b]' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
      >
        Kirim Bukti Pembayaran
      </button>

      {showAlert && <AlertSuccesPayment onClose={() => setShowAlert(false)} />}
    </div>
  );
}

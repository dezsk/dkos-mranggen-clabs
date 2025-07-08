import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Pengaturan = () => {
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [ulangPasswordBaru, setUlangPasswordBaru] = useState('');
  const [showPassword, setShowPassword] = useState({
    lama: false,
    baru: false,
    ulang: false,
  });

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordBaru !== ulangPasswordBaru) {
      alert('Password baru dan ulangannya tidak sama!');
      return;
    }

    // Kirim data ubah password ke backend di sini
    alert('Password berhasil diubah!');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Pengaturan</h1>
      <div className="flex items-center gap-2 text-green-800 mb-4">
        <FaLock className="text-2xl" />
        <h2 className="font-semibold text-lg">Ubah Password</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Lama */}
        <div>
          <label className="block text-sm font-medium mb-1">Password Lama</label>
          <div className="relative">
            <input
              type={showPassword.lama ? 'text' : 'password'}
              value={passwordLama}
              onChange={(e) => setPasswordLama(e.target.value)}
              placeholder="Masukkan password lama"
              className="w-full border rounded px-3 py-2 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowPassword('lama')}
            >
              {showPassword.lama ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Password Baru */}
        <div>
          <label className="block text-sm font-medium mb-1">Password Baru</label>
          <div className="relative">
            <input
              type={showPassword.baru ? 'text' : 'password'}
              value={passwordBaru}
              onChange={(e) => setPasswordBaru(e.target.value)}
              placeholder="Masukkan password baru"
              className="w-full border rounded px-3 py-2 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowPassword('baru')}
            >
              {showPassword.baru ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Ulangi Password Baru */}
        <div>
          <label className="block text-sm font-medium mb-1">Ulangi Password Baru</label>
          <div className="relative">
            <input
              type={showPassword.ulang ? 'text' : 'password'}
              value={ulangPasswordBaru}
              onChange={(e) => setUlangPasswordBaru(e.target.value)}
              placeholder="Masukkan kembali password baru"
              className="w-full border rounded px-3 py-2 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowPassword('ulang')}
            >
              {showPassword.ulang ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white w-full py-2 rounded mt-4"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default Pengaturan;

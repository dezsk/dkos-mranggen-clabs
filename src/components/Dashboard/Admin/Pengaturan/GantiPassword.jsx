import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import AlertUbahPasswordUser from '../../../Alert/AlertUbahPasswordUser'

const GantiPassword = ({setActivePage}) => {

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

  const handleBack = () => {
    setActivePage('Pengaturan')
  };

  const [showAlert, setShowAlert] = React.useState(false);

  const handleSubmit = () => {
    setShowAlert(true);
  };


return (
    <div className='max-w-xl'>
        <div className="flex items-center gap-2 mb-4 text-[#989898]">
            <button onClick={handleBack} className="text-xl">
              <FaArrowLeft />
            </button>
            kembali
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
        {showAlert && (<AlertUbahPasswordUser onClose={() => setShowAlert(false)}setActivePage={setActivePage}/>
    )}
      </form>
    </div>
    );
};

export default GantiPassword;
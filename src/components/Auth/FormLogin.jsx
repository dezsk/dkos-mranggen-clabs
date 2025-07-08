import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import useAuthForm from './LogicAuthLogin';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    email, emailError, password, passwordError, captchaVerified,showPassword,
    handleEmailChange, handlePasswordChange, onChange, handleSubmit, isFormValid,togglePassword
  } = useAuthForm();

  const handleRegisterClick = () => {
    onClose(); // Menutup modal login
    navigate('/register'); // Ganti ke halaman register
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px] shadow-lg relative">
        <button className="absolute top-2 right-3 text-gray-500" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-[#50A75F]">Masuk ke D'Kost Mranggen</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#50A75F] text-black"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                 <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-black"
                  />
                <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 focus:outline-none'
                    tabIndex={-1}
                  >
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </button>
              </div>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <ReCAPTCHA sitekey='6LcXinkrAAAAACvy5X1NLKworT9rRXHF0LeD2zSa' onChange={onChange} className="mt-4" />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded font-semibold transition-colors ${
              captchaVerified
                ? "bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Masuk
          </button>

          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray-600">Belum punya akun D'Kost Mranggen?</p>
            <button onClick={handleRegisterClick} className="text-[#50A75F] font-semibold hover:underline">
              Daftar Sekarang
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray-600">Lupa Password?</p>
            <button className="text-[#50A75F] font-semibold hover:underline">
              Atur Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

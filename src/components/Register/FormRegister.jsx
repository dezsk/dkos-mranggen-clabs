import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import LogicAuthRegister from './LogicAuthRegister';
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function FormRegister() {

 const {
  name, phone, email, password,
  emailError, passwordError,isSubmitting,
  handleNameChange, handlePhoneChange, handleEmailChange, handlePasswordChange,
  onChange, handleSubmit, isFormValid, showPassword, togglePassword, handleBackClick,
} = LogicAuthRegister();

  

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4 text-black flex items-center gap-2">
        <button onClick={handleBackClick} className="text-xl"> ← </button> 
        Registrasi Akun Penyewa Kos
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Masukkan nama lengkap sesuai identitas"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Isi dengan nomor handphone yang aktif"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Masukkan email untuk D’Kost Mranggen"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Minimal 6 karakter"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
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

        <div className="flex items-center gap-2 mt-4">
          <ReCAPTCHA sitekey="6LcXinkrAAAAACvy5X1NLKworT9rRXHF0LeD2zSa" onChange={onChange}/>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors ${
            isFormValid && !isSubmitting
              ? "bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}>
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mendaftarkan...
            </>
          ) : (
            "Daftar"
          )}
        </button> 

        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun D’Kost Mranggen?{" "}
          <button className="text-[#50A75F] font-semibold hover:underline">
            Masuk di sini
          </button>
        </p>
      </form>
    </div>
  );
}

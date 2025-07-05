import React from 'react';

const AuthModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px] shadow-lg relative">
        <button className="absolute top-2 right-3 text-gray-500" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#50A75F]">Masuk ke D'Kost Mranggen</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan Email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#50A75F]"
          />
          <input
            type="password"
            placeholder="Masukkan Password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#50A75F]"
          />
          <button className="w-full bg-[#50A75F] text-white py-2 rounded hover:bg-[#3c8a4b]">
            Masuk
          </button>

            <div className="flex items-center gap-2 text-sm">
                <p className="text-gray-600">Belum punya akun D'Kost Mranggen?</p>
                    <button className="text-[#50A75F] font-semibold hover:underline">
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

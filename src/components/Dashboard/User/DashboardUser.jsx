import React from 'react';

const DashboardUser = () => {
  return (
    <div className="min-h-screen bg-white font-jakarta">

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#F9F9F9] border-r min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <FaUserCircle className="text-4xl text-[#444]" />
            <div>
              <p className="font-semibold text-sm">Umar Hatta</p>
              <p className="text-xs text-gray-500">Penyewa Kos</p>
            </div>
          </div>

          <nav className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-[#50A75F] font-bold">
              <FaHome /> Kos Saya
            </div>
            <div className="flex items-center gap-3 text-gray-700 hover:text-[#50A75F] cursor-pointer">
              <FaBed /> Kelola Kamar dan Iklan
            </div>
            <div className="flex items-center gap-3 text-gray-700 hover:text-[#50A75F] cursor-pointer">
              <FaUsers /> Kelola Penghuni
            </div>
            <div className="flex items-center gap-3 text-gray-700 hover:text-[#50A75F] cursor-pointer">
              <FaCog /> Pengaturan
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h2 className="text-xl font-bold mb-4">Kos Saya</h2>
          <p className="text-gray-700 mb-6">Hai, Nama Pemilik</p>

          <form className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Kos</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-white"
                value="D'Kost Mranggen"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Alamat Kos</label>
              <textarea
                className="w-full border px-4 py-2 rounded bg-white"
                rows="3"
                readOnly
                defaultValue={`Jl. Imogiri Barat, Bakung, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nomor Admin Kos</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded bg-white"
                value="0822–2715–3016"
                readOnly
              />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default DashboardUser;

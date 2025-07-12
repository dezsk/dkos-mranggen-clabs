import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';


export default function FormKamarB({setActivePage}) {

  //const navigate = useNavigate();

  //const onClickAjukanSewa = () => {
    //navigate ('/PagePembayaran');
 //};

const fotoLabels = ['Foto Kamar B', 'Foto Kamar B', 'Foto Kamar B', 'Foto Kamar B', 'Foto Kamar B'];
const fasilitas = ['Listrik', 'Air', 'Wifi', 'Tempat Tidur', 'Lemari', 'Meja dan Kursi'];
const fasilitasbathroom = ['Kamar Mandi Dalam', 'Ember dan Gayung', 'Toilet Duduk', 'Toilet Jongkok'];
const tempatterdekat = ['Warung', 'ATM', 'Laundry', 'Masjid', 'Kampus', 'Indomaret'];
const [tempatTerdekat, setTempatTerdekat] = useState(['']); // mulai dari 1 kolom

  const handleChange = (index, value) => {
    const newTempat = [...tempatTerdekat];
    newTempat[index] = value;
    setTempatTerdekat(newTempat);
  };

  const handleAdd = () => {
    if (tempatTerdekat.length < 6) {
      setTempatTerdekat([...tempatTerdekat, '']);
    }
  };

  const handleRemove = (index) => {
    const newTempat = [...tempatTerdekat];
    newTempat.splice(index, 1);
    setTempatTerdekat(newTempat);
  };

   const handleBack = () => {
    setActivePage('KelolaKamardanIklan')
  };


  return (
    <div className="max-w-screen-xl mx-auto mt-2 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
              <button onClick={handleBack} className="text-xl">
                <FaArrowLeft />
              </button>
              kembali
            </div>
      <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
        Kelola Kamar Tipe B
      </h1>

      <form className="space-y-4">
        <h2 className="text-lg font-semibold text-[#50A75F]">Masukkan Foto Kamar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fotoLabels.map((label, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-md p-20 bg-gray-50">
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl text-gray-400"></span>
                    <span className="text-sm text-gray-600 font-medium">Upload di sini</span>
                    <input type="file" accept="image/*" className="hidden" />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">{label}</p>
                </div>
                ))}
            </div>


        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Spesifikasi Kamar
        </h1>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Kamar</label>
          <input
            type="text"
            placeholder="Masukkan ukuran kamar (meter)"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kamar A</label>
          <input
            type="number"
            placeholder="Masukkan jumlah keseluruhan kamar tipe A"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kamar A (Terisi)</label>
          <input
            type="number"
            placeholder="Masukkan jumlah keseluruhan kamar tipe A yang terisi "
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Fasilitas Kamar
        </h1>

        <div className="grid grid-cols-1 gap-4">
            {fasilitas.map((item, index) => (
            <div key={index} className="topping flex items-center gap-2">
                <input
                type="checkbox"
                id={item.toLowerCase()}
                name={item.toLowerCase()}
                value={item}
                />
                <label htmlFor={item.toLowerCase()}>{item}</label>
            </div>
            ))}
        </div>

        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Fasilitas Kamar Mandi
        </h1>

        <div className="grid grid-cols-1 gap-4">
            {fasilitasbathroom.map((item, index) => (
            <div key={index} className="topping flex items-center gap-2">
                <input
                type="checkbox"
                id={item.toLowerCase()}
                name={item.toLowerCase()}
                value={item}
                />
                <label htmlFor={item.toLowerCase()}>{item}</label>
            </div>
            ))}
        </div>

        <h1 className="text-xl font-semibold mb-4 text-[#50A75F] flex items-center gap-2">
          Tempat Terdekat
        </h1>

        <div className="space-y-4">
            {tempatTerdekat.map((tempat, index) => (
                <div key={index} className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder={`Tempat ${index + 1}`}
                    value={tempat}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="border px-3 py-2 rounded w-80"
                />
                {tempatterdekat.length > 1 && (
                    <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-500"
                    >
                    Hapus
                    </button>
                )}
                </div>
            ))}

            {tempatTerdekat.length < 6 && (
                <button
                type="button"
                onClick={handleAdd}
                className="mt-2 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]"
                >
                Tambah Tempat +
                </button>
            )}
        </div>

        <button
          //onClick={onClickAjukanSewa}
          type="submit"
          className="w-1/2 mx-auto mt-10 py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
          >
          Luncurkan Iklan
        </button> 
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function FormKamarA({ setActivePage }) {
  const fasilitas = ['Listrik', 'Air', 'Wifi', 'Tempat Tidur', 'Lemari', 'Meja dan Kursi'];
  const fasilitasBathroom = ['Kamar Mandi Dalam', 'Ember dan Gayung', 'Toilet Duduk', 'Toilet Jongkok'];

  const [tempatTerdekat, setTempatTerdekat] = useState(['']);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    facilities: [],
    price: '',
    totalRooms: '',
    availableRooms: '',
    roomType: 'A',
    rules: [],
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      facilities: checked
        ? [...prev.facilities, value]
        : prev.facilities.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Anda belum login!');

    const kostData = {
      name: formData.name,
      address: formData.address,
      description: formData.description,
      facilities: formData.facilities,
      price: parseInt(formData.price),
      roomType: formData.roomType,
      totalRooms: parseInt(formData.totalRooms),
      availableRooms: parseInt(formData.availableRooms),
      status: 'available',
      rules: tempatTerdekat.filter((t) => t.trim() !== ''),
      images: [],
    };

    let kostId = null;
    const uploadedImageUrls = [];

    try {
      const response = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/admin/kosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(kostData),
      });

      if (!response.ok) return alert('Gagal menambahkan kamar');
      const createdKost = await response.json();
      kostId = createdKost._id || createdKost.id || createdKost.kost?._id;

      for (let i = 0; i < imageFiles.length; i++) {
        const form = new FormData();
        form.append('title', `Foto Kamar A ${i + 1}`);
        form.append('description', `Foto Kamar A ${i + 1}`);
        form.append('kostId', kostId);
        form.append('type', 'kost');
        form.append('image', imageFiles[i]);

        const uploadRes = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/admin/gallery', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });

        if (!uploadRes.ok) return alert(`Gagal mengunggah gambar ke-${i + 1}`);

        const uploadResult = await uploadRes.json();
        uploadedImageUrls.push(uploadResult.gallery.imageUrl);
      }

      const updateResponse = await fetch(`https://dkos-mranggen-clabs-production.up.railway.app/api/admin/kosts/${kostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...kostData, images: uploadedImageUrls }),
      });

      if (!updateResponse.ok) return alert('Gagal menyimpan gambar ke data kost');
      alert('Kamar berhasil ditambahkan!');
      setActivePage('KelolaKamardanIklan');
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleBack = () => setActivePage('KelolaKamardanIklan');

  return (
    <div className="max-w-screen-xl mx-auto mt-2 p-6 bg-white shadow rounded">
      <div className="flex items-center gap-2 mb-4 text-[#989898]">
        <button onClick={handleBack} className="text-xl">
          <FaArrowLeft />
        </button>
        kembali
      </div>
      <h1 className="text-xl font-semibold mb-4 text-black">Kelola Kamar Tipe A</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {["name", "address", "description", "price", "totalRooms", "availableRooms"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field === 'name' ? 'Nama Kamar' :
               field === 'address' ? 'Alamat' :
               field === 'description' ? 'Deskripsi' :
               field === 'price' ? 'Harga' :
               field === 'totalRooms' ? 'Jumlah Kamar' :
               'Jumlah Kamar (Tersedia)'}
            </label>
            {field === 'description' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <input
                type={field.includes('Rooms') || field === 'price' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto Kamar</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {imageFiles.map((file, i) => (
                <div key={i} className="border rounded p-2">
                  <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} className="w-full h-40 object-cover rounded" />
                  <p className="text-sm mt-1 text-center">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {[{ title: 'Fasilitas Kamar', items: fasilitas }, { title: 'Fasilitas Kamar Mandi', items: fasilitasBathroom }].map((group, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-[#50A75F]">{group.title}</h2>
            <div className="grid grid-cols-1 gap-2">
              {group.items.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" value={item} onChange={handleCheckboxChange} /> {item}
                </label>
              ))}
            </div>
          </div>
        ))}

        <h2 className="text-lg font-semibold text-[#50A75F]">Tempat Terdekat</h2>
        <div className="space-y-3">
          {tempatTerdekat.map((tempat, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Tempat ${index + 1}`}
                value={tempat}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border px-3 py-2 rounded w-80"
              />
              {tempatTerdekat.length > 1 && (
                <button type="button" onClick={() => handleRemove(index)} className="text-red-500">Hapus</button>
              )}
            </div>
          ))}
          {tempatTerdekat.length < 6 && (
            <button type="button" onClick={handleAdd} className="mt-2 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]">
              Tambah Tempat +
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-1/2 mx-auto mt-10 py-2 rounded font-semibold flex justify-center items-center gap-2 transition-colors bg-[#50A75F] text-white hover:bg-[#3c8a4b]"
        >
          Luncurkan Iklan
        </button>
      </form>
    </div>
  );
}

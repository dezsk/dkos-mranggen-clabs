import React, { useEffect, useState } from 'react';

const KelolaKamardanIklan = ({ setActivePage }) => {
  const [kamarAImage, setKamarAImage] = useState('');
  const [kamarBImage, setKamarBImage] = useState('');
  const [kamarAInfo, setKamarAInfo] = useState({ price: 0, availableRooms: 0 });
  const [kamarBInfo, setKamarBInfo] = useState({ price: 0, availableRooms: 0 });

  const onClickKamarA = () => setActivePage('KamarA');
  const onClickKamarB = () => setActivePage('KamarB');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGallery = async () => {
      try {
        const res = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/admin/gallery', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const kamarA = data.find((img) => img.title.includes('Kamar A'));
        const kamarB = data.find((img) => img.title.includes('Kamar B'));
        setKamarAImage(kamarA?.mediaUrl || '');
        setKamarBImage(kamarB?.mediaUrl || '');
      } catch (error) {
        console.error(error);
      }
    };

    const fetchKosts = async () => {
      try {
        const res = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/admin/kosts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log('DATA', data);

        if (data) {
            const kamarA = data.find((kost) => kost.roomType === 'A');
            const kamarB = data.find((kost) => kost.roomType === 'B');

            if (kamarA) {
                setKamarAInfo({
                    price: kamarA.price, 
                    availableRooms: kamarA.availableRooms
                });
                
            } if (kamarB) {
                setKamarBInfo({
                    price: kamarB.price, 
                    availableRooms: kamarB.availableRooms
                });
            }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGallery();
    fetchKosts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
        Kelola Kamar dan Buat Iklan
      </h1>
      <div className="flex gap-6">
        <div className="Kamar A">
          <label className="cursor-pointer flex flex-col items-start">
            <div className="flex flex-col items-center self-start">
              <button onClick={onClickKamarA} className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                <h1 className="text-xl font-bold text-white">A</h1>
              </button>
              <p className="text-xl text-gray-500 mt-2 text-center w-full">Kelola Kamar A</p>
            </div>
          </label>
        </div>
        <div className="Kamar B">
          <label className="cursor-pointer flex flex-col items-start">
            <div className="flex flex-col items-center self-start">
              <button onClick={onClickKamarB} className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                <h1 className="text-xl font-bold text-white">B</h1>
              </button>
              <p className="text-xl text-gray-500 mt-2 text-center w-full">Kelola Kamar B</p>
            </div>
          </label>
        </div>
      </div>

      <h1 className="text-xl font-semibold mt-10 text-black flex items-center gap-2">Iklan Aktif</h1>
      <div className="flex gap-6">
        <div className="Iklan Kamar A flex flex-col items-center">
          <button
            className="border-2 rounded-md w-80 h-80 bg-cover bg-center"
            style={{
              backgroundImage: kamarAImage ? `url(${kamarAImage})` : 'linear-gradient(#50A75F, #50A75F)',
            }}
          >
            {!kamarAImage && <h1 className="text-xl font-bold text-white">A</h1>}
          </button>
          <p className="text-xl text-gray-500 mt-2 text-center w-full">Iklan Kamar A</p>
          <p className="text-gray-600">Jumlah Kamar: {kamarAInfo.availableRooms}</p>
          <p className="text-gray-600">Harga: Rp {kamarAInfo.price.toLocaleString()}</p>
        </div>

        <div className="Iklan Kamar B flex flex-col items-center">
          <button
            className="border-2 rounded-md w-80 h-80 bg-cover bg-center"
            style={{
              backgroundImage: kamarBImage ? `url(${kamarBImage})` : 'linear-gradient(#50A75F, #50A75F)',
            }}
          >
            {!kamarBImage && <h1 className="text-xl font-bold text-white">B</h1>}
          </button>
          <p className="text-xl text-gray-500 mt-2 text-center w-full">Iklan Kamar B</p>
          <p className="text-gray-600">Jumlah Kamar: {kamarBInfo.availableRooms}</p>
          <p className="text-gray-600">Harga: Rp {kamarBInfo.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default KelolaKamardanIklan;

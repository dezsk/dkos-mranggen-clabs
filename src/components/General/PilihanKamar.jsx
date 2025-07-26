import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PilihanKamar = forwardRef((props, ref) => {
  const [kamarAImage, setKamarAImage] = useState('');
  const [kamarBImage, setKamarBImage] = useState('');
  const [kamarAInfo, setKamarAInfo] = useState({ price: 0, availableRooms: 0 });
  const [kamarBInfo, setKamarBInfo] = useState({ price: 0, availableRooms: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchKosts = async () => {
      try {
        const res = await fetch(
          'https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const response = await res.json();
        const kosts = response.data || [];

        console.log('DATA KOST', kosts);

        const kamarA = kosts.find((kost) => kost.roomType === 'A');
        const kamarB = kosts.find((kost) => kost.roomType === 'B');

        if (kamarA) {
          setKamarAImage(kamarA.images[0] || '');
          setKamarAInfo({
            price: kamarA.price,
            availableRooms: kamarA.availableRooms,
          });
        }

        if (kamarB) {
          setKamarBImage(kamarB.images[0] || '');
          setKamarBInfo({
            price: kamarB.price,
            availableRooms: kamarB.availableRooms,
          });
        }
      } catch (error) {
        console.error('Gagal ambil data kost:', error);
      }
    };

    fetchKosts();
  }, []);

  const navigate = useNavigate();
  const handleSewaA = () => navigate('/DetailRoomA');
  const handleSewaB = () => navigate('/DetailRoomB');

  return (
    <section ref={ref} className="bg-white py-10 px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Pilihan Kamar D'Kost Mranggen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Kamar A */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
          <div className="p-4">
            <div
              className="border-2 rounded-md w-80 h-80 bg-cover bg-center"
              style={{
                backgroundImage: kamarAImage
                  ? `url(${kamarAImage})`
                  : 'linear-gradient(#50A75F, #50A75F)',
              }}
            />
            <p className="text-gray-600">Jumlah Kamar: {kamarAInfo.availableRooms}</p>
            <p className="text-gray-600">Harga: Rp {kamarAInfo.price.toLocaleString()}</p>
            <button
              onClick={handleSewaA}
              className="mt-4 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]"
            >
              Ajukan Sewa Sekarang
            </button>
          </div>
        </div>
        {/* Kamar B */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
          <div className="p-4">
            <div
              className="border-2 rounded-md w-80 h-80 bg-cover bg-center"
              style={{
                backgroundImage: kamarBImage
                  ? `url(${kamarBImage})`
                  : 'linear-gradient(#50A75F, #50A75F)',
              }}
            />
            <p className="text-gray-600">Jumlah Kamar: {kamarBInfo.availableRooms}</p>
            <p className="text-gray-600">Harga: Rp {kamarBInfo.price.toLocaleString()}</p>
            <button
              onClick={handleSewaB}
              className="mt-4 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]"
            >
              Ajukan Sewa Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PilihanKamar;

import React, { forwardRef, useEffect, useState } from 'react';
import kamarA from '../../assets/LandingPage/kamarA.svg';
import kamarB from '../../assets/LandingPage/kamarB.svg';
import { useNavigate } from 'react-router-dom';

const PilihanKamar = forwardRef ((props, ref) => {
  //const kamar = [
    //{ name: 'Kamar Tipe A', desc: 'Luas, ventilasi baik...', price: 'Rp 1.000.000/bulan', img: kamarA },
    //{ name: 'Kamar Tipe B', desc: 'Nyaman & hemat...', price: 'Rp 900.000/bulan', img: kamarB }
  //];

  const [kamarAInfo, setKamarAInfo] = useState({ price: 0, availableRooms: 0 });
  const [kamarBInfo, setKamarBInfo] = useState({ price: 0, availableRooms: 0 });

  useEffect(() => {

    const token = localStorage.getItem('token');

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

    fetchKosts();

  }, []);

  const navigate = useNavigate();
  const handleSewaA = () => {
    navigate('/DetailRoomA');
  };
  const handleSewaB = () => {
    navigate('/DetailRoomB');
  };

  return (
    <section ref={ref} className="bg-white py-10 px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Pilihan Kamar D'Kost Mranggen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
          <img src={kamarA} alt="Kamar Tipe A" className="w-full h-48 object-cover" />
          <div className="p-4">
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
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
          <img src={kamarB} alt="Kamar Tipe B" className="w-full h-48 object-cover" />
          <div className="p-4">
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

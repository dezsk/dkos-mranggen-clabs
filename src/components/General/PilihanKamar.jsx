import React, { forwardRef } from 'react';
import kamarA from '../../assets/LandingPage/kamarA.svg';
import kamarB from '../../assets/LandingPage/kamarB.svg';
import { useNavigate } from 'react-router-dom';

const PilihanKamar = forwardRef ((props, ref) => {
  const kamar = [
    { name: 'Kamar Tipe A', desc: 'Luas, ventilasi baik...', price: 'Rp 1.000.000/bulan', img: kamarA },
    { name: 'Kamar Tipe B', desc: 'Nyaman & hemat...', price: 'Rp 900.000/bulan', img: kamarB }
  ];

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
            <h3 className="text-lg font-semibold">{kamar[0].name}</h3>
            <p className="text-sm text-gray-600">{kamar[0].desc}</p>
            <p className="font-bold mt-2">{kamar[0].price}</p>
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
            <h3 className="text-lg font-semibold">{kamar[1].name}</h3>
            <p className="text-sm text-gray-600">{kamar[1].desc}</p>
            <p className="font-bold mt-2">{kamar[1].price}</p>
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

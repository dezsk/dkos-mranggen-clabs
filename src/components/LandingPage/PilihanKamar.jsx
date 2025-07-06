import React, { useState } from 'react';
import kamarA from '../../assets/LandingPage/kamarA.svg';
import kamarB from '../../assets/LandingPage/kamarB.svg';
import AlertLogin from '../Alert/AlertLogin';

const PilihanKamar = ({user}) => {
  const [showAlert, setShowAlert] = useState(false);


const kamar = [
  { name: 'Kamar Tipe A', desc: 'Luas, ventilasi baik...', price: 'Rp 1.000.000/bulan', img: kamarA },
  { name: 'Kamar Tipe B', desc: 'Nyaman & hemat...', price: 'Rp 900.000/bulan', img: kamarB }
];

  const handleSewaClick = () => {
    if (user.role == 'guest') {
      setShowAlert(true);
    }
  };

  return (
    <section className="bg-white py-10 px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Pilihan Kamar D'Kost Mranggen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {kamar.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow">
            <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <p className="font-bold mt-2">{item.price}</p>
              <button
                onClick={handleSewaClick}
                className="mt-4 bg-[#50A75F] text-white px-4 py-2 rounded hover:bg-[#3c8a4b]"
              >
                Ajukan Sewa Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAlert && <AlertLogin onClose={() => setShowAlert(false)} />}
    </section>
  );
};

export default PilihanKamar;

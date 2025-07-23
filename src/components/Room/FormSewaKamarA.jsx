import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormSewa = () => {
  const navigate = useNavigate();
  const [kamarAInfo, setKamarAInfo] = useState({ price: 0, availableRooms: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchKosts = async () => {
      try {
        const res = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const kamarA = data.find((kost) => kost.roomType === 'A');

        if (kamarA) {
          setKamarAInfo({
            price: kamarA.price,
            availableRooms: kamarA.availableRooms,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // selesai fetch
      }
    };

    fetchKosts();
  }, []);

  const handleAjukanSewa = () => {
    navigate('/PageFormSewaKamar');
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ajukan Sewa</h3>
        <div className="bg-white shadow rounded p-4 max-w-md">
          {loading ? (
            <p className="text-center text-gray-500">Memuat data kamar...</p>
          ) : (
            <>
              <p>Kamar tersedia: <strong>{kamarAInfo.availableRooms}</strong></p>
              <p>Harga sewa per bulan: <strong>{formatRupiah(kamarAInfo.price)}</strong></p>

              <a
                href="https://wa.me/+6282227153016"
                target="_blank"
                rel="noopener noreferrer"
                className='block w-full text-[#50A75F] text-center py-2 rounded border-2 border-[#50A75F] font-semibold mt-3'>
                Hubungi Pemilik
              </a>

              <button
                onClick={handleAjukanSewa}
                type="button"
                disabled={kamarAInfo.availableRooms === 0}
                className={`w-full py-2 rounded font-semibold mt-3 transition 
                  ${kamarAInfo.availableRooms === 0 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-[#50A75F] text-white hover:bg-[#3c8a4b]'}`}
              >
                {kamarAInfo.availableRooms === 0 ? 'Kamar Penuh' : 'Ajukan Sewa'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSewa;

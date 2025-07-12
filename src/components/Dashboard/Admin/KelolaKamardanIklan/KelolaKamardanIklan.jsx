import React from 'react';

const KelolaKamardanIklan = ({setActivePage}) => {

    const onClickKamarA = () => {
        setActivePage ('KamarA');
    };

    const onClickKamarB = () => {
        setActivePage ('KamarB');
    };

  return (
    <div>
        <h1 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
            Kelola Kamar dan Buat Iklan
        </h1>
        <div className="flex gap-6">
            <div className="Kamar A">
                <label className="cursor-pointer flex flex-col items-start">
                <div className="flex flex-col items-center self-start">
                    <button 
                    onClick={onClickKamarA} 
                    className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                    <h1 className="text-xl font-bold text-white">A</h1>
                    </button>
                    <p className="text-xl text-gray-500 mt-2 text-center w-full">Kelola Kamar A</p>
                </div>
                </label>
            </div>
            <div className="Kamar B">
                <label className="cursor-pointer flex flex-col items-start">
                <div className="flex flex-col items-center self-start">
                    <button 
                    onClick={onClickKamarB} 
                    className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                    <h1 className="text-xl font-bold text-white">B</h1>
                    </button>
                    <p className="text-xl text-gray-500 mt-2 text-center w-full">Kelola Kamar B</p>
                </div>
                </label>
            </div>
        </div>

        <h1 className="text-xl font-semibold mt-10 text-black flex items-center gap-2">
            Iklan Aktif 
        </h1>
        <div className="flex gap-6">
            <div className="Iklan Kamar A">
                <label className="cursor-pointer flex flex-col items-start">
                <div className="flex flex-col items-center self-start">
                    <button className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                    <h1 className="text-xl font-bold text-white">A</h1>
                    </button>
                    <p className="text-xl text-gray-500 mt-2 text-center w-full">Iklan Kamar A</p>
                </div>
                </label>
            </div>
            <div className="Iklan Kamar B">
                <label className="cursor-pointer flex flex-col items-start">
                <div className="flex flex-col items-center self-start">
                    <button className="border-2 rounded-md p-20 bg-[#50A75F] w-full">
                    <h1 className="text-xl font-bold text-white">B</h1>
                    </button>
                    <p className="text-xl text-gray-500 mt-2 text-center w-full">Iklan Kamar B</p>
                </div>
                </label>
            </div>
        </div>
    </div>
  );
};

export default KelolaKamardanIklan;

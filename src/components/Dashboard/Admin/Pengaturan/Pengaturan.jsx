import { FaLock } from 'react-icons/fa'

const Pengaturan =({setActivePage}) => {

  const UbahPassword = () => {
    setActivePage('GantiPassword')
  };

  return (
    <div className='p-4 max-w-xl'>
      <div className='border rounded-lg p-4 mt-4'>
        <button onClick={UbahPassword}>
          <div className='flex items-center gap-2 text-red-600 mb-4'>
            <FaLock className='text-2xl'/>
            <h2 className='font-semibold text-lg'>Ubah Password</h2>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Pengaturan;
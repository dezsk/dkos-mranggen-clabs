import React, { useState } from 'react';
import Header from '../components/Home/HeaderHome';
import SideMenu from '../components/Dashboard/User/SideMenu';
import KamarSaya from '../components/Dashboard/User/KamarSaya';
import RiwayatTransaksi from '../components/Dashboard/User/RiwayatTransaksi/RiwayatTransaksi';
import KelolaTagihan from '../components/Dashboard/User/KelolaTagihan/KelolaTagihan';
import Pengaturan from '../components/Dashboard/User/Pengaturan/Pengaturan';
import FormBayarKos from '../components/Dashboard/User/KelolaTagihan/FormBayarKos';
import GantiPassword from '../components/Dashboard/User/Pengaturan/GantiPassword';


const PageDashboardUser = () => {
  const [activePage,setActivePage] = useState('KosSaya');

  const renderContent = () => {
    switch(activePage) {
      case 'KosSaya':
        return <KamarSaya/>;
      case 'RiwayatTransaksi':
        return <RiwayatTransaksi/>
      case 'KelolaTagihan':
        return <KelolaTagihan setActivePage={setActivePage} />;
      case 'Pengaturan':
        return <Pengaturan setActivePage={setActivePage}/>
      case 'FormBayarKos':
        return <FormBayarKos setActivePage={setActivePage} />;
      case 'GantiPassword':
        return <GantiPassword setActivePage={setActivePage} />;
      default:
        return <KamarSaya />; // fallback untuk safety

    }
  };


  return (
    <div>
      <Header/>
        <div className="flex h-screen">
          <div className='bg-white shadow '>
            <SideMenu setActivePage={setActivePage} activePage={activePage}/>
          </div>
          <div className='flex-1 p-6 overflow-y-auto'>
              <div className='w-full'>{renderContent()}</div>
          </div>
        </div>
    </div>
      
  );
};

export default PageDashboardUser;

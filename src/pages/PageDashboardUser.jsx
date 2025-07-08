import React, { useState } from 'react';
import Header from '../components/General/HeaderGeneral';
import SideMenu from '../components/Dashboard/User/SideMenu';
import KosSaya from '../components/Dashboard/User/KosSaya';
import KelolaKamardanIklan from '../components/Dashboard/User/KelolaKamardanIklan/KelolaKamardanIklan';
import KelolaPenghuni from '../components/Dashboard/User/KelolaPenghuni/KelolaPenghuni';
import Pengaturan from '../components/Dashboard/User/Pengaturan/Pengaturan';


const PageDashboardUser = () => {
  const [activePage,setActivePage] = useState('KosSaya');

  const renderContent = () => {
    switch(activePage) {
      case 'KosSaya':
        return <KosSaya/>;
      case 'KelolaKamardanIklan':
        return <KelolaKamardanIklan/>
      case 'KelolaPenghuni':
        return <KelolaPenghuni/>
      case 'Pengaturan':
        return <Pengaturan/>
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

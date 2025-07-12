import React, { useState } from 'react';
import HeaderAdmin from '../components/Dashboard/Admin/HeaderAdmin';
import Dashboard from '../components/Dashboard/Admin/DashboardAdmin';
import SideMenu from '../components/Dashboard/Admin/SideMenu';
import KosSaya from '../components/Dashboard/Admin/KosSaya';
import KelolaKamardanIklan from '../components/Dashboard/Admin/KelolaKamardanIklan/KelolaKamardanIklan';
import KelolaPenghuni from '../components/Dashboard/Admin/KelolaPenghuni/KelolaPenghuni';
import Pengaturan from '../components/Dashboard/Admin/Pengaturan/Pengaturan';
import KamarA from '../components/Dashboard/Admin/KelolaKamardanIklan/KamarA';
import KamarB from '../components/Dashboard/Admin/KelolaKamardanIklan/KamarB';
import DetailPenghuni from '../components/Dashboard/Admin/KelolaPenghuni/DetailPenghuni';
import GantiPassword from '../components/Dashboard/Admin/Pengaturan/GantiPassword';


const PageDashboardAdmin = () => {
  const [activePage,setActivePage] = useState('KosSaya');

  const renderContent = () => {
    switch(activePage) {
      case 'KosSaya':
        return <KosSaya setActivePage={setActivePage}/>;
      case 'KelolaKamardanIklan':
        return <KelolaKamardanIklan setActivePage={setActivePage}/>
      case 'KelolaPenghuni':
        return <KelolaPenghuni setActivePage={setActivePage}/>
      case 'Pengaturan':
        return <Pengaturan setActivePage={setActivePage}/>
      case 'KamarA':
        return <KamarA setActivePage={setActivePage}/>
      case 'KamarB':
        return <KamarB setActivePage={setActivePage}/>
      case 'DetailPenghuni':
        return <DetailPenghuni setActivePage={setActivePage}/>
      case 'GantiPassword':
        return <GantiPassword setActivePage={setActivePage}/>
    }
  };


  return (
    <div>
      <HeaderAdmin/>
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

export default PageDashboardAdmin;

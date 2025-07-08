import React from 'react';
import Header from '../components/Home/HeaderHome';
import Gallery from '../components/Room/GalleryKamarA';
import DeskripsiKamarB from '../components/Room/DeskripsiKamarB'; 
import FasilitasKamarA from '../components/Room/FasilitasKamarA';
import TempatTerdekat from '../components/Room/TempatTerdekat'; 
import FormSewa from '../components/Room/FormSewaKamar';

const DetailRoomB = () => {
  return (
    <div className="HomePage">
      <Header/>
      <Gallery/>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <DeskripsiKamarB/>
        </div>
        <div className="flex-1">
          <FormSewa/>
        </div>
      </div>
      <FasilitasKamarA/>
      <TempatTerdekat/>
    </div>
  );
};

export default DetailRoomB;

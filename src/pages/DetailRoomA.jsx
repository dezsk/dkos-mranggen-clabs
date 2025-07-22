import React from 'react';
import Header from '../components/Home/HeaderHome';
import Gallery from '../components/Room/GalleryKamarA';
import DeskripsiKamarA from '../components/Room/DeskripsiKamarA'; 
import FasilitasKamarA from '../components/Room/FasilitasKamarA';
import TempatTerdekat from '../components/Room/TempatTerdekat'; 
import FormSewa from '../components/Room/FormSewaKamar';

const DetailRoomA = () => {
  return (
    <div className="HomePage">
      <Header/>
      <Gallery/>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <DeskripsiKamarA/>
        </div>
        <div className="flex-1">
          <FormSewa/>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <FasilitasKamarA/>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <TempatTerdekat/>
      </div>
    </div>
  );
};

export default DetailRoomA;

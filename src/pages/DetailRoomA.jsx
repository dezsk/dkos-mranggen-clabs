import React from 'react';
import Header from '../components/Home/HeaderHome';
import Gallery from '../components/Room/GalleryKamarA';
import DeskripsiKamarA from '../components/Room/DeskripsiKamarA'; 
import FasilitasKamarA from '../components/Room/FasilitasKamarA';
import TempatTerdekat from '../components/Room/TempatTerdekat'; 
import FormSewa from '../components/Room/PengajuanSewa';

const DetailRoomA = () => {

  return (
    <div className="HomePage">
      <Header/>
      <Gallery/>
      <DeskripsiKamarA/>
      <FasilitasKamarA/>
      <TempatTerdekat/>
      <FormSewa/>
    </div>
  );
};

export default DetailRoomA;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Kamar from './components/General/PilihanKamar.jsx';
import DetailRoomA from './pages/DetailRoomA.jsx';
import DetailRoomB from './pages/DetailRoomB.jsx';
import DashboardAdmin from './pages/DashboardAdmin.jsx';
import Form from './pages/PageFormSewaKamar.jsx';
import PagePembayaran from './pages/PagePembayaran.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/PilihanKamar" element={<Kamar />} />
        <Route path="/DetailRoomA" element={<DetailRoomA />} />
        <Route path="/DetailRoomB" element={<DetailRoomB />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/PageFormSewaKamar" element={<Form />} />
        <Route path="/PagePembayaran" element={<PagePembayaran />} />
        {/* Tambahkan rute lain sesuai kebutuhan */}

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

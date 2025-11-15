import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/pages/LoginPage';
import Home from '@/pages/Home';
import Hotels from '@/pages/Hotels';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hotels" element={<Hotels />} />
          {/* Add more routes here - they will automatically get the Header */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

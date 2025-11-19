import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/pages/LoginPage';
import Home from '@/pages/Home';
import SearchPage from '@/pages/SearchPage';
import HotelPage from '@/pages/HotelPage';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/hotel/:hotelId" element={<HotelPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
            {/* Add more routes here - they will automatically get the Header */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

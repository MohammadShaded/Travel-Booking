import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Hotel from '@/pages/Hotel';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';
import Admin from '@/pages/Admin';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute requireUser>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute requireUser>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotel/:hotelId"
              element={
                <ProtectedRoute requireUser>
                  <Hotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute requireUser>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation/:bookingId"
              element={
                <ProtectedRoute requireUser>
                  <Confirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* Add more routes here - they will automatically get the Header */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

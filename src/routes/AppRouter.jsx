import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Eager load Home for instant First Contentful Paint
import Home from '../pages/Home';

// Lazy load secondary routes for optimal code-splitting and performance
const Tours = lazy(() => import('../pages/Tours'));
const Transfers = lazy(() => import('../pages/Transfers'));
const Booking = lazy(() => import('../pages/Booking'));
const BookingSuccess = lazy(() => import('../pages/BookingSuccess'));
const BookingCancel = lazy(() => import('../pages/BookingCancel'));
const Contact = lazy(() => import('../pages/Contact'));
const Faq = lazy(() => import('../pages/Faq'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Admin = lazy(() => import('../pages/Admin'));

function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: '#64748b',
        fontSize: '0.95rem',
      }}
      aria-label="Carregando..."
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#f59e0b',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="tours" element={<Tours />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="booking" element={<Booking />} />
            <Route path="booking/success" element={<BookingSuccess />} />
            <Route path="booking/cancel" element={<BookingCancel />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
          </Route>

          {/* Protected / Admin Routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
          </Route>

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AdminGuard from '../components/guards/AdminGuard';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Direct load for Home
import Home from '../pages/Home';

// Lazy loaded pages for performance
const Tours = lazy(() => import('../pages/Tours'));
const TourDetail = lazy(() => import('../pages/TourDetail'));
const Transfers = lazy(() => import('../pages/Transfers'));
const CustomTour = lazy(() => import('../pages/CustomTour'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Booking = lazy(() => import('../pages/Booking'));
const BookingSuccess = lazy(() => import('../pages/BookingSuccess'));
const BookingCancel = lazy(() => import('../pages/BookingCancel'));
const Faq = lazy(() => import('../pages/Faq'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Admin = lazy(() => import('../pages/Admin'));
const AdminLogin = lazy(() => import('../pages/AdminLogin'));

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
      aria-label="Loading..."
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#4338ca',
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
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Website Pages with MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="tours" element={<Tours />} />
              <Route path="tours/:id" element={<TourDetail />} />
              <Route path="transfers" element={<Transfers />} />
              <Route path="custom-tour" element={<CustomTour />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="booking" element={<Booking />} />
              <Route path="booking/success" element={<BookingSuccess />} />
              <Route path="booking/cancel" element={<BookingCancel />} />
              <Route path="faq" element={<Faq />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<AdminGuard />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
              </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

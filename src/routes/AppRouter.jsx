import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import Transfers from '../pages/Transfers';
import Booking from '../pages/Booking';
import BookingSuccess from '../pages/BookingSuccess';
import BookingCancel from '../pages/BookingCancel';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import NotFound from '../pages/NotFound';
import Admin from '../pages/Admin';

export default function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}


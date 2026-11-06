import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BOOKING_STATUS, PAYMENT_METHOD, SERVICE_TYPE, generateBookingRef, resolvePrice } from '../constants/booking';

const STORAGE_KEY = 'mrt_booking_draft';

const INITIAL_STATE = {
  step: 1,
  service_type: SERVICE_TYPE.TOUR,
  service_id: '',
  service_title: '',
  price4: 0,
  price6: 0,
  date: '',
  time_slot: '08:00',
  passengers: 2,
  pickup_location: '',
  special_notes: '',
  customer: { name: '', email: '', phone: '', country: '' },
  payment_method: PAYMENT_METHOD.WHATSAPP_MANUAL,
  total_amount_eur: 0,
  ref: '',
  status: BOOKING_STATUS.DRAFT,
};

const BookingContext = createContext(null);

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => loadDraft() ?? INITIAL_STATE);

  useEffect(() => {
    saveDraft(booking);
  }, [booking]);

  const setStep = useCallback((step) => {
    setBooking((prev) => ({ ...prev, step }));
  }, []);

  const selectService = useCallback(({ service_type, service_id, service_title, price4, price6 }) => {
    setBooking((prev) => ({
      ...prev,
      service_type,
      service_id,
      service_title,
      price4: price4 ?? 0,
      price6: price6 ?? 0,
      total_amount_eur: resolvePrice(price4 ?? 0, price6 ?? 0, prev.passengers),
      step: 2,
    }));
  }, []);

  const setTripDetails = useCallback(({ date, time_slot, passengers, pickup_location, special_notes }) => {
    setBooking((prev) => {
      const total = resolvePrice(prev.price4, prev.price6, passengers ?? prev.passengers);
      return {
        ...prev,
        date: date ?? prev.date,
        time_slot: time_slot ?? prev.time_slot,
        passengers: passengers ?? prev.passengers,
        pickup_location: pickup_location ?? prev.pickup_location,
        special_notes: special_notes ?? prev.special_notes,
        total_amount_eur: total,
        step: 3,
      };
    });
  }, []);

  const setCustomer = useCallback((customer) => {
    setBooking((prev) => ({
      ...prev,
      customer: { ...prev.customer, ...customer },
      ref: prev.ref || generateBookingRef(),
      step: 4,
    }));
  }, []);

  const setPaymentMethod = useCallback((method) => {
    setBooking((prev) => ({ ...prev, payment_method: method }));
  }, []);

  const markPendingPayment = useCallback(() => {
    setBooking((prev) => ({ ...prev, status: BOOKING_STATUS.PENDING_PAYMENT }));
  }, []);

  const resetBooking = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBooking(INITIAL_STATE);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setStep,
        selectService,
        setTripDetails,
        setCustomer,
        setPaymentMethod,
        markPendingPayment,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}


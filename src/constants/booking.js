/**
 * Booking domain constants — single source of truth for statuses,
 * payment methods, service types and pricing helpers.
 */

export const BOOKING_STATUS = {
  DRAFT: 'draft',
  PENDING_PAYMENT: 'pending_payment',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  PAYMENT_FAILED: 'payment_failed',
};

export const PAYMENT_METHOD = {
  WHATSAPP_MANUAL: 'whatsapp_manual',
  STRIPE_CARD: 'stripe_card',
};

export const SERVICE_TYPE = {
  TOUR: 'tour',
  TRANSFER: 'transfer',
  CUSTOM: 'custom',
};

export const STATUS_BADGE = {
  [BOOKING_STATUS.DRAFT]: { label: 'Draft', color: '#94a3b8' },
  [BOOKING_STATUS.PENDING_PAYMENT]: { label: 'Pending Payment', color: '#f59e0b' },
  [BOOKING_STATUS.CONFIRMED]: { label: 'Confirmed', color: '#22c55e' },
  [BOOKING_STATUS.CANCELLED]: { label: 'Cancelled', color: '#ef4444' },
  [BOOKING_STATUS.PAYMENT_FAILED]: { label: 'Payment Failed', color: '#ef4444' },
};

export function resolvePrice(price4, price6, passengers) {
  return passengers <= 4 ? price4 : price6;
}

export function generateBookingRef() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `MRT-${today}-${rand}`;
}


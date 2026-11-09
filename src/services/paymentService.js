import { getStripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import { sendBookingConfirmationEmail } from './emailService';

/**
 * Service for checkout and payment processing.
 * Connects directly to Supabase Edge Function 'create-checkout' or handles resilient fallback.
 */
export const paymentService = {
  /**
   * Starts checkout flow: calls Supabase Edge Function to get Stripe Session or inserts directly.
   * @param {{ booking: Object, customer: Object }} param0
   */
  async startCheckout({ booking, customer }) {
    try {
      // 1. Try to invoke Supabase Edge Function 'create-checkout' (if deployed with Stripe Secret)
      if (supabase) {
        const { data, error } = await supabase.functions.invoke('create-checkout', {
          body: {
            booking_ref: booking.ref,
            service_type: booking.service_type,
            service_id: booking.service_id,
            service_title: booking.service_title,
            booking_date: booking.date,
            booking_time: booking.time_slot,
            passengers: booking.passengers,
            pickup_location: booking.pickup_location,
            special_notes: booking.flight_number ? `Voo: ${booking.flight_number}` : '',
            total_amount_eur: booking.total_amount_eur,
            customer,
            success_url: `${window.location.origin}/booking/success?ref=${booking.ref}`,
            cancel_url: `${window.location.origin}/booking/cancel?ref=${booking.ref}`,
          },
        });

        // If edge function returned Stripe checkout URL or session
        if (!error && data?.url) {
          window.location.href = data.url;
          return;
        }

        if (!error && data?.sessionId) {
          const stripe = await getStripe();
          if (stripe) {
            return stripe.redirectToCheckout({ sessionId: data.sessionId });
          }
        }
      }
    } catch (edgeFnErr) {
      console.warn('[paymentService] Edge function not yet deployed or error, falling back to direct booking record:', edgeFnErr);
    }

    // 2. Direct Resilient Record (Allows testing full booking flow even before Stripe keys are set up)
    try {
      if (supabase) {
        // Save customer
        let customerId = null;
        const { data: customerRow } = await supabase
          .from('customers')
          .insert({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
          })
          .select('id')
          .single();

        if (customerRow) {
          customerId = customerRow.id;
        }

        // Save booking in Supabase
        await supabase.from('bookings').insert({
          booking_ref: booking.ref,
          customer_id: customerId,
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          service_type: booking.service_type || 'transfer',
          service_id: booking.service_id || 'transfer-general',
          service_name: booking.service_title || 'Transfer Madeira',
          booking_date: booking.date,
          booking_time: booking.time_slot,
          passengers: booking.passengers || 1,
          pickup_location: booking.pickup_location,
          flight_number: booking.flight_number || null,
          total_amount: booking.total_amount_eur,
          payment_method: booking.payment_method || 'stripe_card',
          payment_status: 'pending',
          status: 'pending',
        });
        // Trigger automated confirmation email via Resend
        try {
          await sendBookingConfirmationEmail({
            ref: booking.ref,
            customer_name: customer.name,
            customer_email: customer.email,
            service_title: booking.service_title || 'Transfer na Madeira',
            date: booking.date,
            time_slot: booking.time_slot,
            pickup_location: booking.pickup_location,
            passengers: booking.passengers || 1,
            total_amount_eur: booking.total_amount_eur,
            flight_number: booking.flight_number,
          });
        } catch (emailErr) {
          console.warn('[paymentService] Email trigger error:', emailErr);
        }
      }
    } catch (dbErr) {
      console.error('[paymentService] Direct booking DB save error:', dbErr);
    }

    // Redirect to success page for verification
    window.location.href = `/booking/success?ref=${booking.ref}`;
  },

  async redirectToCheckout(sessionId) {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    return stripe.redirectToCheckout({ sessionId });
  },
};

export default paymentService;

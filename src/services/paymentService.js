import { getStripe } from '../lib/stripe';

/**
 * Service for checkout and payment processing.
 * Placeholder: Checkout sessions must be created securely via Supabase Edge Functions.
 */
export const paymentService = {
  async createCheckoutSession(_bookingDetails) {
    // Placeholder - invoke Supabase Edge Function 'create-checkout'
    return { sessionId: null, url: null };
  },

  async redirectToCheckout(sessionId) {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }
    return stripe.redirectToCheckout({ sessionId });
  },
};

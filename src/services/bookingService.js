import { supabase } from '../lib/supabase';

/**
 * Service for booking operations (CRUD & Admin).
 */
export const bookingService = {
  /**
   * Fetch all bookings with customer details for Admin dashboard
   */
  async getAllBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customer_id (
            name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, data: data || [] };
    } catch (err) {
      console.error('[bookingService.getAllBookings]', err);
      return { success: false, error: err.message, data: [] };
    }
  },

  /**
   * Update the status of a specific booking (e.g. pending -> confirmed -> completed -> cancelled)
   */
  async updateBookingStatus(bookingId, newStatus) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (err) {
      console.error('[bookingService.updateBookingStatus]', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Summary metrics for dashboard
   */
  async getBookingSummary() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, total_amount, status, created_at');

      if (error) {
        throw error;
      }

      const total = data.length;
      const confirmed = data.filter((b) => b.status === 'confirmed').length;
      const pending = data.filter((b) => b.status === 'pending').length;
      const totalRevenue = data
        .filter((b) => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

      return {
        success: true,
        summary: {
          total,
          confirmed,
          pending,
          revenue: totalRevenue,
        },
      };
    } catch (err) {
      console.error('[bookingService.getBookingSummary]', err);
      return {
        success: false,
        summary: { total: 0, confirmed: 0, pending: 0, revenue: 0 },
      };
    }
  },

  /**
   * FASE 2: Get all blocked / unavailable dates
   */
  async getBlockedDates() {
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .select('date, reason')
        .order('date', { ascending: true });

      if (error) {
        throw error;
      }

      return { 
        success: true, 
        data: (data || []).map((item) => item.date) 
      };
    } catch (err) {
      console.warn('[bookingService.getBlockedDates] Using local fallback or empty list:', err.message);
      return { success: false, data: [] };
    }
  },

  /**
   * FASE 2: Admin block a date
   */
  async blockDate(dateStr, reason = 'Indisponível / Lotação Esgotada') {
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .insert([{ date: dateStr, reason }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (err) {
      console.error('[bookingService.blockDate]', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * FASE 2: Admin unblock a date
   */
  async unblockDate(dateStr) {
    try {
      const { error } = await supabase
        .from('blocked_dates')
        .delete()
        .eq('date', dateStr);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (err) {
      console.error('[bookingService.unblockDate]', err);
      return { success: false, error: err.message };
    }
  },
};

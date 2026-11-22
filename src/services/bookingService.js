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
        .select('id, total_amount, status, created_at, passengers');

      if (error) {
        throw error;
      }

      const total = data.length;
      const confirmedList = data.filter((b) => b.status === 'confirmed' || b.status === 'completed');
      const pendingList = data.filter((b) => b.status === 'pending');
      const cancelledList = data.filter((b) => b.status === 'cancelled');

      const confirmed = confirmedList.length;
      const pending = pendingList.length;
      const cancelled = cancelledList.length;

      // Confirmed Revenue
      const revenue = confirmedList.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

      // Pending Revenue Potential
      const pendingRevenue = pendingList.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

      // Lost Revenue due to cancellations
      const cancelledRevenue = cancelledList.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

      // Average Order Value (AOV)
      const avgOrderValue = confirmed > 0 ? Math.round(revenue / confirmed) : 0;

      // Total Passengers transported in confirmed bookings
      const totalPassengers = confirmedList.reduce((sum, b) => sum + (Number(b.passengers) || 1), 0);

      // Conversion rate (%)
      const conversionRate = total > 0 ? Math.round((confirmed / total) * 100) : 0;

      return {
        success: true,
        summary: {
          total,
          confirmed,
          pending,
          cancelled,
          revenue,
          pendingRevenue,
          cancelledRevenue,
          avgOrderValue,
          totalPassengers,
          conversionRate,
        },
      };
    } catch (err) {
      console.error('[bookingService.getBookingSummary]', err);
      return {
        success: false,
        summary: {
          total: 0,
          confirmed: 0,
          pending: 0,
          cancelled: 0,
          revenue: 0,
          pendingRevenue: 0,
          cancelledRevenue: 0,
          avgOrderValue: 0,
          totalPassengers: 0,
          conversionRate: 0,
        },
      };
    }
  },

  /**
   * FASE 2: Get all blocked / unavailable dates
   * Syncs with Supabase 'blocked_dates' and caches to localStorage
   */
  async getBlockedDates() {
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .select('date, reason')
        .order('date', { ascending: true });

      if (!error && data) {
        const dateList = data.map((item) => item.date);
        try {
          localStorage.setItem('mrt_blocked_dates', JSON.stringify(dateList));
        } catch {}
        return { success: true, data: dateList };
      }
    } catch (err) {
      console.warn('[bookingService.getBlockedDates] Supabase query failed, checking local cache:', err.message);
    }

    // LocalStorage fallback cache
    try {
      const local = localStorage.getItem('mrt_blocked_dates');
      if (local) {
        return { success: true, data: JSON.parse(local) };
      }
    } catch {}

    return { success: true, data: [] };
  },

  /**
   * FASE 2: Admin block a date
   */
  async blockDate(dateStr, reason = 'Indisponível / Lotação Esgotada') {
    // 1. Always update local cache immediately
    try {
      const current = JSON.parse(localStorage.getItem('mrt_blocked_dates') || '[]');
      if (!current.includes(dateStr)) {
        current.push(dateStr);
        current.sort();
        localStorage.setItem('mrt_blocked_dates', JSON.stringify(current));
      }
    } catch {}

    // 2. Persist to Supabase
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .insert([{ date: dateStr, reason }])
        .select()
        .single();

      if (error) {
        console.warn('[bookingService.blockDate] Supabase insert warning:', error.message);
      }
      return { success: true, data: data || { date: dateStr } };
    } catch (err) {
      console.error('[bookingService.blockDate]', err);
      return { success: true, data: { date: dateStr } };
    }
  },

  /**
   * FASE 2: Admin unblock a date
   */
  async unblockDate(dateStr) {
    // 1. Remove from local cache immediately
    try {
      const current = JSON.parse(localStorage.getItem('mrt_blocked_dates') || '[]');
      const filtered = current.filter((d) => d !== dateStr);
      localStorage.setItem('mrt_blocked_dates', JSON.stringify(filtered));
    } catch {}

    // 2. Remove from Supabase
    try {
      const { error } = await supabase
        .from('blocked_dates')
        .delete()
        .eq('date', dateStr);

      if (error) {
        console.warn('[bookingService.unblockDate] Supabase delete warning:', error.message);
      }
      return { success: true };
    } catch (err) {
      console.error('[bookingService.unblockDate]', err);
      return { success: true };
    }
  },

  /**
   * Save a custom tour quote request to Supabase (or fallback to bookings table)
   */
  async saveCustomTourRequest(requestData) {
    try {
      const ref = `REQ-CT-${Date.now().toString(36).toUpperCase()}`;
      const stopsText = (requestData.selected_points || []).join(' → ');

      // 1. Save or link customer row
      let customerId = null;
      try {
        const { data: customerRow } = await supabase
          .from('customers')
          .insert({
            name: requestData.customer_name,
            email: requestData.customer_email,
            phone: requestData.customer_phone || null,
          })
          .select('id')
          .single();

        if (customerRow) {
          customerId = customerRow.id;
        }
      } catch (custErr) {
        console.warn('[bookingService] Customer row insert warning:', custErr);
      }

      // 2. Insert into bookings table using exact columns verified in paymentService
      const bookingRecord = {
        booking_ref: ref,
        customer_id: customerId,
        customer_name: requestData.customer_name,
        customer_email: requestData.customer_email,
        customer_phone: requestData.customer_phone || null,
        service_type: 'custom_tour',
        service_id: 'custom-tour',
        service_name: `Tour Personalizado (${(requestData.selected_points || []).length} paragens: ${stopsText.slice(0, 50)}...)`,
        booking_date: requestData.date || null,
        booking_time: 'A combinar',
        pickup_location: requestData.pickup_location || (requestData.selected_points && requestData.selected_points[0]) || 'A combinar',
        passengers: Number(requestData.passengers) || 1,
        total_amount: 0,
        payment_method: 'quote_request',
        payment_status: 'pending',
        status: 'pending',
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingRecord])
        .select()
        .single();

      if (error) {
        console.error('[bookingService.saveCustomTourRequest] Insert into bookings error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (dbErr) {
      console.error('[bookingService.saveCustomTourRequest] Unexpected DB error:', dbErr);
      return { success: false, error: dbErr.message };
    }
  },

  /**
   * Get all custom tour requests for admin
   */
  async getCustomTourRequests() {
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
        .or('service_id.eq.custom-tour,service_type.eq.custom_tour,payment_method.eq.quote_request')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map((b) => {
          let stops = [];
          if (b.service_name && b.service_name.includes('paragens: ')) {
            const raw = b.service_name.split('paragens: ')[1] || '';
            stops = raw.replace(/\.\.\.\)?$/, '').split(' → ');
          }
          return {
            id: b.id,
            customer_name: b.customer?.name || b.customer_name || 'N/D',
            customer_email: b.customer?.email || b.customer_email || 'N/D',
            customer_phone: b.customer?.phone || b.customer_phone || '',
            selected_points: stops.length > 0 ? stops : ['Ver detalhes da reserva'],
            pickup_location: b.pickup_location || '',
            preferred_date: b.booking_date,
            passengers: b.passengers,
            notes: b.service_name,
            language: 'PT',
            status: b.status,
            created_at: b.created_at,
          };
        });
        return { success: true, data: mapped };
      }
    } catch (err) {
      console.warn('[bookingService.getCustomTourRequests]', err);
    }

    return { success: true, data: [] };
  },

  /**
   * Update custom tour request status
   */
  async updateCustomTourStatus(id, newStatus) {
    try {
      const { data, error } = await supabase
        .from('custom_tour_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('[bookingService.updateCustomTourStatus]', err);
      return { success: false, error: err.message };
    }
  },
};

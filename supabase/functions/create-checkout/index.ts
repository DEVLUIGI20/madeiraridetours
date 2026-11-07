// Supabase Edge Function: create-checkout
// Creates a Stripe Checkout session and stores the booking in Supabase.
// Runs server-side to protect STRIPE_SECRET_KEY.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const {
      booking_ref,
      service_type,
      service_id,
      service_title,
      booking_date,
      booking_time,
      passengers,
      pickup_location,
      special_notes,
      total_amount_eur,
      customer,
      success_url,
      cancel_url,
    } = payload;

    if (!booking_ref || !service_title || !booking_date || !customer?.email) {
      throw new Error('Campos obrigatórios em falta no payload da reserva.');
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeKey || !supabaseUrl || !supabaseServiceRole) {
      throw new Error('Configurações de ambiente (STRIPE ou SUPABASE) em falta no servidor.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    // 1. Verificar se a data não está bloqueada
    const { data: blocked } = await supabase
      .from('blocked_dates')
      .select('date')
      .eq('date', booking_date)
      .maybeSingle();

    if (blocked) {
      throw new Error('A data selecionada já não se encontra disponível.');
    }

    // 2. Registar ou obter o cliente
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', customer.email.toLowerCase().trim())
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCust, error: custErr } = await supabase
        .from('customers')
        .insert([{
          name: customer.name,
          email: customer.email.toLowerCase().trim(),
          phone: customer.phone,
        }])
        .select('id')
        .single();
      if (!custErr && newCust) customerId = newCust.id;
    }

    // 3. Criar a sessão no Stripe
    const amountInCents = Math.round(Number(total_amount_eur) * 100);

    const stripeParams = new URLSearchParams();
    stripeParams.append('payment_method_types[]', 'card');
    stripeParams.append('mode', 'payment');
    stripeParams.append('customer_email', customer.email);
    stripeParams.append('client_reference_id', booking_ref);
    stripeParams.append('success_url', success_url || `https://madeiraridetours.com/booking/success?ref=${booking_ref}`);
    stripeParams.append('cancel_url', cancel_url || `https://madeiraridetours.com/booking/cancel?ref=${booking_ref}`);
    
    stripeParams.append('line_items[0][price_data][currency]', 'eur');
    stripeParams.append('line_items[0][price_data][unit_amount]', String(amountInCents));
    stripeParams.append('line_items[0][price_data][product_data][name]', service_title);
    stripeParams.append('line_items[0][price_data][product_data][description]', `Data: ${booking_date} | Hora: ${booking_time || 'A combinar'} | Pax: ${passengers}`);
    stripeParams.append('line_items[0][quantity]', '1');

    stripeParams.append('metadata[booking_ref]', booking_ref);
    stripeParams.append('metadata[customer_name]', customer.name);
    stripeParams.append('metadata[booking_date]', booking_date);

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stripeParams.toString(),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      throw new Error(session.error?.message || 'Falha ao comunicar com a Stripe.');
    }

    // 4. Guardar a reserva como pending no Supabase
    await supabase.from('bookings').upsert([{
      booking_ref,
      customer_id: customerId,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      service_type,
      service_id,
      service_name: service_title,
      booking_date,
      booking_time,
      passengers: Number(passengers) || 1,
      pickup_location,
      special_notes,
      total_amount: Number(total_amount_eur) || 0,
      payment_method: 'stripe',
      payment_status: 'pending',
      status: 'pending',
      stripe_session_id: session.id,
      updated_at: new Date().toISOString(),
    }], { onConflict: 'booking_ref' });

    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

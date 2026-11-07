// Supabase Edge Function: stripe-webhook
// Securely handles checkout.session.completed, confirms booking,
// and sends branded digital voucher email via Resend API.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseServiceRole) {
      throw new Error('Supabase credenciais em falta no ambiente.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    // Tratamos o evento de sucesso no pagamento
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingRef = session.client_reference_id || session.metadata?.booking_ref;

      if (bookingRef) {
        // 1. Atualizar estado da reserva para confirmada
        const { data: booking, error: updateErr } = await supabase
          .from('bookings')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            updated_at: new Date().toISOString(),
          })
          .eq('booking_ref', bookingRef)
          .select()
          .single();

        if (updateErr) {
          console.error('[stripe-webhook] Erro ao atualizar booking:', updateErr);
        }

        // 2. Envio de Email com Voucher via Resend
        if (resendApiKey && booking?.customer_email) {
          const voucherHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #0f172a;">
              <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
                <h1 style="color: #f59e0b; margin: 0; font-size: 22px;">Madeira Ride Tours</h1>
                <p style="margin: 4px 0 0; font-size: 14px; color: #94a3b8;">Voucher de Confirmação de Reserva</p>
              </div>

              <div style="padding: 24px; background: #ffffff;">
                <p>Olá <strong>${booking.customer_name || 'Cliente'}</strong>,</p>
                <p>O teu pagamento foi confirmado com sucesso! Seguem os detalhes da tua viagem:</p>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="margin: 6px 0;"><strong>Referência:</strong> <span style="font-family: monospace; color: #b45309; font-weight: bold;">${booking.booking_ref}</span></p>
                  <p style="margin: 6px 0;"><strong>Serviço:</strong> ${booking.service_name}</p>
                  <p style="margin: 6px 0;"><strong>Data:</strong> ${booking.booking_date}</p>
                  <p style="margin: 6px 0;"><strong>Hora de Encontro:</strong> ${booking.booking_time || 'A combinar com o motorista'}</p>
                  <p style="margin: 6px 0;"><strong>Passageiros:</strong> ${booking.passengers}</p>
                  <p style="margin: 6px 0;"><strong>Ponto de Recolha:</strong> ${booking.pickup_location || 'A combinar'}</p>
                  <p style="margin: 6px 0;"><strong>Total Pago:</strong> ${booking.total_amount} €</p>
                </div>

                <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; border-radius: 4px; font-size: 13px; color: #065f46;">
                  O teu motorista entrará em contacto direto via WhatsApp ou chamada para confirmar os detalhes finais antes da hora marcada.
                </div>

                <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
                  Dúvidas ou alterações? Envia mensagem para o WhatsApp oficial: <a href="https://wa.me/351916326716" style="color: #10b981; font-weight: bold;">+351 916 326 716</a>
                </p>
              </div>

              <div style="background: #f1f5f9; padding: 14px; text-align: center; font-size: 12px; color: #64748b;">
                Madeira Ride Tours — Funchal, Ilha da Madeira, Portugal
              </div>
            </div>
          `;

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Madeira Ride Tours <reservas@madeiraridetours.com>',
              to: [booking.customer_email],
              subject: `Voucher Confirmado: ${booking.service_name} (#${booking.booking_ref})`,
              html: voucherHtml,
            }),
          });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[stripe-webhook error]', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

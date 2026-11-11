/**
 * Email notification service via Resend
 * Sends professional booking confirmation emails directly to customers.
 */

import { MADEIRA_ADVENTURES } from '../constants/transfersCatalog';
import { TOURS_DATA } from '../constants/toursCatalog';

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

/**
 * Sends a booking confirmation voucher email to customer
 * @param {Object} bookingDetails 
 */
export async function sendBookingConfirmationEmail(bookingDetails) {
  const {
    ref,
    customer_name,
    customer_email,
    service_title,
    date,
    time_slot,
    return_date,
    return_time,
    trip_type,
    pickup_location,
    passengers,
    total_amount_eur,
    flight_number,
    customer_phone,
    payment_method,
    service_id,
    service_type,
  } = bookingDetails;

  if (!customer_email) {
    console.warn('[emailService] No customer email provided, skipping email dispatch.');
    return { success: false, reason: 'missing_email' };
  }

  if (!RESEND_API_KEY) {
    console.warn('[emailService] VITE_RESEND_API_KEY not configured — skipping email.');
    return { success: false, reason: 'missing_api_key' };
  }
  const apiKey = RESEND_API_KEY;

  const isAirportBooking = service_id === 'airport-transfer' || 
    service_type === 'transfer' && (!service_id || service_id.includes('airport')) || 
    Boolean(flight_number);

  // Find tour or adventure itinerary if available
  const adventureObj = MADEIRA_ADVENTURES.find((a) => a.id === service_id || a.title === service_title);
  const tourObj = TOURS_DATA.find((t) => t.id === service_id || t.title === service_title);
  const matchedItinerary = adventureObj?.itinerary || tourObj?.itinerary || null;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a; }
        .email-card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
        .email-header { background: #0f172a; color: #ffffff; padding: 32px 24px; text-align: center; }
        .email-header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        .email-header p { margin: 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; }
        .email-body { padding: 32px 24px; }
        .ref-box { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; text-align: center; margin-bottom: 24px; }
        .ref-box span { display: block; font-size: 11px; text-transform: uppercase; color: #92400e; font-weight: 700; margin-bottom: 2px; }
        .ref-box strong { font-size: 20px; color: #b45309; letter-spacing: 0.05em; font-family: monospace; }
        .grid-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .grid-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .grid-table td.label { color: #64748b; font-weight: 600; width: 40%; }
        .grid-table td.value { color: #0f172a; font-weight: 700; }
        .instructions-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #475569; }
        .instructions-box h4 { margin: 0 0 8px; color: #0f172a; font-size: 14px; }
        .email-footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
        .btn-whatsapp { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 24px; border-radius: 8px; font-size: 14px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="email-card">
        <div class="email-header">
          <h1>Madeira Ride Tours</h1>
          <p>Confirmação de Reserva & Voucher Digital</p>
        </div>
        <div class="email-body">
          <p style="font-size: 16px; margin-top: 0;">Olá <strong>${customer_name}</strong>,</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.5;">Obrigado por escolher a <strong>Madeira Ride Tours</strong>! A sua reserva foi confirmada com sucesso.</p>
          
          <div class="ref-box">
            <span>Referência de Reserva</span>
            <strong>${ref}</strong>
          </div>

          <table class="grid-table">
            <tr>
              <td class="label">Cliente:</td>
              <td class="value">${customer_name}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td class="value">${customer_email}</td>
            </tr>
            ${customer_phone ? `
            <tr>
              <td class="label">Telefone:</td>
              <td class="value">${customer_phone}</td>
            </tr>` : ''}
            <tr>
              <td class="label">Serviço:</td>
              <td class="value">${service_title}</td>
            </tr>
            <tr>
              <td class="label">Data de Ida:</td>
              <td class="value"><strong>${date}</strong></td>
            </tr>
            <tr>
              <td class="label">Hora de Recolha:</td>
              <td class="value"><strong>${time_slot}</strong></td>
            </tr>
            ${trip_type === 'round-trip' && return_date ? `
            <tr>
              <td class="label">Tipo de Viagem:</td>
              <td class="value">Ida e Volta (Round Trip)</td>
            </tr>
            <tr>
              <td class="label">Data de Regresso:</td>
              <td class="value"><strong>${return_date}</strong> ${return_time ? `às ${return_time}` : ''}</td>
            </tr>` : ''}
            <tr>
              <td class="label">Ponto de Recolha / Hotel:</td>
              <td class="value">${pickup_location}</td>
            </tr>
            <tr>
              <td class="label">Passageiros:</td>
              <td class="value">${passengers} ${passengers === 1 ? 'passageiro' : 'passageiros'}</td>
            </tr>
            ${flight_number ? `
            <tr>
              <td class="label">Número de Voo:</td>
              <td class="value">✈️ ${flight_number}</td>
            </tr>` : ''}
            ${payment_method ? `
            <tr>
              <td class="label">Método de Pagamento:</td>
              <td class="value">${payment_method === 'stripe_card' ? 'Cartão de Crédito / Débito' : payment_method}</td>
            </tr>` : ''}
            <tr>
              <td class="label">Valor Total:</td>
              <td class="value" style="color: #4f46e5; font-size: 18px; font-weight: 800;">€${total_amount_eur}</td>
            </tr>
          </table>

          ${matchedItinerary && matchedItinerary.length > 0 ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 12px; color: #0f172a; font-size: 15px; font-weight: 800;">📍 Itinerário Completo da Excursão:</h4>
            <div style="margin: 0; padding: 0;">
              ${matchedItinerary.map((step, idx) => `
                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <span style="background: #e0e7ff; color: #4338ca; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;">${step.step || (idx + 1)}</span>
                  <div>
                    <strong style="color: #0f172a; font-size: 13px;">${step.titlePt || step.title}</strong>
                    ${step.descPt || step.desc ? `<p style="margin: 2px 0 0; color: #64748b; font-size: 12px; line-height: 1.4;">${step.descPt || step.desc}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          <div class="instructions-box">
            <h4>Instruções do Motorista:</h4>
            ${isAirportBooking ? `
            • <strong>No Aeroporto (FNC):</strong> O motorista aguarda na área de chegadas com uma placa com o seu nome. Monitorizamos o seu voo em tempo real.<br>
            ` : ''}
            • <strong>No Hotel / Morada de Recolha:</strong> Por favor aguarde na receção ou entrada principal 5 minutos antes da hora marcada.<br>
            • Pode apresentar este comprovativo digital diretamente no telemóvel ao motorista.
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://wa.me/351916326716?text=Ola%20tenho%20uma%20duvida%20sobre%20a%20reserva%20${ref}" class="btn-whatsapp">
              Falar com o Motorista no WhatsApp
            </a>
          </div>
        </div>

        <div class="email-footer">
          Madeira Ride Tours · Ilha da Madeira, Portugal<br>
          Contacto: info@madeiraridetours.com · +351 916 326 716
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Madeira Ride Tours <onboarding@resend.dev>',
        to: [customer_email],
        subject: `Confirmação de Reserva #${ref} — Madeira Ride Tours`,
        html: htmlContent,
      }),
    });

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (err) {
    console.error('[emailService] Resend dispatch error:', err);
    return { success: false, error: err };
  }
}

export default {
  sendBookingConfirmationEmail,
};


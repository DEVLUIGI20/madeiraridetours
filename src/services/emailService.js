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
    language = 'en',
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

  // Internationalized texts
  const lang = ['pt', 'en', 'de', 'fr', 'es'].includes(language) ? language : 'en';

  const i18n = {
    pt: {
      sub: 'Confirmação de Reserva & Voucher Digital',
      greeting: 'Olá',
      thanks: 'Obrigado por escolher a <strong>Madeira Ride Tours</strong>! A sua reserva foi confirmada com sucesso.',
      bookingRef: 'Referência de Reserva',
      customer: 'Cliente:',
      email: 'Email:',
      phone: 'Telefone:',
      service: 'Serviço:',
      date: 'Data de Ida:',
      time: 'Hora de Recolha:',
      tripType: 'Tipo de Viagem:',
      roundTripVal: 'Ida e Volta (Round Trip)',
      returnDate: 'Data de Regresso:',
      pickup: 'Ponto de Recolha / Hotel:',
      pax: 'Passageiros:',
      flight: 'Número de Voo:',
      payment: 'Método de Pagamento:',
      card: 'Cartão de Crédito / Débito',
      total: 'Valor Total:',
      itineraryTitle: '📍 Itinerário Completo da Excursão:',
      instTitle: 'Instruções do Motorista:',
      airportInst: '• <strong>No Aeroporto (FNC):</strong> O motorista aguarda na área de chegadas com uma placa com o seu nome. Monitorizamos o seu voo em tempo real.<br>',
      hotelInst: '• <strong>No Hotel / Morada de Recolha:</strong> Por favor aguarde na receção ou entrada principal 5 minutos antes da hora marcada.<br>• Pode apresentar este comprovativo digital diretamente no telemóvel ao motorista.',
      waBtn: 'Falar com o Motorista no WhatsApp',
      footer: 'Madeira Ride Tours · Ilha da Madeira, Portugal<br>Contacto: info@madeiraridetours.com · +351 916 326 716',
    },
    en: {
      sub: 'Booking Confirmation & Digital Voucher',
      greeting: 'Hello',
      thanks: 'Thank you for choosing <strong>Madeira Ride Tours</strong>! Your booking has been successfully confirmed.',
      bookingRef: 'Booking Reference',
      customer: 'Customer:',
      email: 'Email:',
      phone: 'Phone:',
      service: 'Service:',
      date: 'Departure Date:',
      time: 'Pick-up Time:',
      tripType: 'Trip Type:',
      roundTripVal: 'Round Trip',
      returnDate: 'Return Date:',
      pickup: 'Pick-up Location / Hotel:',
      pax: 'Passengers:',
      flight: 'Flight Number:',
      payment: 'Payment Method:',
      card: 'Credit / Debit Card',
      total: 'Total Amount:',
      itineraryTitle: '📍 Full Tour Itinerary:',
      instTitle: 'Driver Instructions:',
      airportInst: '• <strong>At Madeira Airport (FNC):</strong> Your driver will be waiting in the arrival hall holding a name board. We track your flight in real-time.<br>',
      hotelInst: '• <strong>At Hotel / Pick-up Address:</strong> Please be ready at reception or main entrance 5 minutes before scheduled time.<br>• You can show this digital voucher directly on your phone.',
      waBtn: 'Contact Driver via WhatsApp',
      footer: 'Madeira Ride Tours · Madeira Island, Portugal<br>Contact: info@madeiraridetours.com · +351 916 326 716',
    },
    de: {
      sub: 'Buchungsbestätigung & Digitaler Voucher',
      greeting: 'Hallo',
      thanks: 'Vielen Dank, dass Sie sich für <strong>Madeira Ride Tours</strong> entschieden haben! Ihre Buchung wurde bestätigt.',
      bookingRef: 'Buchungsreferenz',
      customer: 'Kunde:',
      email: 'E-Mail:',
      phone: 'Telefon:',
      service: 'Service:',
      date: 'Hinfahrt-Datum:',
      time: 'Abholzeit:',
      tripType: 'Fahrtart:',
      roundTripVal: 'Hin- und Rückfahrt',
      returnDate: 'Rückfahrt-Datum:',
      pickup: 'Abholort / Hotel:',
      pax: 'Passagiere:',
      flight: 'Flugnummer:',
      payment: 'Zahlungsmethode:',
      card: 'Kredit- / Debitkarte',
      total: 'Gesamtbetrag:',
      itineraryTitle: '📍 Vollständiger Reiseverlauf:',
      instTitle: 'Fahrerhinweise:',
      airportInst: '• <strong>Am Flughafen Madeira (FNC):</strong> Ihr Fahrer erwartet Sie in der Ankunftshalle mit einem Namensschild. Wir überwachen Ihren Flug live.<br>',
      hotelInst: '• <strong>Am Hotel / Abholadresse:</strong> Bitte warten Sie 5 Minuten vor Abfahrt an der Rezeption oder am Haupteingang.<br>• Sie können diesen Gutschein direkt auf dem Handy vorzeigen.',
      waBtn: 'Fahrer über WhatsApp kontaktieren',
      footer: 'Madeira Ride Tours · Insel Madeira, Portugal<br>Kontakt: info@madeiraridetours.com · +351 916 326 716',
    },
    fr: {
      sub: 'Confirmation de Réservation & Bon Numérique',
      greeting: 'Bonjour',
      thanks: 'Merci d’avoir choisi <strong>Madeira Ride Tours</strong> ! Votre réservation est confirmée avec succès.',
      bookingRef: 'Référence de Réservation',
      customer: 'Client :',
      email: 'Email :',
      phone: 'Téléphone :',
      service: 'Service :',
      date: 'Date de départ :',
      time: 'Heure de prise en charge :',
      tripType: 'Type de trajet :',
      roundTripVal: 'Aller-retour',
      returnDate: 'Date de retour :',
      pickup: 'Lieu de prise en charge / Hôtel :',
      pax: 'Passagers :',
      flight: 'Numéro de vol :',
      payment: 'Mode de paiement :',
      card: 'Carte Bancaire',
      total: 'Montant Total :',
      itineraryTitle: '📍 Itinéraire Complet :',
      instTitle: 'Consignes du Chauffeur :',
      airportInst: '• <strong>À l’Aéroport de Madère (FNC) :</strong> Le chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom. Nous suivons votre vol en direct.<br>',
      hotelInst: '• <strong>À l’Hôtel / Adresse de départ :</strong> Merci de vous présenter à l’accueil 5 minutes avant l’heure prévue.<br>• Vous pouvez présenter ce bon directement sur votre smartphone.',
      waBtn: 'Contacter le Chauffeur sur WhatsApp',
      footer: 'Madeira Ride Tours · Île de Madère, Portugal<br>Contact : info@madeiraridetours.com · +351 916 326 716',
    },
    es: {
      sub: 'Confirmación de Reserva y Voucher Digital',
      greeting: 'Hola',
      thanks: '¡Gracias por elegir <strong>Madeira Ride Tours</strong>! Su reserva ha sido confirmada con éxito.',
      bookingRef: 'Referencia de Reserva',
      customer: 'Cliente:',
      email: 'Correo Electrónico:',
      phone: 'Teléfono:',
      service: 'Servicio:',
      date: 'Fecha de Ida:',
      time: 'Hora de Recogida:',
      tripType: 'Tipo de Viaje:',
      roundTripVal: 'Ida y Vuelta',
      returnDate: 'Fecha de Regreso:',
      pickup: 'Lugar de Recogida / Hotel:',
      pax: 'Pasajeros:',
      flight: 'Número de Vuelo:',
      payment: 'Método de Pago:',
      card: 'Tarjeta de Crédito / Débito',
      total: 'Importe Total:',
      itineraryTitle: '📍 Itinerario Completo:',
      instTitle: 'Instrucciones del Conductor:',
      airportInst: '• <strong>En el Aeropuerto (FNC):</strong> El conductor le esperará en llegadas con un cartel con su nombre. Seguimos su vuelo en tiempo real.<br>',
      hotelInst: '• <strong>En el Hotel / Dirección de Recogida:</strong> Por favor espere en recepción 5 minutos antes de la hora prevista.<br>• Puede mostrar este voucher digital en su teléfono móvil.',
      waBtn: 'Contactar al Conductor por WhatsApp',
      footer: 'Madeira Ride Tours · Isla de Madeira, Portugal<br>Contacto: info@madeiraridetours.com · +351 916 326 716',
    },
  };

  const t = i18n[lang] || i18n.en;

  // Find tour or adventure itinerary if available
  const adventureObj = MADEIRA_ADVENTURES.find((a) => a.id === service_id || a.title === service_title);
  const tourObj = TOURS_DATA.find((t) => t.id === service_id || t.title === service_title);
  const matchedItinerary = adventureObj?.itinerary || tourObj?.itinerary || null;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="${lang}">
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
          <p>${t.sub}</p>
        </div>
        <div class="email-body">
          <p style="font-size: 16px; margin-top: 0;">${t.greeting} <strong>${customer_name}</strong>,</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.5;">${t.thanks}</p>
          
          <div class="ref-box">
            <span>${t.bookingRef}</span>
            <strong>${ref}</strong>
          </div>

          <table class="grid-table">
            <tr>
              <td class="label">${t.customer}</td>
              <td class="value">${customer_name}</td>
            </tr>
            <tr>
              <td class="label">${t.email}</td>
              <td class="value">${customer_email}</td>
            </tr>
            ${customer_phone ? `
            <tr>
              <td class="label">${t.phone}</td>
              <td class="value">${customer_phone}</td>
            </tr>` : ''}
            <tr>
              <td class="label">${t.service}</td>
              <td class="value">${(lang === 'pt' && adventureObj?.titlePt) ? adventureObj.titlePt : service_title}</td>
            </tr>
            <tr>
              <td class="label">${t.date}</td>
              <td class="value"><strong>${date}</strong></td>
            </tr>
            <tr>
              <td class="label">${t.time}</td>
              <td class="value"><strong>${time_slot}</strong></td>
            </tr>
            ${trip_type === 'round-trip' && return_date ? `
            <tr>
              <td class="label">${t.tripType}</td>
              <td class="value">${t.roundTripVal}</td>
            </tr>
            <tr>
              <td class="label">${t.returnDate}</td>
              <td class="value"><strong>${return_date}</strong> ${return_time ? `(${return_time})` : ''}</td>
            </tr>` : ''}
            <tr>
              <td class="label">${t.pickup}</td>
              <td class="value">${pickup_location}</td>
            </tr>
            <tr>
              <td class="label">${t.pax}</td>
              <td class="value">${passengers}</td>
            </tr>
            ${flight_number ? `
            <tr>
              <td class="label">${t.flight}</td>
              <td class="value">✈️ ${flight_number}</td>
            </tr>` : ''}
            ${payment_method ? `
            <tr>
              <td class="label">${t.payment}</td>
              <td class="value">${payment_method === 'stripe_card' ? t.card : payment_method}</td>
            </tr>` : ''}
            <tr>
              <td class="label">${t.total}</td>
              <td class="value" style="color: #4f46e5; font-size: 18px; font-weight: 800;">€${total_amount_eur}</td>
            </tr>
          </table>

          ${matchedItinerary && matchedItinerary.length > 0 ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 12px; color: #0f172a; font-size: 15px; font-weight: 800;">${t.itineraryTitle}</h4>
            <div style="margin: 0; padding: 0;">
              ${matchedItinerary.map((step, idx) => {
                const titleStr = (lang === 'pt' && step.titlePt) ? step.titlePt : step.title;
                const descStr = (lang === 'pt' && step.descPt) ? step.descPt : step.desc;
                return `
                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <span style="background: #e0e7ff; color: #4338ca; font-weight: 800; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;">${step.step || (idx + 1)}</span>
                  <div>
                    <strong style="color: #0f172a; font-size: 13px;">${titleStr}</strong>
                    ${descStr ? `<p style="margin: 2px 0 0; color: #64748b; font-size: 12px; line-height: 1.4;">${descStr}</p>` : ''}
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
          ` : ''}

          <div class="instructions-box">
            <h4>${t.instTitle}</h4>
            ${isAirportBooking ? t.airportInst : ''}
            ${t.hotelInst}
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://wa.me/351916326716?text=${encodeURIComponent(ref)}" class="btn-whatsapp">
              ${t.waBtn}
            </a>
          </div>
        </div>

        <div class="email-footer">
          ${t.footer}
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


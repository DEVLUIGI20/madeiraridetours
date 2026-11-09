/**
 * Utility to generate and download an .ics calendar file
 * Compatible with Apple Calendar, Google Calendar, Outlook, and mobile native apps.
 */

export function downloadCalendarEvent(booking) {
  if (!booking) return;

  const {
    booking_ref = 'MRT-TRIP',
    service_name = 'Transfer na Madeira',
    booking_date = '',
    booking_time = '10:00',
    pickup_location = 'Madeira',
  } = booking;

  // Format date and time for iCalendar (YYYYMMDDTHHmmSS)
  const cleanDate = (booking_date || '').replace(/-/g, '');
  const cleanTime = (booking_time || '10:00').replace(':', '') + '00';
  const startDateTime = `${cleanDate}T${cleanTime}`;

  // Estimate end time +2 hours
  const hours = parseInt((booking_time || '10:00').split(':')[0], 10) || 10;
  const endHours = (hours + 2).toString().padStart(2, '0');
  const cleanEndTime = `${endHours}${(booking_time || '10:00').split(':')[1] || '00'}00`;
  const endDateTime = `${cleanDate}T${cleanEndTime}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Madeira Ride Tours//Booking Voucher//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking_ref}@madeiraridetours.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    `SUMMARY:${service_name} — Madeira Ride Tours`,
    `DESCRIPTION:Reserva confirmada #${booking_ref}. Recolha: ${pickup_location}. Contacto de apoio: +351 916 326 716`,
    `LOCATION:${pickup_location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Voucher-${booking_ref}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default downloadCalendarEvent;


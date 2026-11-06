import { useLanguage } from '../../hooks/useLanguage';
import TourCard from '../../components/common/TourCard';
import { getLocalizedTransferServices } from '../../constants/transfers';
import { ROUTES, makeWhatsAppUrl } from '../../constants';
import './Transfers.css';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.26 15.09 13.66 14.86 13.58C14.63 13.5 14.47 13.46 14.3 13.71C14.14 13.96 13.66 14.52 13.52 14.68C13.38 14.84 13.23 14.86 12.98 14.74C12.74 14.61 11.94 14.35 11 13.51C10.26 12.85 9.76 12.04 9.62 11.8C9.48 11.55 9.6 11.41 9.72 11.29C9.83 11.18 9.97 11.01 10.09 10.87C10.21 10.73 10.25 10.63 10.33 10.46C10.41 10.3 10.37 10.15 10.31 10.03C10.25 9.91 9.76 8.7 9.56 8.21C9.36 7.73 9.16 7.79 9 7.79H8.52C8.36 7.79 8.09 7.85 7.87 8.09C7.64 8.34 7 8.94 7 10.16C7 11.38 7.89 12.56 8.01 12.72C8.13 12.89 9.76 15.4 12.24 16.47C12.83 16.73 13.29 16.88 13.65 17C14.24 17.18 14.78 17.16 15.21 17.09C15.68 17.02 16.66 16.5 16.86 15.93C17.07 15.35 17.07 14.86 17 14.74C16.94 14.61 16.8 14.52 16.56 14.39Z" />
    </svg>
  );
}

export default function Transfers() {
  const { t } = useLanguage();
  const transferServices = getLocalizedTransferServices(t);

  return (
    <div className="transfers-page-view">
      <div className="transfers-container">
        {/* Cards Grid — exactly matching the layout and card format requested */}
        <div className="transfers-cards-grid">
          {transferServices.map((service) => (
            <TourCard key={service.id} tour={service} />
          ))}
        </div>

        {/* Support Banner */}
        <section className="transfers-support-box">
          <div className="support-box-left">
            <div className="support-box-icon" aria-hidden="true">💬</div>
            <div>
              <h4 className="support-box-title">
                {t('faq.helpTitle', 'Ainda tem alguma dúvida?')}
              </h4>
              <p className="support-box-desc">
                {t('faq.helpDesc', 'Estamos disponíveis 24/7 para responder às suas perguntas e organizar a sua viagem.')}
              </p>
            </div>
          </div>
          <div className="support-box-actions">
            <a
              href={makeWhatsAppUrl('Olá! Tenho uma dúvida sobre os serviços de transfer da Madeira Ride Tours.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-pill"
            >
              <WhatsAppIcon />
              <span>WhatsApp →</span>
            </a>
            <a href={ROUTES.BOOKING} className="btn-booking-pill">
              Booking
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

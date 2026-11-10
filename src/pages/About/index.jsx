import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { makeWhatsAppUrl } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import './About.css';

const WHATSAPP_URL = makeWhatsAppUrl('Olá! Gostaria de mais informações sobre os vossos serviços na Madeira.');

export default function About() {
  const { currentLang } = useLanguage();

  return (
    <div className="about-mockup-page">

      {/* ── Sub-Hero ── */}
      <section className="about-mockup-hero">
        <div className="about-hero-bg">
          <ImagePlaceholder alt="Madeira Mountain Landscape" height="100%" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content container-constrained">
          <span className="about-hero-tag">
            {currentLang === 'pt' ? 'QUEM SOMOS' : currentLang === 'de' ? 'ÜBER UNS' : currentLang === 'fr' ? 'QUI SOMMES-NOUS' : 'WHO WE ARE'}
          </span>
          <h1 className="about-hero-title">
            {currentLang === 'pt' ? 'Sobre a Madeira Ride Tours' : currentLang === 'de' ? 'Über Madeira Ride Tours' : currentLang === 'fr' ? 'À Propos de Madeira Ride Tours' : currentLang === 'es' ? 'Sobre Madeira Ride Tours' : 'About Madeira Ride Tours'}
          </h1>
          <p className="about-hero-subtitle">
            {currentLang === 'pt'
              ? 'Os seus especialistas locais para transfers privados, aventuras na ilha e excursões inesquecíveis na Madeira.'
              : currentLang === 'de'
              ? 'Ihre lokalen Experten für private Transfers, Inselabenteuer und unvergessliche Ausflüge auf Madeira.'
              : currentLang === 'fr'
              ? 'Vos experts locaux pour les transferts privés, les aventures insulaires et les excursions inoubliables à Madère.'
              : currentLang === 'es'
              ? 'Sus expertos locales para traslados privados, aventuras por la isla y excursiones inolvidables en Madeira.'
              : 'Your local experts for private transfers, island adventures and unforgettable excursions in Madeira.'}
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="about-main-section container-constrained">
        <div className="about-mockup-grid">
          <div className="about-mockup-text">
            <span className="about-badge">
              {currentLang === 'pt' ? 'A NOSSA HISTÓRIA' : currentLang === 'de' ? 'UNSERE GESCHICHTE' : currentLang === 'fr' ? 'NOTRE HISTOIRE' : 'OUR STORY'}
            </span>
            <h2>
              {currentLang === 'pt'
                ? 'Nascidos e criados na ilha que adoramos'
                : currentLang === 'de'
                ? 'Geboren und aufgewachsen auf der Insel, die wir lieben'
                : currentLang === 'fr'
                ? 'Nés et élevés sur l’île que nous aimons'
                : 'Born and raised on the island we love'}
            </h2>
            <p>
              {currentLang === 'pt'
                ? 'A Madeira Ride Tours foi fundada com uma missão simples: partilhar a beleza autêntica da nossa ilha com visitantes de todo o mundo. Como empresa familiar local, conhecemos cada estrada de montanha, miradouro escondido e trilho secreto de levada.'
                : 'Madeira Ride Tours was founded with a simple mission: to share the authentic beauty of our island with visitors from around the world. As a local family-run business, we know every mountain road, hidden viewpoint and secret levada path.'}
            </p>
            <p>
              {currentLang === 'pt'
                ? 'Com mais de 6 anos de experiência e mais de 1.000 clientes satisfeitos, construímos a nossa reputação na pontualidade, segurança e atendimento verdadeiramente personalizado. Connosco, você é um convidado de honra.'
                : 'With over 6 years of experience and more than 1,000 happy travellers, we have built our reputation on punctuality, safety and genuinely personalised service. When you travel with us, you are a guest.'}
            </p>
            <p>
              {currentLang === 'pt'
                ? 'Operamos uma frota moderna de viaturas Mercedes-Benz totalmente licenciadas e seguradas para transporte de passageiros em Portugal. Os nossos motoristas são certificados, multilingues e dedicados a mostrar o melhor da Madeira.'
                : 'We operate a fleet of modern, climate-controlled Mercedes-Benz vehicles, all fully licensed and insured for passenger transport in Portugal. Our drivers are certified, multilingual and passionate.'}
            </p>

            <div className="about-highlights-boxes">
              <div className="about-box">
                <strong>6+</strong>
                <span>{currentLang === 'pt' ? 'Anos de Experiência' : 'Years of Experience'}</span>
              </div>
              <div className="about-box">
                <strong>1,000+</strong>
                <span>{currentLang === 'pt' ? 'Viajantes Satisfeitos' : 'Happy Travellers'}</span>
              </div>
              <div className="about-box">
                <strong>5.0 ★</strong>
                <span>{currentLang === 'pt' ? 'Classificação de Topo' : 'Top Rated'}</span>
              </div>
              <div className="about-box">
                <strong>100%</strong>
                <span>{currentLang === 'pt' ? 'Privado & Flexível' : 'Private & Flexible'}</span>
              </div>
            </div>
          </div>

          <div className="about-mockup-media">
            <ImagePlaceholder
              alt="Madeira Ride Tours driver and van"
              aspectRatio="4/3"
              label={currentLang === 'pt' ? 'A Nossa Equipa & Frota' : 'Our Team & Fleet'}
            />
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="about-why-section">
        <div className="container-constrained">
          <div className="about-why-header">
            <span className="about-badge">{currentLang === 'pt' ? 'PORQUÊ NÓS' : 'WHY CHOOSE US'}</span>
            <h2>{currentLang === 'pt' ? 'O que nos torna diferentes' : 'What makes us different'}</h2>
            <p>
              {currentLang === 'pt'
                ? 'Não somos uma agência impessoal. Somos uma equipa dedicada que trata cada passageiro como um amigo da casa.'
                : 'We are not a large agency. We are a small, dedicated team that treats every client like a local friend.'}
            </p>
          </div>

          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">🛡️</div>
              <h3>{currentLang === 'pt' ? 'Licenciados & Segurados' : 'Licensed & Insured'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Todas as nossas viaturas possuem alvará e licenças oficiais de turismo (TVDE/Aluguer) em Portugal, com cobertura integral de seguro.'
                  : 'All our vehicles hold valid Portuguese tourism transport licences (TVDE/Aluguer). Full insurance coverage on every journey.'}
              </p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">⏱️</div>
              <h3>{currentLang === 'pt' ? 'Sempre Pontuais' : 'Always Punctual'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Acompanhamos o seu voo em tempo real. Se atrasar, esperamos sem qualquer taxa adicional.'
                  : 'We monitor your flight in real time. If your plane is delayed, we wait — with no extra charge.'}
              </p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">🗣️</div>
              <h3>{currentLang === 'pt' ? 'Equipa Multilingue' : 'Multilingual Team'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Os nossos motoristas falam Português, Inglês e Espanhol para garantir uma comunicação fluida e agradável.'
                  : 'Our drivers speak English, Portuguese and Spanish, making every conversation comfortable for international visitors.'}
              </p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">🌿</div>
              <h3>{currentLang === 'pt' ? 'Conhecimento Local' : 'Local Knowledge'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Conhecemos os melhores miradouros ao nascer do sol, as levadas mais tranquilas e restaurantes autênticos fora do radar comum.'
                  : 'We know the best sunrise spots, the quietest levadas and the authentic restaurants that tourists rarely find.'}
              </p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">👨‍👩‍👧</div>
              <h3>{currentLang === 'pt' ? 'Ideal para Famílias' : 'Family Friendly'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Cadeirinhas de bebé e assentos de elevação disponíveis gratuitamente mediante solicitação.'
                  : 'Baby seats, booster cushions and patience for families with young children — all included at no extra charge.'}
              </p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">💬</div>
              <h3>{currentLang === 'pt' ? 'Apoio WhatsApp 24/7' : '24/7 WhatsApp Support'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Tem dúvidas ou pretende ajustar a hora da recolha? Respondemos rapidamente no WhatsApp a qualquer hora.'
                  : 'Have a question? Need to change your pickup time? We are always available on WhatsApp.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Fleet ── */}
      <section className="about-fleet-section container-constrained">
        <span className="about-badge">{currentLang === 'pt' ? 'A NOSSA FROTA' : 'OUR VEHICLES'}</span>
        <h2>{currentLang === 'pt' ? 'Confortável, moderna e sempre limpa' : 'Comfortable, modern and always clean'}</h2>
        <p className="about-fleet-desc">
          {currentLang === 'pt'
            ? 'Dispomos de duas categorias de viaturas para corresponder a qualquer dimensão de grupo:'
            : 'We operate two categories of vehicle to suit any group size:'}
        </p>

        <div className="about-fleet-grid">
          <div className="about-fleet-card">
            <div className="about-fleet-media">
              <ImagePlaceholder alt="Mercedes-Benz V-Class Private Transfer" aspectRatio="16/9" label={currentLang === 'pt' ? 'Carrinha Standard' : 'Private Standard Van'} />
              <span className="about-fleet-badge">{currentLang === 'pt' ? 'Popular' : 'Popular'}</span>
            </div>
            <div className="about-fleet-body">
              <h3>{currentLang === 'pt' ? 'Viatura Standard (Até 4 Pax)' : 'Private Standard Van'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Até 4 passageiros + 4 malas de porão. Ar condicionado, assentos em pele e tomadas de carregamento. Perfeito para casais e pequenas famílias.'
                  : 'Up to 4 passengers + 4 large suitcases. Climate controlled, leather seats, charging ports. Perfect for couples, families and small groups.'}
              </p>
              <ul>
                <li>✓ Mercedes-Benz V-Class {currentLang === 'pt' ? 'ou equivalente' : 'or equivalent'}</li>
                <li>✓ {currentLang === 'pt' ? 'Ar condicionado' : 'Air conditioning'}</li>
                <li>✓ {currentLang === 'pt' ? 'Água engarrafada de cortesia' : 'Complimentary water'}</li>
                <li>✓ {currentLang === 'pt' ? 'Serviço porta a porta' : 'Door-to-door service'}</li>
              </ul>
            </div>
          </div>
          <div className="about-fleet-card">
            <div className="about-fleet-media">
              <ImagePlaceholder alt="Mercedes-Benz Sprinter Group Transfer" aspectRatio="16/9" label={currentLang === 'pt' ? 'Carrinha Familiar Executiva' : 'Executive Family Van'} />
              <span className="about-fleet-badge">{currentLang === 'pt' ? 'Espaçosa' : 'Spacious'}</span>
            </div>
            <div className="about-fleet-body">
              <h3>{currentLang === 'pt' ? 'Viatura Executiva (Até 8 Pax)' : 'Executive Family Van'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Até 8 passageiros + 8 malas. Ideal para famílias numerosas, grupos de amigos ou viagens corporativas.'
                  : 'Up to 8 passengers + 8 large suitcases. Ideal for larger families, groups of friends or corporate travel.'}
              </p>
              <ul>
                <li>✓ Mercedes-Benz Sprinter {currentLang === 'pt' ? 'ou equivalente' : 'or equivalent'}</li>
                <li>✓ {currentLang === 'pt' ? 'Grande capacidade de bagagem' : 'Extra luggage capacity'}</li>
                <li>✓ {currentLang === 'pt' ? 'Ar condicionado' : 'Air conditioning'}</li>
                <li>✓ {currentLang === 'pt' ? 'Água engarrafada de cortesia' : 'Complimentary water'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="container-constrained about-cta-inner">
          <div>
            <h2>{currentLang === 'pt' ? 'Pronto para explorar a Madeira connosco?' : 'Ready to explore Madeira with us?'}</h2>
            <p>
              {currentLang === 'pt'
                ? 'Reserve o seu transfer privado ou aventura online, ou envie-nos uma mensagem no WhatsApp — respondemos num instante.'
                : 'Book your private transfer or adventure online, or send us a message on WhatsApp — we reply fast.'}
            </p>
          </div>
          <div className="about-cta-buttons">
            <Link to="/transfers" className="about-cta-primary">
              {currentLang === 'pt' ? 'Reservar um Transfer' : 'Book a Transfer'}
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="about-cta-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.181-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52h-.578c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.58-.086 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 21.787h-.002c-1.734 0-3.434-.466-4.92-1.348l-.353-.209-3.662.96 1.002-3.568-.23-.367a9.742 9.742 0 0 1-1.492-5.185c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.016 6.905 2.862a9.704 9.704 0 0 1 2.86 6.906c0 5.387-4.383 9.771-9.77 9.771zm8.31-18.079C18.134 1.493 15.215.334 12.04.334 5.626.334.402 5.556.402 11.972c0 2.05.534 4.053 1.55 5.818L0 24l6.417-1.683c1.706.93 3.63 1.42 5.617 1.42h.005c6.413 0 11.636-5.223 11.636-11.638 0-3.109-1.21-6.031-3.325-8.391z"/>
              </svg>
              {currentLang === 'pt' ? 'Conversar no WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

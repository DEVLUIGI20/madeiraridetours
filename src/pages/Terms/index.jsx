import { Link } from 'react-router-dom';
import '../Privacy/Privacy.css';

const LAST_UPDATED = '8 de novembro de 2025';
const COMPANY = 'Madeira Ride Tours';
const EMAIL = 'info@madeiraridetours.com';
const PHONE = '+351 916 326 716';

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container-constrained">
          <span className="legal-tag">Legal · Termos</span>
          <h1>Termos e Condições</h1>
          <p className="legal-updated">Última atualização: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="legal-content container-constrained">
        <div className="legal-toc">
          <h3>Índice</h3>
          <ol>
            <li><a href="#servicos">Os Nossos Serviços</a></li>
            <li><a href="#reservas">Reservas e Confirmação</a></li>
            <li><a href="#pagamentos">Pagamentos</a></li>
            <li><a href="#cancelamento">Cancelamento e Reembolsos</a></li>
            <li><a href="#responsabilidades">Responsabilidades</a></li>
            <li><a href="#meteorologia">Condições Meteorológicas</a></li>
            <li><a href="#passageiros">Regras para Passageiros</a></li>
            <li><a href="#lei">Lei Aplicável</a></li>
          </ol>
        </div>

        <div className="legal-body">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', fontStyle: 'italic' }}>
            Ao efetuar uma reserva ou utilizar os serviços da {COMPANY}, o cliente aceita os presentes Termos e Condições na íntegra.
          </p>

          <section id="servicos">
            <h2>1. Os Nossos Serviços</h2>
            <p>
              A <strong>{COMPANY}</strong> presta os seguintes serviços na Ilha da Madeira, Portugal:
            </p>
            <ul>
              <li>Transfers privados de e para o Aeroporto Internacional da Madeira (FNC)</li>
              <li>Transfers ponto-a-ponto entre localidades da ilha</li>
              <li>Tours privados e excursões personalizadas (Aventuras na Madeira)</li>
              <li>Transporte de e para levadas e trilhos pedestres</li>
              <li>Tours personalizados à medida do cliente (Custom Tours)</li>
            </ul>
            <p>
              Todos os serviços são <strong>100% privados</strong> — nunca partilhamos a viatura com outros clientes sem consentimento expresso.
            </p>
          </section>

          <section id="reservas">
            <h2>2. Reservas e Confirmação</h2>
            <p>
              Uma reserva considera-se confirmada apenas após:
            </p>
            <ul>
              <li>Receção do pagamento total ou parcial acordado; <strong>ou</strong></li>
              <li>Confirmação escrita por WhatsApp ou email pelo nosso serviço</li>
            </ul>
            <p>
              O cliente receberá um <strong>voucher de confirmação</strong> por email com todos os detalhes da reserva, incluindo referência única, serviço, data, hora e local de pickup.
            </p>
            <p>
              É responsabilidade do cliente verificar a exatidão de todos os dados no voucher e comunicar qualquer erro no prazo de 24 horas.
            </p>
          </section>

          <section id="pagamentos">
            <h2>3. Pagamentos</h2>
            <p>Aceitamos os seguintes métodos de pagamento:</p>
            <ul>
              <li><strong>Online:</strong> Cartão de crédito/débito (Visa, Mastercard) via Stripe — processamento 100% seguro</li>
              <li><strong>Presencial:</strong> Numerário (EUR), MB Way, cartão de débito/crédito</li>
              <li><strong>Transferência bancária:</strong> Mediante acordo prévio</li>
            </ul>
            <p>
              Todos os preços indicados são em <strong>Euros (€)</strong>, por viatura (não por pessoa), e incluem IVA quando aplicável. Os preços são fixos e confirmados no momento da reserva — não existem custos ocultos.
            </p>
          </section>

          <section id="cancelamento">
            <h2>4. Política de Cancelamento e Reembolsos</h2>
            <div className="legal-purposes">
              <div className="purpose-card" style={{ borderLeftColor: '#10b981', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
                <strong>✅ Cancelamento gratuito</strong>
                <p>Cancelamentos com aviso prévio de <strong>24 horas ou mais</strong> antes da hora marcada são totalmente gratuitos. Reembolso integral em 5–10 dias úteis.</p>
              </div>
              <div className="purpose-card" style={{ borderLeftColor: '#f59e0b', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
                <strong>⚠️ Cancelamento tardio</strong>
                <p>Cancelamentos com menos de <strong>24 horas</strong> de antecedência podem estar sujeitos a uma taxa de 50% do valor do serviço.</p>
              </div>
              <div className="purpose-card" style={{ borderLeftColor: '#ef4444', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
                <strong>❌ No-show</strong>
                <p>Em caso de não comparência sem aviso, a reserva considera-se perdida e não haverá reembolso.</p>
              </div>
              <div className="purpose-card" style={{ borderLeftColor: '#4f46e5', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
                <strong>🌧️ Cancelamento por nós</strong>
                <p>Em caso de cancelamento por nossa iniciativa (avaria, força maior), o reembolso é integral ou reagendamos sem custos adicionais.</p>
              </div>
            </div>
            <p style={{ marginTop: '14px' }}>
              Para cancelamentos, contacte-nos por WhatsApp ({PHONE}) ou email ({EMAIL}) o mais cedo possível.
            </p>
          </section>

          <section id="responsabilidades">
            <h2>5. Responsabilidades</h2>
            <p><strong>{COMPANY} compromete-se a:</strong></p>
            <ul>
              <li>Chegar pontualmente ao local de pickup acordado</li>
              <li>Utilizar viaturas limpas, seguras e devidamente licenciadas</li>
              <li>Condutores com licença de transporte de passageiros válida e experiência na ilha</li>
              <li>Monitorização de voos em tempo real (nos transfers de aeroporto)</li>
              <li>Comunicação prévia em caso de atraso ou imprevisto</li>
            </ul>
            <p><strong>{COMPANY} não se responsabiliza por:</strong></p>
            <ul>
              <li>Atrasos causados por tráfego excecional, acidentes ou fechos de estrada</li>
              <li>Objetos pessoais esquecidos na viatura (embora nos esforcemos por devolver)</li>
              <li>Consequências de informações incorretas fornecidas pelo cliente (voo errado, morada errada, etc.)</li>
              <li>Cancelamentos ou alterações de programas turísticos externos (entradas em parques, restaurantes, etc.)</li>
            </ul>
          </section>

          <section id="meteorologia">
            <h2>6. Condições Meteorológicas e Montanha</h2>
            <p>
              A Madeira tem um microclima variável, especialmente nas zonas de altitude. Em caso de condições meteorológicas adversas que impeçam a realização segura de um tour (nevoeiro denso, estradas fechadas, etc.), a {COMPANY} reserva-se o direito de:
            </p>
            <ul>
              <li>Sugerir uma rota ou destino alternativo equivalente</li>
              <li>Reagendar o serviço para uma data mais favorável, sem custos adicionais</li>
              <li>Em última instância, cancelar com reembolso integral</li>
            </ul>
            <p>
              Somos extremamente flexíveis nestas situações — o objetivo é sempre proporcionar a melhor experiência possível.
            </p>
          </section>

          <section id="passageiros">
            <h2>7. Regras para Passageiros</h2>
            <ul>
              <li>O uso de <strong>cinto de segurança é obrigatório</strong> para todos os passageiros</li>
              <li><strong>Crianças</strong> devem ser transportadas em cadeiras/assentos adequados à idade (disponíveis mediante pedido)</li>
              <li>É proibido fumar, incluindo cigarros eletrónicos, dentro das viaturas</li>
              <li>O consumo de álcool durante o serviço é desaconselhado; o condutor reserva-se o direito de recusar o serviço em caso de comportamento inadequado</li>
              <li>Animais de estimação são permitidos mediante informação prévia</li>
              <li>Danos causados à viatura pelo cliente são da responsabilidade do mesmo</li>
            </ul>
          </section>

          <section id="lei">
            <h2>8. Lei Aplicável e Resolução de Litígios</h2>
            <p>
              Os presentes Termos e Condições regem-se pela lei portuguesa. Em caso de litígio, as partes comprometem-se a tentar uma resolução amigável em primeira instância.
            </p>
            <p>
              Em alternativa, pode recorrer à plataforma europeia de resolução de litígios em linha:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              Contacto para reclamações: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou <a href={`https://wa.me/351916326716`}>{PHONE}</a>.
            </p>
          </section>
        </div>
      </div>

      <div className="legal-back container-constrained">
        <Link to="/" className="legal-back-btn">← Voltar ao início</Link>
      </div>
    </div>
  );
}

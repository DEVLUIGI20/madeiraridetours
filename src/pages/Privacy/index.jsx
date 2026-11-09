import { Link } from 'react-router-dom';
import './Privacy.css';

const LAST_UPDATED = '8 de novembro de 2025';
const COMPANY = 'Madeira Ride Tours';
const EMAIL = 'info@madeiraridetours.com';
const PHONE = '+351 916 326 716';
const WEBSITE = 'https://madeiraridetours.com';

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container-constrained">
          <span className="legal-tag">RGPD · Privacidade</span>
          <h1>Política de Privacidade</h1>
          <p className="legal-updated">Última atualização: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="legal-content container-constrained">
        <div className="legal-toc">
          <h3>Índice</h3>
          <ol>
            <li><a href="#responsavel">Responsável pelo Tratamento</a></li>
            <li><a href="#dados">Dados Recolhidos</a></li>
            <li><a href="#finalidades">Finalidades e Base Legal</a></li>
            <li><a href="#retencao">Retenção de Dados</a></li>
            <li><a href="#partilha">Partilha de Dados</a></li>
            <li><a href="#direitos">Os seus Direitos</a></li>
            <li><a href="#cookies">Cookies</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ol>
        </div>

        <div className="legal-body">
          <section id="responsavel">
            <h2>1. Responsável pelo Tratamento de Dados</h2>
            <p>
              <strong>{COMPANY}</strong> é o responsável pelo tratamento dos seus dados pessoais, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento UE 2016/679).
            </p>
            <ul>
              <li><strong>Empresa:</strong> {COMPANY}</li>
              <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><strong>Telefone / WhatsApp:</strong> <a href={`https://wa.me/351916326716`}>{PHONE}</a></li>
              <li><strong>Website:</strong> <a href={WEBSITE} target="_blank" rel="noopener noreferrer">{WEBSITE}</a></li>
              <li><strong>País:</strong> Portugal (União Europeia)</li>
            </ul>
          </section>

          <section id="dados">
            <h2>2. Dados Pessoais Recolhidos</h2>
            <p>Recolhemos apenas os dados estritamente necessários para a prestação dos nossos serviços:</p>
            <table className="legal-table">
              <thead>
                <tr><th>Categoria</th><th>Dados</th><th>Quando</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Identificação</td>
                  <td>Nome completo</td>
                  <td>Formulário de reserva</td>
                </tr>
                <tr>
                  <td>Contacto</td>
                  <td>Email, número de telefone/WhatsApp</td>
                  <td>Formulário de reserva / contacto</td>
                </tr>
                <tr>
                  <td>Reserva</td>
                  <td>Data, hora, local de pickup, número de passageiros</td>
                  <td>Formulário de reserva</td>
                </tr>
                <tr>
                  <td>Pagamento</td>
                  <td>Referência de transação (nunca dados de cartão)</td>
                  <td>Processamento via Stripe</td>
                </tr>
                <tr>
                  <td>Técnicos</td>
                  <td>Endereço IP, browser, páginas visitadas</td>
                  <td>Automaticamente ao usar o website</td>
                </tr>
              </tbody>
            </table>
            <p className="legal-note">
              ⚠️ Nunca recolhemos dados de cartão de crédito/débito diretamente. Os pagamentos são processados de forma segura pela Stripe, Inc., que cumpre o padrão PCI DSS.
            </p>
          </section>

          <section id="finalidades">
            <h2>3. Finalidades e Base Legal</h2>
            <div className="legal-purposes">
              <div className="purpose-card">
                <strong>Execução de contrato</strong>
                <p>Processar a sua reserva, enviar confirmação e voucher, coordenar pickup e serviço contratado.</p>
              </div>
              <div className="purpose-card">
                <strong>Interesse legítimo</strong>
                <p>Gerir o nosso negócio, prevenir fraudes, garantir a segurança do website.</p>
              </div>
              <div className="purpose-card">
                <strong>Obrigação legal</strong>
                <p>Cumprir obrigações fiscais e contabilísticas exigidas pela legislação portuguesa.</p>
              </div>
              <div className="purpose-card">
                <strong>Consentimento</strong>
                <p>Envio de comunicações de marketing e newsletter (apenas se autorizar expressamente).</p>
              </div>
            </div>
          </section>

          <section id="retencao">
            <h2>4. Retenção de Dados</h2>
            <p>Conservamos os seus dados pelo tempo estritamente necessário:</p>
            <ul>
              <li><strong>Dados de reservas:</strong> 5 anos (obrigação legal fiscal — IRS/IRC português)</li>
              <li><strong>Dados de contacto:</strong> 2 anos após o último contacto</li>
              <li><strong>Dados de marketing:</strong> Até revogação do consentimento</li>
              <li><strong>Dados técnicos (logs):</strong> 90 dias</li>
            </ul>
          </section>

          <section id="partilha">
            <h2>5. Partilha de Dados com Terceiros</h2>
            <p>Os seus dados podem ser partilhados com os seguintes subcontratantes, exclusivamente para fins necessários ao serviço:</p>
            <ul>
              <li><strong>Stripe, Inc.</strong> — Processamento seguro de pagamentos online (EUA, cláusulas contratuais padrão UE)</li>
              <li><strong>Supabase, Inc.</strong> — Armazenamento seguro de dados de reservas (servidores UE)</li>
              <li><strong>Resend, Inc.</strong> — Envio de emails transacionais de confirmação</li>
            </ul>
            <p>Não vendemos, alugamos nem partilhamos os seus dados com terceiros para fins de marketing.</p>
          </section>

          <section id="direitos">
            <h2>6. Os seus Direitos (RGPD)</h2>
            <p>Enquanto titular dos dados, tem os seguintes direitos, que pode exercer a qualquer momento:</p>
            <div className="rights-grid">
              <div className="right-item">
                <span className="right-icon">👁️</span>
                <strong>Acesso</strong>
                <p>Solicitar cópia dos dados que temos sobre si.</p>
              </div>
              <div className="right-item">
                <span className="right-icon">✏️</span>
                <strong>Retificação</strong>
                <p>Corrigir dados incorretos ou incompletos.</p>
              </div>
              <div className="right-item">
                <span className="right-icon">🗑️</span>
                <strong>Eliminação</strong>
                <p>Solicitar a eliminação dos seus dados ("direito ao esquecimento").</p>
              </div>
              <div className="right-item">
                <span className="right-icon">⏸️</span>
                <strong>Limitação</strong>
                <p>Limitar o tratamento dos seus dados em determinadas circunstâncias.</p>
              </div>
              <div className="right-item">
                <span className="right-icon">📦</span>
                <strong>Portabilidade</strong>
                <p>Receber os seus dados em formato estruturado e legível por máquina.</p>
              </div>
              <div className="right-item">
                <span className="right-icon">🚫</span>
                <strong>Oposição</strong>
                <p>Opor-se ao tratamento para fins de marketing ou interesse legítimo.</p>
              </div>
            </div>
            <p>
              Para exercer qualquer destes direitos, contacte-nos por email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Responderemos no prazo de 30 dias.
            </p>
            <p>
              Tem também o direito de apresentar queixa à autoridade de controlo portuguesa: <strong>CNPD — Comissão Nacional de Proteção de Dados</strong> (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).
            </p>
          </section>

          <section id="cookies">
            <h2>7. Cookies</h2>
            <p>Este website utiliza um número mínimo de cookies essenciais ao funcionamento:</p>
            <table className="legal-table">
              <thead>
                <tr><th>Cookie</th><th>Finalidade</th><th>Duração</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sessão de autenticação</td>
                  <td>Manter sessão de administrador segura</td>
                  <td>Sessão</td>
                </tr>
                <tr>
                  <td>Preferência de idioma</td>
                  <td>Lembrar idioma selecionado pelo utilizador</td>
                  <td>1 ano</td>
                </tr>
              </tbody>
            </table>
            <p>Não utilizamos cookies de rastreamento, publicidade ou redes sociais de terceiros.</p>
          </section>

          <section id="contacto">
            <h2>8. Contacto</h2>
            <p>
              Para qualquer questão relacionada com a proteção dos seus dados, contacte-nos:
            </p>
            <ul>
              <li>📧 <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>📱 <a href="https://wa.me/351916326716">{PHONE}</a></li>
            </ul>
          </section>
        </div>
      </div>

      <div className="legal-back container-constrained">
        <Link to="/" className="legal-back-btn">← Voltar ao início</Link>
      </div>
    </div>
  );
}

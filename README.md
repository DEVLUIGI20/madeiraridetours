# 🏝 Madeira Ride Tours

Plataforma oficial de reservas, passeios turísticos e transfers privados na Ilha da Madeira.

---

## 🏛 Estrutura do Projeto

```text
madeiraridetours/
├── .github/workflows/          # Pipeline de CI (validação de lint e build no git)
│
├── public/                     # Ficheiros estáticos públicos (favicon, ícones)
│
├── src/
│   ├── assets/                 # Imagens organizadas processadas pelo Vite
│   │   └── images/
│   │       ├── tours/          # Fotos dos passeios turísticos
│   │       └── transfers/      # Fotos dos trilhos e transfers de montanha
│   │
│   ├── components/             # Componentes modulares e reutilizáveis
│   │   ├── common/             # Cards, botões, modais e secções transversais
│   │   └── navigation/         # Navbar, Footer e menus
│   │
│   ├── constants/              # 📌 FONTE ÚNICA DA VERDADE (Catálogos & Config)
│   │   ├── index.js            # Contactos oficiais, WhatsApp, email e rotas
│   │   ├── booking.js          # Estados da reserva, métodos de pagamento
│   │   ├── tours.js            # Catálogo oficial de tours e preços
│   │   ├── transfers.js        # Catálogo de transfers de montanha e aeroporto
│   │   └── translations.js     # Dicionário multi-idioma (PT, EN, DE, FR, ES)
│   │
│   ├── context/                # Estado global da aplicação
│   │   ├── BookingContext.jsx  # Gestão do fluxo da reserva ativa (4 etapas)
│   │   └── LanguageProvider.jsx# Gestor de idioma selecionado
│   │
│   ├── hooks/                  # Custom hooks (ex: useLanguage)
│   │
│   ├── layouts/                # Layouts base (MainLayout e AdminLayout)
│   │
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Home/               # Página inicial
│   │   ├── Tours/              # Listagem de passeios
│   │   ├── Transfers/          # Listagem de transfers
│   │   ├── Booking/            # Fluxo de reserva / Pedido de orçamento
│   │   ├── BookingSuccess/     # Voucher digital do cliente
│   │   ├── BookingCancel/      # Cancelamento amigável
│   │   └── Admin/              # Dashboard do proprietário
│   │
│   ├── routes/
│   │   └── AppRouter.jsx       # Gestão e lazy-loading de todas as rotas
│   │
│   └── utils/
│       └── security.js         # Sanitização de formulários e segurança (XSS)
│
└── supabase/                   # Backend Cloud & Base de Dados
    ├── migrations/             # Esquema SQL (tabelas bookings, customers)
    └── functions/              # Edge Functions (Stripe Checkout & Webhooks)
```

---

## 🛠 Comandos Rápidos

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Verificar qualidade do código
npm run lint

# Compilar para produção
npm run build
```

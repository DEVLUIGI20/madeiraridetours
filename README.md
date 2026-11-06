# Madeira Ride Tours — Tours & Transfers

Arquitetura  **Madeira Ride Tours**

---

## 📁 Estrutura do Projeto

```text
madeiraridetours/
├── public/                     # Ficheiros estáticos públicos
│   ├── images/                 # Imagens públicas estáticas
│   ├── icons/                  # Ícones SVG e assets públicos
│   ├── favicon.svg             # Favicon da aplicação
│   └── icons.svg               # Sprite SVG de ícones existente
│
├── src/
│   ├── assets/                 # Assets processados pelo bundler (Vite)
│   │   ├── images/             # Imagens importáveis no código
│   │   └── icons/              # Ícones importáveis
│   │
│   ├── components/             # Componentes modulares e reutilizáveis
│   │   ├── common/             # Componentes transversais (botões, modais, etc.)
│   │   ├── forms/              # Campos e controlos de formulário
│   │   ├── navigation/         # Menus, cabeçalhos e barras de navegação
│   │   └── booking/            # Componentes específicos do fluxo de reserva
│   │
│   ├── layouts/                # Estruturas base de página (com <Outlet />)
│   │   ├── MainLayout.jsx      # Layout público principal
│   │   └── AdminLayout.jsx     # Layout da área de administração
│   │
│   ├── pages/                  # Páginas da aplicação (rotas)
│   │   ├── Home/               # Página inicial
│   │   ├── Tours/              # Catálogo de tours e passeios
│   │   ├── Transfers/          # Catálogo de transfers
│   │   ├── Booking/            # Fluxo de reserva
│   │   ├── BookingSuccess/     # Confirmação de reserva/pagamento
│   │   ├── BookingCancel/      # Cancelamento/abandono de reserva
│   │   ├── Contact/            # Formulário de contacto e informações
│   │   ├── NotFound/           # Página de erro 404
│   │   └── Admin/              # Painel de controlo administrativo
│   │
│   ├── hooks/                  # Custom React Hooks
│   ├── context/                # Contextos de estado global (auth, cart, etc.)
│   ├── services/               # Camada de comunicação com dados e APIs
│   │   ├── bookingService.js   # Operações de reservas
│   │   ├── paymentService.js   # Integração com checkout e pagamentos
│   │   └── tourService.js      # Consultas de tours e transfers
│   │
│   ├── lib/                    # Inicialização de bibliotecas externas
│   │   ├── supabase.js         # Cliente Supabase (PostgreSQL, Auth)
│   │   └── stripe.js           # Carregador do Stripe SDK para cliente
│   │
│   ├── utils/                  # Funções utilitárias puras
│   ├── constants/              # Constantes da aplicação (rotas, enums)
│   ├── config/                 # Configurações não sensíveis da aplicação
│   ├── routes/
│   │   └── AppRouter.jsx       # Configuração central de rotas (React Router)
│   │
│   ├── App.jsx                 # Componente raiz da aplicação
│   ├── main.jsx                # Ponto de entrada React (DOM)
│   └── index.css               # Estilos base
│
├── supabase/                   # Configuração e código backend Supabase
│   ├── migrations/             # Migrações SQL e esquemas de dados
│   ├── functions/              # Edge Functions (Deno runtime)
│   │   ├── create-checkout/    # Criação segura de sessões Stripe Checkout
│   │   ├── stripe-webhook/     # Webhook para confirmação de pagamentos
│   │   └── manage-bookings/    # Operações protegidas de reservas
│   └── config.toml             # Configuração do Supabase CLI
│
├── .env.example                # Modelo de variáveis de ambiente
├── .gitignore                  # Ficheiros ignorados pelo Git
├── index.html                  # HTML base
├── package.json                # Dependências e scripts
├── vite.config.js              # Configuração do Vite
└── README.md                   # Documentação do projeto
```

---

## ⚙️ Variáveis de Ambiente

Cria um ficheiro `.env` na raiz do projeto com base em `.env.example`:

```bash
cp .env.example .env
```

Configura as tuas variáveis no `.env`:

```env
# Frontend (Variáveis públicas com prefixo VITE_)
VITE_SUPABASE_URL=https://teu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=tua-chave-anonima
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> **Atenção à Segurança:** Chaves secretas como `STRIPE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` nunca devem ser incluídas no frontend nem no ficheiro `.env` do Vite. Essas chaves devem residir exclusivamente nas Supabase Edge Functions (`supabase secrets set`).

---

## 🚀 Como Executar o Projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### 3. Build de produção
```bash
npm run build
```

### 4. Verificar linting
```bash
npm run lint
```

---

## 🔄 Próximos Passos Recomendados

1. **Modelagem de Dados (Supabase):**
   - Criar as tabelas `tours`, `transfers`, `bookings` e `customers` em `supabase/migrations/`.
   - Configurar políticas de RLS (Row Level Security).

2. **Design e UI (Frontend):**
   - Implementar os componentes de navegação em `src/components/navigation/`.
   - Desenvolver o design das páginas públicas em `src/pages/`.

3. **Integração de Pagamentos:**
   - Implementar a função `create-checkout` nas Supabase Edge Functions com a SDK do Stripe.
   - Configurar os webhooks do Stripe apontando para a Edge Function `stripe-webhook`.

-- ============================================================================
-- Madeira Ride Tours — Complete Database Schema (Supabase SQL Editor)
-- Copie e cole este script no SQL Editor do seu projeto Supabase e clique RUN
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Clientes
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Reservas (Bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_ref TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  service_type TEXT NOT NULL, -- 'transfer', 'tour', 'adventure', 'custom'
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT,
  passengers INTEGER NOT NULL DEFAULT 1,
  pickup_location TEXT,
  flight_number TEXT,
  special_notes TEXT,
  total_amount NUMERIC(10, 2) DEFAULT 0.00,
  payment_method TEXT NOT NULL DEFAULT 'stripe_card', -- 'stripe_card', 'paypal', 'cash'
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Datas Bloqueadas (Gestão de Disponibilidade / Férias)
CREATE TABLE IF NOT EXISTS public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Catálogo Dinâmico de Tours
CREATE TABLE IF NOT EXISTS public.tours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL DEFAULT 'island', -- 'island', 'adventure', 'sunset'
  price NUMERIC(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Catálogo Dinâmico de Destinos de Transfer (Rotas & Preços)
CREATE TABLE IF NOT EXISTS public.transfer_destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL, -- 'south-east', 'south-west', 'north-west', 'north-east', 'central'
  subtitle TEXT,
  one_way_price NUMERIC(10, 2) NOT NULL,
  round_trip_price NUMERIC(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_blocked_dates ON public.blocked_dates(date);
CREATE INDEX IF NOT EXISTS idx_destinations_active ON public.transfer_destinations(active);
CREATE INDEX IF NOT EXISTS idx_tours_active ON public.tours(active);

-- 8. Row Level Security (RLS) — Segurança de Dados
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfer_destinations ENABLE ROW LEVEL SECURITY;

-- Leitura Pública para Catálogos e Bloqueios (DROP IF EXISTS evita erros de duplicado)
DROP POLICY IF EXISTS "Allow public read tours" ON public.tours;
DROP POLICY IF EXISTS "Allow public read destinations" ON public.transfer_destinations;
DROP POLICY IF EXISTS "Allow public read blocked_dates" ON public.blocked_dates;
DROP POLICY IF EXISTS "Allow public insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public insert customers" ON public.customers;
DROP POLICY IF EXISTS "Allow admin full bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin full customers" ON public.customers;
DROP POLICY IF EXISTS "Allow admin full blocked_dates" ON public.blocked_dates;
DROP POLICY IF EXISTS "Allow admin full tours" ON public.tours;
DROP POLICY IF EXISTS "Allow admin full destinations" ON public.transfer_destinations;

CREATE POLICY "Allow public read tours" ON public.tours FOR SELECT USING (active = true);
CREATE POLICY "Allow public read destinations" ON public.transfer_destinations FOR SELECT USING (active = true);
CREATE POLICY "Allow public read blocked_dates" ON public.blocked_dates FOR SELECT USING (true);

-- Clientes do Website podem criar reservas (Insert)
CREATE POLICY "Allow public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert customers" ON public.customers FOR INSERT WITH CHECK (true);

-- Admins Autenticados têm Acesso Total
CREATE POLICY "Allow admin full bookings" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full customers" ON public.customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full blocked_dates" ON public.blocked_dates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full tours" ON public.tours FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full destinations" ON public.transfer_destinations FOR ALL USING (auth.role() = 'authenticated');


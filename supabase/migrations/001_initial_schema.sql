-- Schema for Madeira Ride Tours (Supabase PostgreSQL)
-- 001_initial_schema.sql

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create customers table
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create bookings table
create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  booking_ref text unique not null,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text,
  customer_email text,
  customer_phone text,
  service_type text not null,
  service_id text not null,
  service_name text not null,
  booking_date date not null,
  booking_time text,
  passengers integer not null default 1,
  pickup_location text,
  special_notes text,
  total_amount numeric(10, 2) default 0.00,
  payment_method text not null default 'stripe',
  payment_status text not null default 'pending',
  status text not null default 'pending',
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create blocked_dates / capacity table (FASE 2)
create table if not exists public.blocked_dates (
  id uuid primary key default uuid_generate_v4(),
  date date not null unique,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Indexes
create index if not exists idx_bookings_date on public.bookings(booking_date);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_blocked_dates on public.blocked_dates(date);

-- 6. Row Level Security (RLS)
alter table public.customers enable row level security;
alter table public.bookings enable row level security;
alter table public.blocked_dates enable row level security;

-- Public can read blocked dates to know which days are unavailable
create policy "Allow public read access to blocked_dates"
  on public.blocked_dates for select
  using (true);

-- Authenticated admins can manage blocked dates
create policy "Allow admin full access to blocked_dates"
  on public.blocked_dates for all
  using (auth.role() = 'authenticated');

-- Authenticated admins can manage all bookings
create policy "Allow admin full access to bookings"
  on public.bookings for all
  using (auth.role() = 'authenticated');

-- Public can create bookings (via website form or edge function)
create policy "Allow public insert to bookings"
  on public.bookings for insert
  with check (true);


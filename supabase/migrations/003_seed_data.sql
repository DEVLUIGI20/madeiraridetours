-- ============================================================================
-- Seeds: Dados Iniciais para o Supabase (Tours e Destinos de Transfers)
-- Execute no SQL Editor do Supabase após rodar o 002_complete_schema.sql
-- ============================================================================

-- Destinos de Transfers com Preços Oficiais
INSERT INTO public.transfer_destinations (id, name, region, subtitle, one_way_price, round_trip_price, duration, is_popular)
VALUES
  ('funchal', 'Funchal', 'south-east', 'Capital & Hotel Zone', 35, 60, '20 min', true),
  ('canico', 'Caniço / Garajau', 'south-east', 'Reis Magos & Ponta da Oliveira', 30, 50, '15 min', true),
  ('santa-cruz', 'Santa Cruz', 'south-east', 'Near Airport Beach Area', 25, 45, '10 min', false),
  ('machico', 'Machico', 'south-east', 'Sandy Bay & Historic Center', 30, 55, '15 min', true),
  ('camara-de-lobos', 'Câmara de Lobos', 'south-west', 'Fishing Village & Cabo Girão', 45, 80, '30 min', false),
  ('ribeira-brava', 'Ribeira Brava', 'south-west', 'Central South Coast', 50, 90, '35 min', false),
  ('ponta-do-sol', 'Ponta do Sol', 'south-west', 'Sunniest Spot on the Island', 60, 110, '45 min', true),
  ('calheta', 'Calheta', 'south-west', 'Marina, Sand Beach & Resorts', 70, 130, '55 min', true),
  ('paul-do-mar', 'Paul do Mar / Jardim', 'south-west', 'Surfing Coast & Sunsets', 80, 150, '65 min', false),
  ('porto-moniz', 'Porto Moniz', 'north-west', 'Natural Volcanic Pools', 90, 170, '75 min', true),
  ('sao-vicente', 'São Vicente', 'north-west', 'Lava Caves & North Coast', 75, 140, '60 min', false),
  ('santana', 'Santana', 'north-east', 'Traditional Thatched Houses', 60, 110, '45 min', false)
ON CONFLICT (id) DO UPDATE SET
  one_way_price = EXCLUDED.one_way_price,
  round_trip_price = EXCLUDED.round_trip_price;

-- Tours Principais
INSERT INTO public.tours (id, title, subtitle, category, price, duration, highlights, featured)
VALUES
  ('west-tour-porto-moniz', 'West Tour — Porto Moniz & Fanal', 'Câmara de Lobos, Cabo Girão, Fanal & Piscinas Naturais', 'island', 180, '8 horas', ARRAY['Cabo Girão Skywalk', 'Floresta do Fanal', 'Piscinas de Porto Moniz'], true),
  ('east-tour-santana', 'East Tour — Santana & Pico do Areeiro', 'Pico do Areeiro, Ribeiro Frio, Santana & Ponta de São Lourenço', 'island', 180, '8 horas', ARRAY['Pico do Areeiro 1818m', 'Casas de Santana', 'Ponta de São Lourenço'], true),
  ('sunrise-pico-areeiro', 'Sunrise Tour — Pico do Areeiro', 'Nascer do sol acima das nuvens com café e guia local', 'sunset', 140, '4 horas', ARRAY['Pickup de madrugada', 'Nascer do sol a 1818m', 'Vista sobre o Pico Ruivo'], true)
ON CONFLICT (id) DO NOTHING;


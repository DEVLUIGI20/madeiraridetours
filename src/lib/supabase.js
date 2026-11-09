import { createClient } from '@supabase/supabase-js';

// Sanitize URL in case /rest/v1 or trailing slash was appended
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!cleanUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn(
      '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables.'
    );
  }
}

// Safe fallback for client initialization before environment variables are set
export const supabase = createClient(
  cleanUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);



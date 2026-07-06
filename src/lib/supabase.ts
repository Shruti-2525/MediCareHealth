import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Only create the client when env vars exist — otherwise Supabase throws and the whole app crashes.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response_payload: Record<string, unknown> | null;
  status: 'sent' | 'delivered' | 'error';
  created_at: string;
};

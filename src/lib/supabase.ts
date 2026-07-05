import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing — chat history will not persist.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response_payload: Record<string, unknown> | null;
  status: 'sent' | 'delivered' | 'error';
  created_at: string;
};

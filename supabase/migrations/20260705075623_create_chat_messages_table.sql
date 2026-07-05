/*
# Create chat_messages table (single-tenant, no auth)

1. Purpose
   - Stores the conversation between the patient and the MediCare assistant.
   - Each row is one message: either sent by the user ("user") or returned by the n8n webhook ("assistant").
   - The raw webhook response payload is preserved in the response_payload jsonb column so the UI can display exactly what the webhook returned.

2. New Tables
   - chat_messages
     - id (uuid, primary key)
     - role (text, not null) - "user" | "assistant"
     - content (text, not null) - the message text shown in the chat bubble
     - response_payload (jsonb, nullable) - full raw JSON returned by the n8n webhook
     - status (text, not null, default 'sent') - "sent" | "delivered" | "error"
     - created_at (timestamptz, default now())

3. Security
   - Enable RLS on chat_messages.
   - Single-tenant public demo app (no sign-in), so anon + authenticated are allowed full CRUD.

4. Notes
   - Idempotent: uses IF NOT EXISTS and DROP POLICY IF EXISTS so it is safe to re-run.
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  response_payload jsonb,
  status text NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'error')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_chat_messages" ON chat_messages;
CREATE POLICY "anon_update_chat_messages" ON chat_messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chat_messages" ON chat_messages;
CREATE POLICY "anon_delete_chat_messages" ON chat_messages FOR DELETE
  TO anon, authenticated USING (true);
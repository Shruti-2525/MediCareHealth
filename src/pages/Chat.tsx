import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Trash2, AlertCircle, Webhook, RefreshCw } from 'lucide-react';
import { supabase, type ChatMessage } from '../lib/supabase';
import { sendToWebhook, WEBHOOK_URL } from '../lib/webhook';

const SUGGESTIONS = [
  'I want to book a full body checkup',
  'What cardiology services do you offer?',
  'Book an appointment with Dr. Priya Sharma',
  'What are your vaccination packages?',
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function loadMessages() {
    setHistoryLoading(true);
    const { data, error: err } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (err) {
      setError('Could not load chat history.');
    } else if (data && data.length > 0) {
      setMessages(data as ChatMessage[]);
    } else {
      // seed a welcome message
      const welcome = {
        role: 'assistant' as const,
        content:
          "Hi! I'm your MediCare health assistant. Tell me what you need — book a checkup, find a doctor, or ask about our services. I'll send your request to our scheduling system and show you the response.",
        status: 'sent' as const,
      };
      const { data: inserted } = await supabase.from('chat_messages').insert(welcome).select().single();
      if (inserted) setMessages([inserted as ChatMessage]);
    }
    setHistoryLoading(false);
  }

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput('');
    setError(null);
    setLoading(true);

    // 1. persist user message
    const { data: userMsg } = await supabase
      .from('chat_messages')
      .insert({ role: 'user', content, status: 'sent' })
      .select()
      .single();

    if (userMsg) {
      setMessages((prev) => [...prev, userMsg as ChatMessage]);
    }

    // 2. call webhook
    try {
      const res = await sendToWebhook(content);

      // derive a readable summary from the raw response
      const summary = summarizeResponse(res.raw);

      const { data: botMsg } = await supabase
        .from('chat_messages')
        .insert({
          role: 'assistant',
          content: summary,
          response_payload: res.raw as Record<string, unknown>,
          status: 'delivered',
        })
        .select()
        .single();

      if (botMsg) {
        setMessages((prev) => [...prev, botMsg as ChatMessage]);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(`Webhook call failed: ${msg}`);

      const { data: errMsg } = await supabase
        .from('chat_messages')
        .insert({
          role: 'assistant',
          content: `Sorry, I couldn't reach the scheduling service right now. (${msg})`,
          status: 'error',
        })
        .select()
        .single();

      if (errMsg) {
        setMessages((prev) => [...prev, errMsg as ChatMessage]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function clearChat() {
    if (!confirm('Clear all chat history? This cannot be undone.')) return;
    await supabase.from('chat_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    setMessages([]);
    await loadMessages();
  }

  return (
    <div className="animate-fade-in pt-16 sm:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-10">
        <div className="section-container">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft">
              <Bot className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Health Assistant</h1>
              <p className="text-sm text-neutral-500">Chat with our smart scheduling assistant</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs text-neutral-500 ring-1 ring-neutral-200/70">
            <Webhook className="h-3.5 w-3.5 shrink-0 text-primary-500" />
            <span className="truncate font-mono">{WEBHOOK_URL}</span>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section className="section-container pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="card flex h-[70vh] min-h-[520px] flex-col overflow-hidden">
            {/* Messages */}
            <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-neutral-50/50 p-4 sm:p-6">
              {historyLoading ? (
                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Loading conversation...
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        m.role === 'user' ? 'bg-secondary-100 text-secondary-600' : 'bg-primary-600 text-white'
                      }`}
                    >
                      {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </span>

                    <div className={`max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-secondary-600 text-white'
                            : m.status === 'error'
                              ? 'bg-error-50 text-error-700 ring-1 ring-error-100'
                              : 'bg-white text-neutral-700 shadow-soft ring-1 ring-neutral-200/60'
                        }`}
                      >
                        {m.content}
                      </div>

                      <span className="mt-1 block px-1 text-[10px] text-neutral-400">
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-neutral-200/60">
                    <span className="h-2 w-2 rounded-full bg-primary-400 animate-typing" style={{ animationDelay: '0s' }} />
                    <span className="h-2 w-2 rounded-full bg-primary-400 animate-typing" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-2 rounded-full bg-primary-400 animate-typing" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-center gap-2 border-t border-error-100 bg-error-50 px-4 py-2 text-xs text-error-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{error}</span>
              </div>
            )}

            {/* Suggestions */}
            {messages.length <= 1 && !loading && (
              <div className="border-t border-neutral-200/70 bg-white px-4 py-3">
                <p className="mb-2 text-xs font-medium text-neutral-400">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-neutral-200/70 bg-white p-3 sm:p-4">
              <button
                onClick={clearChat}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-error-600"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={loading}
                className="input-field flex-1"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-all hover:bg-primary-700 active:scale-95 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-neutral-400">
            Messages are sent to our scheduling webhook and saved to your chat history.
          </p>
        </div>
      </section>
    </div>
  );
}

function summarizeResponse(raw: unknown): string {
  if (!raw) return 'The scheduling service returned an empty response.';
  if (typeof raw === 'string') return raw;

  const obj = raw as Record<string, unknown>;
  // try common fields
  const candidates = ['message', 'reply', 'response', 'text', 'output', 'result', 'summary'];
  for (const key of candidates) {
    if (typeof obj[key] === 'string') return obj[key] as string;
  }
  // if it's an array, take first item's message
  if (Array.isArray(obj) && obj.length > 0) {
    return summarizeResponse(obj[0]);
  }
  // fallback
  return 'The scheduling service responded, but the message format was not recognized.';
}

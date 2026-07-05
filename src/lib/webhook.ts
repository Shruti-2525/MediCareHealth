export const WEBHOOK_URL = 'https://shrutig99.app.n8n.cloud/webhook-test/api-for-calendar';

export type WebhookResponse = {
  raw: unknown;
  status: number;
  ok: boolean;
};

/**
 * Sends a message to the n8n webhook and returns the raw response.
 * Throws on network failure or non-2xx status.
 */
export async function sendToWebhook(message: string): Promise<WebhookResponse> {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      source: 'medicare-health-portal',
      timestamp: new Date().toISOString(),
    }),
  });

  let raw: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      raw = JSON.parse(text);
    } catch {
      raw = text;
    }
  }

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }

  return { raw, status: response.status, ok: true };
}

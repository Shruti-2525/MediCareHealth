# MediCare Health

A modern healthcare portal with an AI-powered chat assistant for booking appointments, exploring services, and browsing specialist doctors. Built with React, Supabase, and n8n.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## Features

- **Landing page** — Hero section, trust indicators, and quick links to services and chat
- **Services catalog** — Health checkups, cardiology, neurology, pediatrics, and more
- **Doctor profiles** — Specialist listings with ratings, availability, and bios
- **AI chat assistant** — Natural-language scheduling via an n8n webhook integration
- **Persistent chat history** — Messages saved to Supabase (PostgreSQL) and restored on reload
- **Responsive UI** — Mobile-friendly layout with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Lucide icons |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Automation | [n8n](https://n8n.io) webhook for appointment scheduling |
| Routing | Hash-based client router (`#/home`, `#/chat`, etc.) |

---

## How It Works

```
User message
    │
    ▼
React Chat UI ──► Supabase (save user message)
    │
    ▼
n8n Webhook ──► Calendar / scheduling logic
    │
    ▼
React Chat UI ──► Supabase (save assistant reply) ──► Display in chat
```

1. The user sends a message in the chat.
2. The message is stored in Supabase immediately.
3. The app POSTs the message to an n8n webhook.
4. n8n processes the request (e.g. book or reschedule an appointment) and returns JSON.
5. The app extracts a readable reply and saves it as an assistant message in Supabase.

**Note:** Doctors and services are static data defined in `src/data/`. Only chat messages are stored in the database. There is no user authentication — chat history is shared across all visitors (suitable for demos).

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [npm](https://www.npmjs.com/) (included with Node.js)
- A [Supabase](https://supabase.com) project (free tier works)
- An n8n webhook endpoint (or update the URL in `src/lib/webhook.ts`)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/MediCareHealth.git
cd MediCareHealth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL (Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key (Settings → API) |

> **Important:** Never commit `.env` to GitHub. It is already listed in `.gitignore`.

### 4. Set up the database

Run the migration in your Supabase project (SQL Editor or Supabase CLI):

```
supabase/migrations/20260705075623_create_chat_messages_table.sql
```

This creates the `chat_messages` table with Row Level Security policies for anonymous access.

### 5. Configure the webhook (optional)

The default n8n webhook URL is set in `src/lib/webhook.ts`:

```ts
export const WEBHOOK_URL = 'https://your-instance.app.n8n.cloud/webhook/...';
```

Replace it with your own n8n webhook if you are running your own automation workflow.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## Project Structure

```
MediCareHealth/
├── src/
│   ├── components/       # Navbar, Footer
│   ├── data/             # Static doctors and services data
│   ├── lib/
│   │   ├── supabase.ts   # Supabase client & ChatMessage type
│   │   ├── webhook.ts    # n8n webhook integration
│   │   └── router.ts     # Hash-based routing
│   ├── pages/
│   │   ├── Home.tsx      # Landing page
│   │   ├── Services.tsx  # Services listing
│   │   ├── Doctors.tsx   # Doctor profiles
│   │   └── Chat.tsx      # Chat assistant UI
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── migrations/       # Database schema
├── .env.example          # Environment variable template
└── package.json
```

---

## Database Schema

**Table: `chat_messages`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key |
| `role` | `text` | `"user"` or `"assistant"` |
| `content` | `text` | Message shown in the chat bubble |
| `response_payload` | `jsonb` | Raw JSON response from the n8n webhook |
| `status` | `text` | `"sent"`, `"delivered"`, or `"error"` |
| `created_at` | `timestamptz` | Timestamp (default: now) |

---

## Deployment

Build the app for production:

```bash
npm run build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.). Set the same `VITE_SUPABASE_*` environment variables in your hosting provider's dashboard.

---


## Acknowledgments

- [Supabase](https://supabase.com) for the backend database
- [n8n](https://n8n.io) for workflow automation
- [Lucide](https://lucide.dev) for icons
- [Tailwind CSS](https://tailwindcss.com) for styling

---

## 🚀 Live Demo

🌐 **Application:** https://cosmic-palmier-2e2e9e.netlify.app/

**make sure to activate n8n for chat assistant flow**

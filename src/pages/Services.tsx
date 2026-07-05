import { Check, MessageCircle, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import type { Route } from '../lib/router';
import { services } from '../data/services';

export default function Services({ navigate }: { navigate: (r: Route) => void }) {
  const [query, setQuery] = useState('');

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.short.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="animate-fade-in pt-16 sm:pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="section-container relative">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Our Services</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            Healthcare services for every need
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            From preventive checkups to specialized treatments, our team of experts is here to keep you and your family healthy.
          </p>

          <div className="mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services..."
                className="input-field pl-11"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-container py-14">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            No services match "<span className="font-semibold">{query}</span>". Try a different search.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filtered.map((s) => (
              <div key={s.id} className="card p-6 hover:shadow-lg sm:p-8">
                <div className="flex items-start gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${s.color}-100 text-${s.color}-600`}>
                    <s.icon className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-bold text-neutral-900">{s.name}</h3>
                      <span className="shrink-0 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                        {s.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.description}</p>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                          <Check className="h-4 w-4 shrink-0 text-primary-600" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate('chat')}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                    >
                      Book via assistant <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="section-container pb-16">
        <div className="rounded-3xl bg-neutral-900 px-8 py-12 text-center sm:px-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Not sure which service you need?</h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            Our AI health assistant can guide you to the right checkup or specialist.
          </p>
          <button onClick={() => navigate('chat')} className="mt-6 btn-primary">
            <MessageCircle className="h-4 w-4" /> Ask the Assistant
          </button>
        </div>
      </section>
    </div>
  );
}

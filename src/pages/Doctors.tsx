import { Star, Calendar, MessageCircle, Clock } from 'lucide-react';
import type { Route } from '../lib/router';
import { doctors } from '../data/doctors';

export default function Doctors({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="animate-fade-in pt-16 sm:pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary-100/60 blur-3xl" />
        <div className="section-container relative">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Our Doctors</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            Meet our specialist team
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Board-certified, compassionate, and experienced — our doctors are committed to your wellbeing.
          </p>
        </div>
      </section>

      {/* Doctors grid */}
      <section className="section-container py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <div key={d.id} className="card group overflow-hidden hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur">
                  {d.specialty}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur">
                  <Star className="h-3.5 w-3.5 fill-warning-500 text-warning-500" />
                  {d.rating} · {d.reviews}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-neutral-900">{d.name}</h3>
                <p className="text-sm font-medium text-primary-600">{d.specialty}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{d.bio}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="h-3.5 w-3.5 text-primary-500" />
                  {d.availability}
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => navigate('chat')}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    <Calendar className="h-3.5 w-3.5" /> Book
                  </button>
                  <button
                    onClick={() => navigate('chat')}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

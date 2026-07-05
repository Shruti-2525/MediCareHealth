import { ArrowRight, MessageCircle, ShieldCheck, Clock, Star, Users, Activity, HeartPulse, Calendar, Sparkles } from 'lucide-react';
import type { Route } from '../lib/router';
import { services } from '../data/services';
import { doctors } from '../data/doctors';

export default function Home({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 via-white to-white" />
        <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="absolute -left-24 top-40 -z-10 h-80 w-80 rounded-full bg-secondary-100/50 blur-3xl" />

        <div className="section-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold text-primary-700">
              <Sparkles className="h-3.5 w-3.5" /> AI Health Assistant Available 24/7
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Your health, <span className="text-primary-600">in expert hands</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-600">
              Comprehensive health checkups, specialist consultations, and a smart assistant that helps you book appointments — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('chat')} className="btn-primary">
                <MessageCircle className="h-4 w-4" /> Talk to Assistant
              </button>
              <button onClick={() => navigate('services')} className="btn-secondary">
                Explore Services <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary-600" /> NABH Accredited
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-600" /> 24/7 Emergency
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary-600" /> 4.9/5 Rating
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up">
            <div className="relative overflow-hidden rounded-3xl shadow-card ring-1 ring-neutral-200/60">
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Doctor with patient"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-neutral-200/60 sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-100 text-success-600">
                  <HeartPulse className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">50k+</p>
                  <p className="text-xs text-neutral-500">Patients served</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-8 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-neutral-200/60 sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-100 text-secondary-600">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">99.2%</p>
                  <p className="text-xs text-neutral-500">Report accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-neutral-200/70 bg-neutral-50">
        <div className="section-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { icon: Users, value: '50k+', label: 'Happy Patients' },
            { icon: HeartPulse, value: '40+', label: 'Expert Doctors' },
            { icon: ShieldCheck, value: '25+', label: 'Specialties' },
            { icon: Clock, value: '24/7', label: 'Emergency Care' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-soft">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-xs text-neutral-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="section-container py-16 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Our Services</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">Comprehensive care, all under one roof</h2>
          </div>
          <button onClick={() => navigate('services')} className="btn-ghost">
            View all services <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <div
              key={s.id}
              onClick={() => navigate('services')}
              className="group card cursor-pointer p-6 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${s.color}-100 text-${s.color}-600`}>
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-neutral-900">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.short}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-600">{s.price}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-400 transition-colors group-hover:text-primary-600">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors preview */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="section-container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Meet Our Team</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">Experienced doctors, ready to help</h2>
            </div>
            <button onClick={() => navigate('doctors')} className="btn-ghost">
              See all doctors <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.slice(0, 3).map((d) => (
              <div key={d.id} className="card overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-56 overflow-hidden">
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 backdrop-blur">
                    {d.experience}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-neutral-900">{d.name}</h3>
                  <p className="text-sm font-medium text-primary-600">{d.specialty}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-neutral-500">
                    <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                    <span className="font-semibold text-neutral-700">{d.rating}</span>
                    <span>({d.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-14 text-center shadow-card sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <Calendar className="mx-auto h-10 w-10 text-white/90" />
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Book your health checkup today</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-50">
              Chat with our smart assistant to find the right service and schedule your appointment in seconds.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate('chat')} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-soft transition-all hover:bg-primary-50 active:scale-95">
                <MessageCircle className="h-4 w-4" /> Start Chatting
              </button>
              <button onClick={() => navigate('doctors')} className="inline-flex items-center gap-2 rounded-full bg-primary-700/40 px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 transition-all hover:bg-primary-700/60 active:scale-95">
                <Calendar className="h-4 w-4" /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

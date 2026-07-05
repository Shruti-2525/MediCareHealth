import { HeartPulse, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { Route } from '../lib/router';

export default function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="mt-20 bg-neutral-900 text-neutral-300">
      <div className="section-container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                <HeartPulse className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                MediCare<span className="text-primary-400">Health</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Compassionate, comprehensive healthcare for the whole family. Your wellness is our mission.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Full Body Checkup', 'Cardiology', 'Diagnostics', 'Pediatrics', 'Vaccination'].map((s) => (
                <li key={s}>
                  <button onClick={() => navigate('services')} className="text-neutral-400 transition-colors hover:text-primary-400">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Home', route: 'home' as Route },
                { label: 'Our Doctors', route: 'doctors' as Route },
                { label: 'Health Assistant', route: 'chat' as Route },
                { label: 'Book Appointment', route: 'doctors' as Route },
              ].map((l) => (
                <li key={l.label}>
                  <button onClick={() => navigate(l.route)} className="text-neutral-400 transition-colors hover:text-primary-400">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                24 Wellness Avenue, Health District
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                care@medicarehealth.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-primary-400" />
                Open 24/7 · Emergency always
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} MediCareHealth. All rights reserved. · Built with care for healthier lives.
        </div>
      </div>
    </footer>
  );
}

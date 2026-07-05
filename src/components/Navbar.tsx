import { useState, useEffect } from 'react';
import { HeartPulse, Menu, X, MessageCircle, Stethoscope, Calendar } from 'lucide-react';
import type { Route } from '../lib/router';

const links: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Services', route: 'services' },
  { label: 'Doctors', route: 'doctors' },
  { label: 'Assistant', route: 'chat' },
];

export default function Navbar({
  route,
  navigate,
}: {
  route: Route;
  navigate: (r: Route) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between sm:h-20">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft">
            <HeartPulse className="h-5 w-5" />
          </span>
          <span className={`font-display text-lg font-bold sm:text-xl ${scrolled ? 'text-neutral-900' : 'text-neutral-900'}`}>
            MediCare<span className="text-primary-600">Health</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.route}
              onClick={() => go(l.route)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                route === l.route
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={() => go('doctors')} className="btn-ghost">
            <Calendar className="h-4 w-4" /> Book
          </button>
          <button onClick={() => go('chat')} className="btn-primary">
            <MessageCircle className="h-4 w-4" /> Ask Assistant
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.route}
                onClick={() => go(l.route)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium ${
                  route === l.route ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {l.route === 'chat' ? <MessageCircle className="h-4 w-4" /> : <Stethoscope className="h-4 w-4" />}
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

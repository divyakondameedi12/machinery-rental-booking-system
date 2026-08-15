import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS, PHONE_TEL } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Machinery', id: 'machinery' },
  { label: 'Services', id: 'services' },
  { label: 'Booking', id: 'booking' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-50/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={() => go('home')} className="text-left leading-tight">
          <div className={`font-heading text-base font-extrabold tracking-tight sm:text-lg ${scrolled ? 'text-earth-800' : 'text-earth-800'}`}>
            {BUSINESS.name1}
          </div>
          <div className={`font-heading text-base font-extrabold tracking-tight sm:text-lg ${scrolled ? 'text-tractor-600' : 'text-tractor-600'}`}>
            {BUSINESS.name2}
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-earth-700 transition-colors hover:bg-earth-100 hover:text-earth-800"
            >
              {l.label}
            </button>
          ))}
          <a href={PHONE_TEL} className="btn-primary ml-2 !py-2 !px-4">
            <Phone className="h-4 w-4" /> Call
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-earth-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-earth-100 bg-cream-50 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-earth-700 hover:bg-earth-50"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="btn-primary my-2"
            >
              🚜 Book Your Machine
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

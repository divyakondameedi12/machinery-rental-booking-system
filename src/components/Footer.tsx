import { Phone, MessageCircle, MapPin, Tractor } from 'lucide-react';
import { BUSINESS, PHONE_TEL, whatsappLink } from '@/lib/constants';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Machinery', id: 'machinery' },
  { label: 'Book Now', id: 'booking' },
  { label: 'Contact', id: 'contact' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-earth-800 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-heading text-lg font-extrabold text-cream-50">{BUSINESS.name1}</div>
            <div className="font-heading text-lg font-extrabold text-tractor-500">{BUSINESS.name2}</div>
            <p className="mt-3 text-sm text-cream-200/80">
              Proprietor: <span className="font-semibold text-cream-50">{BUSINESS.proprietor}</span>
            </p>
            <div className="mt-3 space-y-2 text-sm text-cream-200/80">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cream-200" /> {BUSINESS.location}
              </p>
              <a href={PHONE_TEL} className="flex items-center gap-2 hover:text-cream-50">
                <Phone className="h-4 w-4 text-cream-200" /> {BUSINESS.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-cream-200">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-cream-200/80 transition-colors hover:text-cream-50"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-cream-200">Our Machinery</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream-200/80">
              <li className="flex items-center gap-2"><Tractor className="h-4 w-4" /> Tractors — ₹800 / Trip</li>
              <li className="flex items-center gap-2"><Tractor className="h-4 w-4" /> JCBs — ₹1,200 / Hour</li>
              <li className="flex items-center gap-2"><Tractor className="h-4 w-4" /> Harvester — ₹2,000 / Hour</li>
            </ul>
            <a
              href={whatsappLink('Hello Kondameedi Ravi, I am interested in booking a machine. Please confirm availability.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-earth-700 pt-6 text-center text-xs text-cream-200/70">
          © {BUSINESS.year} Laxminarasimha Earth Movers & Jai Hanuman Earth Movers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

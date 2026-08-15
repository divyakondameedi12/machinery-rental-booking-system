import { Phone, Calendar, MapPin } from 'lucide-react';
import { BUSINESS, PHONE_TEL, whatsappLink } from '@/lib/constants';

export default function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50" />
      <div className="absolute inset-0 -z-10 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #4A6339 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-earth-100 px-4 py-1.5 text-xs font-semibold text-earth-700">
            <span className="h-2 w-2 rounded-full bg-tractor-500" /> Family-Owned · Kamalapur, Telangana
          </div>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-earth-800 sm:text-5xl md:text-6xl">
            Reliable Machines.
            <br />
            <span className="text-tractor-600">Powerful Service.</span>
            <br />
            Trusted by Our Community.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-earth-600 sm:text-lg">
            Tractors, JCBs &amp; Harvesters available for agricultural work, earth-moving work, construction and other requirements.
          </p>

          <p className="mt-4 text-base font-semibold text-earth-700">
            Book your slot now!
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={PHONE_TEL} className="btn-primary">
              <Phone className="h-5 w-5" /> 📞 Call Now
            </a>
            <button onClick={onBook} className="btn-secondary">
              <Calendar className="h-5 w-5" /> 🚜 Book Your Machine
            </button>
          </div>

          <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-2xl border border-earth-200 bg-white/70 px-6 py-4 text-sm text-earth-700 shadow-sm backdrop-blur">
            <span className="font-semibold text-earth-800">Proprietor: {BUSINESS.proprietor}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-tractor-500" /> {BUSINESS.location}</span>
            <a href={PHONE_TEL} className="flex items-center gap-1.5 font-semibold text-earth-700 hover:text-tractor-600">
              <Phone className="h-4 w-4 text-tractor-500" /> {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* quick stats / machinery strip */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { emoji: '🚜', title: 'Tractors', detail: '3 Available · ₹800 / Trip' },
            { emoji: '🏗️', title: 'JCBs', detail: '2 Available · ₹1,200 / Hour' },
            { emoji: '🌾', title: 'Harvester', detail: '1 Available · ₹2,000 / Hour' },
          ].map((s) => (
            <div key={s.title} className="card flex items-center gap-4 p-5 hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-earth-100 text-2xl">{s.emoji}</div>
              <div>
                <div className="font-heading font-bold text-earth-800">{s.title}</div>
                <div className="text-xs text-earth-600">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

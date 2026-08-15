import { Truck, MapPin, Handshake, PhoneCall, FileText, Hammer, Wheat, Sparkles } from 'lucide-react';
import { BUSINESS, PHONE_TEL, whatsappLink } from '@/lib/constants';

const WHY = [
  { icon: Truck, title: 'Reliable Machinery', text: 'Well-maintained machinery for agricultural and earth-moving requirements.' },
  { icon: Handshake, title: 'Local & Trusted Service', text: 'Serving customers from Kamalapur and nearby villages.' },
  { icon: MapPin, title: 'Service at Your Location', text: 'We can discuss sending the required machine to your village/location.' },
  { icon: PhoneCall, title: 'Direct Contact', text: 'Speak directly with the proprietor for availability and booking.' },
];

const SERVICES = [
  { icon: Wheat, title: 'Agricultural Work', text: 'Ploughing, land preparation and field work with our tractors.' },
  { icon: Hammer, title: 'Earth Moving', text: 'Digging, leveling and site preparation with our JCBs.' },
  { icon: Sparkles, title: 'Harvesting', text: 'Efficient harvesting with our harvester across your fields.' },
  { icon: FileText, title: 'Construction Support', text: 'Machinery support for construction and infrastructure work.' },
];

export default function Services({ onBook }: { onBook: () => void }) {
  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto max-w-xl">Machinery rental for agricultural, earth-moving and construction work.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="card p-6 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-earth-100 text-earth-600">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-earth-800">{s.title}</h3>
              <p className="mt-1 text-sm text-earth-600">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Service area */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-earth-600 to-earth-700 p-8 text-center text-cream-50 sm:p-12">
          <MapPin className="mx-auto h-10 w-10 text-cream-200" />
          <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">We Bring the Machine to You</h3>
          <p className="mt-3 text-lg font-semibold text-cream-100">
            “Mee village ekkadaina sare, mee work ki machine kavali ante memu pampistham.”
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-cream-200/90">
            No matter which village you are in, if you need a machine for your work, contact us and we’ll discuss availability and service.
          </p>
        </div>

        {/* Contracts */}
        <div className="mt-12 grid items-center gap-8 rounded-3xl border border-earth-200 bg-cream-50 p-8 sm:p-12 md:grid-cols-2">
          <div>
            <Handshake className="h-10 w-10 text-tractor-600" />
            <h3 className="mt-4 font-heading text-2xl font-bold text-earth-800">Contracts &amp; Long-Term Work Welcome</h3>
            <p className="mt-3 text-earth-600">
              “Individual bookings aina, agricultural work aina, construction work aina, long-term contracts aina — we are happy to discuss your requirements.”
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-earth-700">
              <PhoneCall className="h-4 w-4 text-tractor-500" /> Contact us for contract and bulk requirements.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <button onClick={onBook} className="btn-primary">Discuss a Contract</button>
            <a
              href={whatsappLink(`Hello ${BUSINESS.proprietor}, I would like to discuss a contract / bulk requirement. Please share details.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              💬 WhatsApp Us
            </a>
            <a href={PHONE_TEL} className="btn-secondary">📞 Call Now</a>
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="section-title">Why Choose Us</h3>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="card p-6 text-center hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-tractor-500/10 text-tractor-600">
                  <w.icon className="h-7 w-7" />
                </div>
                <h4 className="mt-4 font-heading text-base font-bold text-earth-800">{w.title}</h4>
                <p className="mt-2 text-sm text-earth-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

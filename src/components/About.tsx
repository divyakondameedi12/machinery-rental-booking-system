import { Phone, MessageCircle, MapPin, User } from 'lucide-react';
import { BUSINESS, PHONE_TEL, whatsappLink } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="section-title">About Us</h2>
            <p className="section-subtitle">
              A family-owned machinery rental business serving farmers and builders in Kamalapur and nearby villages.
            </p>
            <div className="mt-6 space-y-4 text-earth-700">
              <p>
                <span className="font-heading font-bold text-earth-800">{BUSINESS.name1}</span> and{' '}
                <span className="font-heading font-bold text-tractor-600">{BUSINESS.name2}</span> are operated by the same proprietor,
                <span className="font-semibold"> {BUSINESS.proprietor}</span>, providing tractors, JCBs and a harvester for agricultural work, earth-moving and construction requirements.
              </p>
              <p>
                We take pride in maintaining our machinery well and being available when our community needs work done — from ploughing and harvesting to digging and site preparation.
              </p>
              <p>
                Speak directly with the proprietor to confirm availability and booking details.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-earth-200 bg-white p-4">
                <div className="text-2xl font-extrabold text-earth-800">6</div>
                <div className="text-xs text-earth-600">Machines in fleet</div>
              </div>
              <div className="rounded-xl border border-earth-200 bg-white p-4">
                <div className="text-2xl font-extrabold text-earth-800">3</div>
                <div className="text-xs text-earth-600">Machine types</div>
              </div>
              <div className="rounded-xl border border-earth-200 bg-white p-4">
                <div className="text-2xl font-extrabold text-earth-800">1</div>
                <div className="text-xs text-earth-600">Direct proprietor</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-earth-200 bg-white p-8 shadow-card">
            <h3 className="font-heading text-lg font-bold text-earth-800">Get in Touch</h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-earth-100 text-earth-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-earth-500">Proprietor</div>
                  <div className="font-semibold text-earth-800">{BUSINESS.proprietor}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-earth-100 text-earth-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-earth-500">Location</div>
                  <div className="font-semibold text-earth-800">{BUSINESS.location}</div>
                </div>
              </div>
              <a href={PHONE_TEL} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-cream-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tractor-500/10 text-tractor-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-earth-500">Phone</div>
                  <div className="font-semibold text-earth-800">{BUSINESS.phone}</div>
                </div>
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} className="btn-primary flex-1"><Phone className="h-4 w-4" /> Call Now</a>
              <a
                href={whatsappLink(`Hello ${BUSINESS.proprietor}, I am interested in booking a machine. Please confirm availability.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

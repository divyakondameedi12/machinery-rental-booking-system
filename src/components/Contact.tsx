import { Phone, MessageCircle, MapPin, User } from 'lucide-react';
import { BUSINESS, PHONE_TEL, whatsappLink } from '@/lib/constants';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="section-title">Need a Machine? Just Give Us a Call!</h2>
        <p className="section-subtitle mx-auto">We’re one call away from bringing the right machine to your village.</p>

        <div className="mt-10 rounded-3xl border border-earth-200 bg-cream-50 p-8 shadow-card sm:p-12">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-earth-100 text-earth-600">
                <User className="h-6 w-6" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-earth-500">Proprietor</div>
              <div className="font-semibold text-earth-800">{BUSINESS.proprietor}</div>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-earth-100 text-earth-600">
                <Phone className="h-6 w-6" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-earth-500">Phone</div>
              <a href={PHONE_TEL} className="font-semibold text-earth-800 hover:text-tractor-600">{BUSINESS.phone}</a>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-earth-100 text-earth-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-earth-500">Location</div>
              <div className="font-semibold text-earth-800">{BUSINESS.location}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={PHONE_TEL} className="btn-primary"><Phone className="h-5 w-5" /> 📞 CALL NOW</a>
            <a
              href={whatsappLink(`Hello ${BUSINESS.proprietor}, I am interested in booking a machine. Please confirm availability.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-emerald-600 hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" /> 💬 WHATSAPP US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

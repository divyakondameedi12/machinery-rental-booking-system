import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { PHONE_TEL, whatsappLink } from '@/lib/constants';

export default function MobileBar({ onBook }: { onBook: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-earth-200 bg-cream-50/95 backdrop-blur lg:hidden">
      <a href={PHONE_TEL} className="flex flex-col items-center gap-1 py-2.5 text-earth-700 active:bg-earth-50">
        <Phone className="h-5 w-5 text-tractor-600" />
        <span className="text-xs font-semibold">Call</span>
      </a>
      <a
        href={whatsappLink('Hello Kondameedi Ravi, I am interested in booking a machine. Please confirm availability.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 border-x border-earth-100 py-2.5 text-earth-700 active:bg-earth-50"
      >
        <MessageCircle className="h-5 w-5 text-emerald-600" />
        <span className="text-xs font-semibold">WhatsApp</span>
      </a>
      <button onClick={onBook} className="flex flex-col items-center gap-1 py-2.5 text-earth-700 active:bg-earth-50">
        <Calendar className="h-5 w-5 text-earth-600" />
        <span className="text-xs font-semibold">Book Now</span>
      </button>
    </div>
  );
}

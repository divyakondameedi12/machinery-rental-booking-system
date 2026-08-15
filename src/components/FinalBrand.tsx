import { BUSINESS } from '@/lib/constants';

export default function FinalBrand() {
  return (
    <section className="bg-earth-800 py-14 text-center text-cream-100">
      <div className="mx-auto max-w-3xl px-4">
        <p className="font-heading text-xl font-bold text-cream-50 sm:text-2xl">
          “Mee pani maa responsibility.
          <br />
          Mee avasaram ki tagina machine ni book cheskondi.”
        </p>
        <p className="mt-6 font-heading text-lg font-extrabold text-tractor-500">
          🚜 Book Your Slot Today!
        </p>
        <p className="mt-2 text-sm text-cream-200/80">
          Tractors • JCBs • Harvesters • Agricultural Work • Earth Moving • Contracts
        </p>
        <p className="mt-6 text-xs text-cream-200/60">
          {BUSINESS.name1} &amp; {BUSINESS.name2} · Proprietor: {BUSINESS.proprietor}
        </p>
      </div>
    </section>
  );
}

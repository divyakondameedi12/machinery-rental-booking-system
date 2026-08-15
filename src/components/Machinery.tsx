import { MACHINE_ORDER, MACHINES, formatINR } from '@/lib/constants';
import type { MachineType } from '@/lib/types';

export default function Machinery({ onBook }: { onBook: (m: MachineType) => void }) {
  return (
    <section id="machinery" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="section-title">Our Machinery</h2>
          <p className="section-subtitle mx-auto max-w-xl">Choose the right machine for your work.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {MACHINE_ORDER.map((m) => {
            const machine = MACHINES[m];
            return (
              <div key={m} className="card group overflow-hidden hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
                  <img
                    src={machine.image}
                    alt={machine.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-earth-700 shadow-sm backdrop-blur">
                    {machine.available} Available
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-earth-800">
                    {machine.emoji} {machine.label}
                  </h3>
                  <p className="mt-1 text-sm text-earth-600">{machine.blurb}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-earth-800">₹{formatINR(machine.rate)}</span>
                      <span className="text-sm text-earth-500"> / {machine.unitLabel}</span>
                    </div>
                    <button onClick={() => onBook(m)} className="btn-primary !py-2.5 !px-5">
                      Book {machine.label}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-earth-600 text-white">
              <tr>
                <th className="px-5 py-3 font-semibold">Machine</th>
                <th className="px-5 py-3 font-semibold">Available</th>
                <th className="px-5 py-3 font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-100">
              {MACHINE_ORDER.map((m) => {
                const machine = MACHINES[m];
                return (
                  <tr key={m} className="hover:bg-cream-50">
                    <td className="px-5 py-3 font-semibold text-earth-800">{machine.emoji} {machine.label}</td>
                    <td className="px-5 py-3 text-earth-700">{machine.available}</td>
                    <td className="px-5 py-3 font-semibold text-earth-800">₹{formatINR(machine.rate)} / {machine.unitLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bg-cream-50 px-5 py-3 text-xs text-soil-600">
            Final booking details and availability will be confirmed by the proprietor.
          </div>
        </div>
      </div>
    </section>
  );
}

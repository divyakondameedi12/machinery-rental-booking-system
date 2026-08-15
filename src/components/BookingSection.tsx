import BookingForm from './BookingForm';
import type { MachineType } from '@/lib/types';

export default function BookingSection({
  selectedMachine,
  onMachineChange,
}: {
  selectedMachine: MachineType;
  onMachineChange: (m: MachineType) => void;
}) {
  return (
    <section id="booking" className="bg-gradient-to-b from-cream-100 to-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="section-title">Book Your Machine</h2>
          <p className="section-subtitle mx-auto">
            Fill in your details and the proprietor will call you to confirm availability.
          </p>
        </div>
        <div className="mt-10">
          <BookingForm initialMachine={selectedMachine} onMachineChange={onMachineChange} />
        </div>
      </div>
    </section>
  );
}

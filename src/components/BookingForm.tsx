import { useMemo, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { MACHINES, MACHINE_ORDER, SERVICE_OPTIONS, BUSINESS, PHONE_TEL, formatINR, whatsappLink } from '@/lib/constants';
import type { MachineType, ServiceRequirement } from '@/lib/types';
import { createBooking } from '@/lib/bookingService';

interface Props {
  initialMachine?: MachineType;
  onMachineChange?: (m: MachineType) => void;
}

interface FormState {
  customer_name: string;
  village: string;
  phone: string;
  machine_type: MachineType;
  service_requirement: ServiceRequirement;
  booking_date: string;
  quantity: number;
  additional_requirements: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const todayISO = () => new Date().toISOString().split('T')[0];

export default function BookingForm({ initialMachine = 'tractor', onMachineChange }: Props) {
  const [form, setForm] = useState<FormState>({
    customer_name: '',
    village: '',
    phone: '',
    machine_type: initialMachine,
    service_requirement: 'agricultural_work',
    booking_date: '',
    quantity: 1,
    additional_requirements: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const machine = MACHINES[form.machine_type];
  const unit = machine.unit;
  const unitLabel = machine.unitLabel;

  const estimated = useMemo(() => machine.rate * Math.max(1, Number(form.quantity) || 0), [machine, form.quantity]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onMachine = (m: MachineType) => {
    setForm((f) => ({ ...f, machine_type: m, quantity: 1 }));
    onMachineChange?.(m);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.customer_name.trim().length < 2) e.customer_name = 'Please enter your name (at least 2 characters).';
    if (form.village.trim().length < 2) e.village = 'Please enter your village or location.';
    if (!/^[6-9][0-9]{9}$/.test(form.phone.trim())) e.phone = 'Please enter a valid 10-digit mobile number.';
    if (!form.booking_date) e.booking_date = 'Please choose a date.';
    else if (form.booking_date < todayISO()) e.booking_date = 'Date cannot be in the past.';
    if (!form.quantity || form.quantity < 1) e.quantity = `Enter number of ${unitLabel.toLowerCase()}s (1 or more).`;
    if (form.quantity > 24) e.quantity = `Maximum 24 ${unitLabel.toLowerCase()}s per booking.`;
    if (form.additional_requirements.length > 1000) e.additional_requirements = 'Please keep it under 1000 characters.';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      await createBooking({
        customer_name: form.customer_name,
        village: form.village,
        phone: form.phone,
        machine_type: form.machine_type,
        service_requirement: form.service_requirement,
        booking_date: form.booking_date,
        quantity: Number(form.quantity),
        quantity_unit: unit,
        additional_requirements: form.additional_requirements || null,
        estimated_amount: estimated,
      });
      setSuccess(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setForm({
      customer_name: '',
      village: '',
      phone: '',
      machine_type: form.machine_type,
      service_requirement: 'agricultural_work',
      booking_date: '',
      quantity: 1,
      additional_requirements: '',
    });
  };

  if (success) {
    return (
      <div className="card animate-fade-in p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-earth-800">Booking request submitted successfully!</h3>
        <p className="mt-3 text-earth-600">
          Thank you! <span className="font-semibold text-earth-800">{BUSINESS.proprietor}</span> will contact you shortly to confirm availability and details.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(
              `Hello ${BUSINESS.proprietor}, I just submitted a booking request for a ${MACHINES[form.machine_type].label} on ${form.booking_date}. My village is ${form.village}. Please confirm availability.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary bg-emerald-600 hover:bg-emerald-700"
          >
            💬 Send on WhatsApp
          </a>
          <a href={PHONE_TEL} className="btn-primary">
            <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
          </a>
          <button onClick={reset} className="btn-outline">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="customer_name">Customer Name *</label>
          <input
            id="customer_name"
            type="text"
            value={form.customer_name}
            onChange={(e) => set('customer_name', e.target.value)}
            className="input-field"
            placeholder="Your full name"
            maxLength={100}
          />
          {errors.customer_name && <p className="mt-1 text-xs text-tractor-600">{errors.customer_name}</p>}
        </div>

        <div>
          <label className="label-field" htmlFor="village">Village / Location *</label>
          <input
            id="village"
            type="text"
            value={form.village}
            onChange={(e) => set('village', e.target.value)}
            className="input-field"
            placeholder="Your village or area"
            maxLength={120}
          />
          {errors.village && <p className="mt-1 text-xs text-tractor-600">{errors.village}</p>}
        </div>

        <div>
          <label className="label-field" htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
            className="input-field"
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          {errors.phone && <p className="mt-1 text-xs text-tractor-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="label-field" htmlFor="booking_date">Required Date *</label>
          <input
            id="booking_date"
            type="date"
            min={todayISO()}
            value={form.booking_date}
            onChange={(e) => set('booking_date', e.target.value)}
            className="input-field"
          />
          {errors.booking_date && <p className="mt-1 text-xs text-tractor-600">{errors.booking_date}</p>}
        </div>

        <div>
          <label className="label-field">Machine Required *</label>
          <div className="grid grid-cols-3 gap-2">
            {MACHINE_ORDER.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onMachine(m)}
                className={`rounded-xl border-2 px-2 py-2.5 text-sm font-semibold transition-all ${
                  form.machine_type === m
                    ? 'border-earth-600 bg-earth-600 text-white'
                    : 'border-earth-200 bg-cream-50 text-earth-700 hover:border-earth-400'
                }`}
              >
                {MACHINES[m].emoji} {MACHINES[m].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor="service_requirement">Service Requirement *</label>
          <select
            id="service_requirement"
            value={form.service_requirement}
            onChange={(e) => set('service_requirement', e.target.value as ServiceRequirement)}
            className="input-field"
          >
            {SERVICE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="quantity">
            Number of {unitLabel}s *
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={24}
            value={form.quantity}
            onChange={(e) => set('quantity', Number(e.target.value))}
            className="input-field"
          />
          {errors.quantity && <p className="mt-1 text-xs text-tractor-600">{errors.quantity}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="additional_requirements">Additional Requirements</label>
          <textarea
            id="additional_requirements"
            value={form.additional_requirements}
            onChange={(e) => set('additional_requirements', e.target.value)}
            className="input-field min-h-[96px] resize-y"
            placeholder="Any extra details about the work, land, timing, etc."
            maxLength={1000}
          />
          <p className="mt-1 text-right text-xs text-earth-400">{form.additional_requirements.length}/1000</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-earth-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-earth-700">Estimated Amount</span>
          <span className="text-2xl font-extrabold text-earth-800">₹{formatINR(estimated)}</span>
        </div>
        <p className="mt-1 text-xs text-earth-500">
          {machine.rate.toLocaleString('en-IN')} × {form.quantity || 0} {unitLabel.toLowerCase()}{(Number(form.quantity) || 0) > 1 ? 's' : ''} = ₹{formatINR(estimated)}
        </p>
        <p className="mt-2 text-xs text-soil-600">
          Final booking details and availability will be confirmed by the proprietor.
        </p>
      </div>

      {serverError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Something went wrong while submitting your booking. Please try again or call {BUSINESS.phone}.</span>
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
        ) : (
          'Submit Booking Request'
        )}
      </button>
      <p className="mt-3 text-center text-xs text-earth-500">
        Availability will be confirmed by the proprietor.
      </p>
    </form>
  );
}

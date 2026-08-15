import type { MachineType, ServiceRequirement, BookingStatus } from './types';
import tractorImg from '@/assets/images/tractor1.webp';
import jcbImg from '@/assets/images/jcb1.webp';
import harvesterImg from '@/assets/images/harvester.jpg';

export const BUSINESS = {
  name1: 'LAXMINARASIMHA EARTH MOVERS',
  name2: 'JAI HANUMAN EARTH MOVERS',
  proprietor: 'Kondameedi Ravi',
  phone: '9866901130',
  phoneDisplay: '9866901130',
  location: 'Kamalapur, Telangana',
  year: 2026,
};

export const PHONE_TEL = `tel:${BUSINESS.phone}`;
export const WHATSAPP_NUMBER = '919866901130'; // country code + number

export const MACHINES: Record<
  MachineType,
  { label: string; emoji: string; rate: number; unit: 'trip' | 'hour'; unitLabel: string; available: number; image: string; blurb: string }
> = {
  tractor: {
    label: 'Tractor',
    emoji: '🚜',
    rate: 800,
    unit: 'trip',
    unitLabel: 'Trip',
    available: 3,
    image: tractorImg,
    blurb: 'Reliable tractors for agricultural work, ploughing and hauling.',
  },
  jcb: {
    label: 'JCB',
    emoji: '🏗️',
    rate: 1200,
    unit: 'hour',
    unitLabel: 'Hour',
    available: 2,
    image: jcbImg,
    blurb: 'JCBs for earth-moving, digging and construction work.',
  },
  harvester: {
    label: 'Harvester',
    emoji: '🌾',
    rate: 2000,
    unit: 'hour',
    unitLabel: 'Hour',
    available: 1,
    image: harvesterImg,
    blurb: 'Harvester for harvesting work across fields.',
  },
};

export const MACHINE_ORDER: MachineType[] = ['tractor', 'jcb', 'harvester'];

export const SERVICE_OPTIONS: { value: ServiceRequirement; label: string }[] = [
  { value: 'agricultural_work', label: 'Agricultural Work' },
  { value: 'land_preparation', label: 'Land Preparation' },
  { value: 'harvesting', label: 'Harvesting' },
  { value: 'earth_moving', label: 'Earth Moving' },
  { value: 'construction_work', label: 'Construction Work' },
  { value: 'other', label: 'Other' },
];

export const STATUS_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-earth-100 text-earth-700 border-earth-200',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

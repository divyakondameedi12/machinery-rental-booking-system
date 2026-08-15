export type MachineType = 'tractor' | 'jcb' | 'harvester';
export type ServiceRequirement =
  | 'agricultural_work'
  | 'land_preparation'
  | 'harvesting'
  | 'earth_moving'
  | 'construction_work'
  | 'other';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type QuantityUnit = 'trip' | 'hour';

export interface Booking {
  id: string;
  customer_name: string;
  village: string;
  phone: string;
  machine_type: MachineType;
  service_requirement: ServiceRequirement;
  booking_date: string;
  quantity: number;
  quantity_unit: QuantityUnit;
  additional_requirements: string | null;
  estimated_amount: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface NewBooking {
  customer_name: string;
  village: string;
  phone: string;
  machine_type: MachineType;
  service_requirement: ServiceRequirement;
  booking_date: string;
  quantity: number;
  quantity_unit: QuantityUnit;
  additional_requirements?: string | null;
  estimated_amount: number;
}

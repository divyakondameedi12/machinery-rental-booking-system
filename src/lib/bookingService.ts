import { supabase } from './supabaseClient';
import type { Booking, BookingStatus, NewBooking } from './types';

export async function createBooking(input: NewBooking): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .insert({
      customer_name: input.customer_name.trim(),
      village: input.village.trim(),
      phone: input.phone.trim(),
      machine_type: input.machine_type,
      service_requirement: input.service_requirement,
      booking_date: input.booking_date,
      quantity: input.quantity,
      quantity_unit: input.quantity_unit,
      additional_requirements: input.additional_requirements?.trim() || null,
      estimated_amount: input.estimated_amount,
    });

  if (error) throw error;
}

export interface BookingFilters {
  search?: string;
  machine?: string;
  status?: BookingStatus | 'all';
  date?: string;
}

export async function fetchBookings(filters: BookingFilters = {}): Promise<Booking[]> {
  let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });

  if (filters.machine && filters.machine !== 'all') {
    query = query.eq('machine_type', filters.machine);
  }
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  if (filters.date) {
    query = query.eq('booking_date', filters.date);
  }
  if (filters.search) {
    const term = filters.search.trim();
    if (term) {
      query = query.or(`customer_name.ilike.%${term}%,village.ilike.%${term}%,phone.ilike.%${term}%`);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) throw error;
}

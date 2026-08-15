import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Loader2, Search, Phone, MessageCircle, LogOut, Download, Trash2, ChevronDown, X, Calendar, Filter,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import {
  fetchBookings, updateBookingStatus, deleteBooking, type BookingFilters,
} from '@/lib/bookingService';
import {
  MACHINES, SERVICE_OPTIONS, STATUS_OPTIONS, STATUS_STYLES, formatINR, whatsappLink, BUSINESS,
} from '@/lib/constants';
import type { Booking, BookingStatus, MachineType } from '@/lib/types';

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function machineLabel(m: MachineType): string {
  return MACHINES[m].label;
}

function serviceLabel(value: string): string {
  return SERVICE_OPTIONS.find((s) => s.value === value)?.label ?? value;
}

function fmtDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return d;
  }
}

function fmtDateTime(d: string): string {
  try {
    return new Date(d).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return d;
  }
}

function exportCSV(rows: Booking[]) {
  const headers = [
    'Customer Name', 'Village', 'Phone', 'Machine', 'Service Requirement',
    'Date', 'Trips/Hours', 'Estimated Amount', 'Status', 'Created At',
  ];
  const lines = rows.map((r) => [
    r.customer_name, r.village, r.phone, machineLabel(r.machine_type),
    serviceLabel(r.service_requirement), r.booking_date,
    `${r.quantity} ${r.quantity_unit}${r.quantity > 1 ? 's' : ''}`,
    `Rs. ${r.estimated_amount}`, r.status, r.created_at,
  ].map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [machineFilter, setMachineFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [detail, setDetail] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters: BookingFilters = {
        search: search || undefined,
        machine: machineFilter,
        status: statusFilter,
        date: dateFilter || undefined,
      };
      const data = await fetchBookings(filters);
      setBookings(data);
    } catch {
      setError('Could not load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, machineFilter, statusFilter, dateFilter]);

  useEffect(() => {
    const t = setTimeout(load, 250); // debounce search
    return () => clearTimeout(t);
  }, [load]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const by = (s: BookingStatus) => bookings.filter((b) => b.status === s).length;
    return {
      total,
      pending: by('pending'),
      confirmed: by('confirmed'),
      completed: by('completed'),
      cancelled: by('cancelled'),
      today: bookings.filter((b) => isToday(b.created_at)).length,
    };
  }, [bookings]);

  const handleStatus = async (id: string, status: BookingStatus) => {
    setUpdating(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
      setDetail((d) => (d && d.id === id ? { ...d, status } : d));
    } catch {
      setError('Could not update status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booking? This cannot be undone.')) return;
    try {
      await deleteBooking(id);
      setBookings((bs) => bs.filter((b) => b.id !== id));
      setDetail(null);
    } catch {
      setError('Could not delete booking. Please try again.');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const summaryCards = [
    { label: 'Total Bookings', value: stats.total, color: 'bg-earth-600' },
    { label: "Today's Bookings", value: stats.today, color: 'bg-soil-500' },
    { label: 'Pending', value: stats.pending, color: 'bg-amber-500' },
    { label: 'Confirmed', value: stats.confirmed, color: 'bg-emerald-500' },
    { label: 'Completed', value: stats.completed, color: 'bg-earth-500' },
    { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-earth-200 bg-cream-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <h1 className="font-heading text-lg font-bold text-earth-800">Booking Requests</h1>
            <p className="text-xs text-earth-500">{BUSINESS.proprietor} · Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => exportCSV(bookings)} className="btn-outline !py-2 !px-3 text-xs">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={signOut} className="btn-secondary !py-2 !px-3 text-xs">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* summary */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {summaryCards.map((c) => (
            <div key={c.label} className="card p-4">
              <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${c.color} text-white`}>
                <span className="text-xs font-bold">{c.value}</span>
              </div>
              <div className="text-xs font-semibold text-earth-600">{c.label}</div>
            </div>
          ))}
        </div>

        {/* filters */}
        <div className="mt-6 card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-earth-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, village or phone..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={machineFilter} onChange={(e) => setMachineFilter(e.target.value)} className="input-field !w-auto !py-2.5">
                <option value="all">All Machines</option>
                <option value="tractor">Tractor</option>
                <option value="jcb">JCB</option>
                <option value="harvester">Harvester</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')} className="input-field !w-auto !py-2.5">
                <option value="all">All Status</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="input-field !w-auto !py-2.5" />
              {(search || machineFilter !== 'all' || statusFilter !== 'all' || dateFilter) && (
                <button
                  onClick={() => { setSearch(''); setMachineFilter('all'); setStatusFilter('all'); setDateFilter(''); }}
                  className="btn-outline !py-2.5 !px-3 text-xs"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        {/* table */}
        <div className="mt-6 card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-earth-500">
              <Loader2 className="h-6 w-6 animate-spin" /> <span className="ml-2">Loading bookings...</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-20 text-center text-earth-500">
              <Filter className="mx-auto h-10 w-10 text-earth-300" />
              <p className="mt-3 text-sm">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-earth-600 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Village</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Machine</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Qty</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Est. ₹</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-cream-50">
                      <td className="px-4 py-3 font-semibold text-earth-800">{b.customer_name}</td>
                      <td className="px-4 py-3 text-earth-700">{b.village}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${b.phone}`} className="font-semibold text-earth-700 hover:text-tractor-600">{b.phone}</a>
                      </td>
                      <td className="px-4 py-3 text-earth-700">{MACHINES[b.machine_type].emoji} {machineLabel(b.machine_type)}</td>
                      <td className="px-4 py-3 text-earth-700">{fmtDate(b.booking_date)}</td>
                      <td className="px-4 py-3 text-earth-700">{b.quantity} {b.quantity_unit}{b.quantity > 1 ? 's' : ''}</td>
                      <td className="px-4 py-3 text-earth-700">{serviceLabel(b.service_requirement)}</td>
                      <td className="px-4 py-3 font-semibold text-earth-800">₹{formatINR(b.estimated_amount)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                          {STATUS_OPTIONS.find((s) => s.value === b.status)?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setDetail(b)} className="rounded-lg p-1.5 text-earth-600 hover:bg-earth-100" title="Details">
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <a
                            href={whatsappLink(`Hello ${b.customer_name}, regarding your ${machineLabel(b.machine_type)} booking for ${fmtDate(b.booking_date)}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                          <button onClick={() => handleDelete(b.id)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* detail drawer */}
      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-earth-900/40" onClick={() => setDetail(null)} />
          <div className="relative h-full w-full max-w-md overflow-y-auto bg-cream-50 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-earth-200 bg-cream-50 px-5 py-4">
              <h2 className="font-heading text-lg font-bold text-earth-800">Booking Details</h2>
              <button onClick={() => setDetail(null)} className="rounded-lg p-1.5 text-earth-600 hover:bg-earth-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <DetailRow label="Customer Name" value={detail.customer_name} />
              <DetailRow label="Village / Location" value={detail.village} />
              <DetailRow label="Phone" value={
                <a href={`tel:${detail.phone}`} className="font-semibold text-earth-700 hover:text-tractor-600">{detail.phone}</a>
              } />
              <DetailRow label="Machine" value={`${MACHINES[detail.machine_type].emoji} ${machineLabel(detail.machine_type)}`} />
              <DetailRow label="Service Requirement" value={serviceLabel(detail.service_requirement)} />
              <DetailRow label="Required Date" value={fmtDate(detail.booking_date)} />
              <DetailRow label="Trips / Hours" value={`${detail.quantity} ${detail.quantity_unit}${detail.quantity > 1 ? 's' : ''}`} />
              <DetailRow label="Estimated Amount" value={`₹${formatINR(detail.estimated_amount)}`} />
              <DetailRow label="Additional Requirements" value={detail.additional_requirements || '—'} />
              <DetailRow label="Status" value={
                <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[detail.status]}`}>
                  {STATUS_OPTIONS.find((s) => s.value === detail.status)?.label}
                </span>
              } />
              <DetailRow label="Booking Date/Time" value={fmtDateTime(detail.created_at)} />
              <DetailRow label="Last Updated" value={fmtDateTime(detail.updated_at)} />

              <div className="mt-6">
                <div className="label-field">Change Status</div>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleStatus(detail.id, s.value)}
                      disabled={updating === detail.id || detail.status === s.value}
                      className={`rounded-xl border-2 px-3 py-2 text-xs font-semibold transition-all ${
                        detail.status === s.value
                          ? 'border-earth-600 bg-earth-600 text-white'
                          : 'border-earth-200 bg-white text-earth-700 hover:border-earth-400'
                      } disabled:opacity-50`}
                    >
                      {updating === detail.id ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <a href={`tel:${detail.phone}`} className="btn-primary flex-1 !py-2.5">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href={whatsappLink(`Hello ${detail.customer_name}, regarding your ${machineLabel(detail.machine_type)} booking for ${fmtDate(detail.booking_date)}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 bg-emerald-600 hover:bg-emerald-700 !py-2.5"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>

              <button onClick={() => handleDelete(detail.id)} className="mt-3 w-full rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100">
                <Trash2 className="mr-1 inline h-4 w-4" /> Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-earth-100 py-3">
      <div className="text-xs uppercase tracking-wide text-earth-500">{label}</div>
      <div className="mt-1 font-semibold text-earth-800">{value}</div>
    </div>
  );
}

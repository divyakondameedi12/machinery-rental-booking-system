/*
# Create bookings table for Laxminarasimha & Jai Hanuman Earth Movers

## Purpose
Stores customer machinery rental booking requests (Tractors, JCBs, Harvesters)
for the family-owned agricultural / earth-moving business in Kamalapur, Telangana.

## New Table: bookings
- id              uuid primary key (default gen_random_uuid())
- customer_name   text, not null (2..100 chars enforced by check)
- village         text, not null (2..120 chars)
- phone           text, not null (10-digit Indian mobile, starts 6-9)
- machine_type    text, not null (tractor | jcb | harvester)
- service_requirement text, not null (agricultural_work | land_preparation | harvesting | earth_moving | construction_work | other)
- booking_date    date, not null (the date the customer wants the machine)
- quantity        integer, not null, >= 1, <= 24
- quantity_unit   text, not null (trip | hour)
- additional_requirements text (free-text, capped at 1000 chars)
- estimated_amount integer, not null, >= 0 (calculated client-side, confirmed by proprietor)
- status          text, not null, default 'pending' (pending | confirmed | completed | cancelled)
- created_at      timestamptz, default now()
- updated_at      timestamptz, default now()

## Constraints
- ck_bookings_machine  — machine_type in allowed set
- ck_bookings_service  — service_requirement in allowed set
- ck_bookings_status   — status in allowed set
- ck_bookings_quantity — quantity between 1 and 24
- ck_bookings_phone    — 10 digit Indian mobile number
- ck_bookings_name     — customer_name length 2..100
- ck_bookings_village  — village length 2..120
- ck_bookings_req_len  — additional_requirements <= 1000

## Security (RLS)
- RLS ENABLED.
- INSERT: TO anon, authenticated WITH CHECK (true) — any visitor can submit a booking request.
  (Input shape is enforced by column constraints; the app also validates client-side.)
- SELECT: TO authenticated USING (true) — only signed-in admin can view bookings.
- UPDATE: TO authenticated USING (true) WITH CHECK (true) — only signed-in admin can change status / details.
- DELETE: TO authenticated USING (true) — only signed-in admin can remove a booking.

Public (anon) users CANNOT read, update, or delete bookings — they can only create them.
This keeps customer data private to the proprietor (admin).

## Notes
1. The estimated_amount is an estimate only; final details are confirmed by the proprietor.
2. updated_at is maintained by a trigger so status changes record when they happened.
3. An index on created_at supports the admin dashboard's "today's bookings" and recent-first lists.
4. An index on status supports filtering by status in the admin dashboard.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  village text NOT NULL,
  phone text NOT NULL,
  machine_type text NOT NULL,
  service_requirement text NOT NULL,
  booking_date date NOT NULL,
  quantity integer NOT NULL,
  quantity_unit text NOT NULL,
  additional_requirements text,
  estimated_amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_bookings_machine CHECK (machine_type IN ('tractor','jcb','harvester')),
  CONSTRAINT ck_bookings_service CHECK (service_requirement IN ('agricultural_work','land_preparation','harvesting','earth_moving','construction_work','other')),
  CONSTRAINT ck_bookings_status CHECK (status IN ('pending','confirmed','completed','cancelled')),
  CONSTRAINT ck_bookings_quantity CHECK (quantity >= 1 AND quantity <= 24),
  CONSTRAINT ck_bookings_phone CHECK (phone ~ '^[6-9][0-9]{9}$'),
  CONSTRAINT ck_bookings_name CHECK (length(customer_name) >= 2 AND length(customer_name) <= 100),
  CONSTRAINT ck_bookings_village CHECK (length(village) >= 2 AND length(village) <= 120),
  CONSTRAINT ck_bookings_req_len CHECK (additional_requirements IS NULL OR length(additional_requirements) <= 1000)
);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_machine_type ON bookings (machine_type);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_insert_bookings" ON bookings;
CREATE POLICY "public_can_insert_bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_can_read_bookings" ON bookings;
CREATE POLICY "admin_can_read_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_can_update_bookings" ON bookings;
CREATE POLICY "admin_can_update_bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_can_delete_bookings" ON bookings;
CREATE POLICY "admin_can_delete_bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- updated_at trigger: bump updated_at whenever a row is updated.
CREATE OR REPLACE FUNCTION fn_bookings_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bookings_set_updated_at ON bookings;
CREATE TRIGGER trg_bookings_set_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION fn_bookings_set_updated_at();

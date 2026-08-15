/*
# Fix mutable search_path on fn_bookings_set_updated_at

Hardens the updated_at trigger function by pinning its search_path to the public schema,
clearing the "Function Search Path Mutable" security advisory.

No data changes. No policy changes. No schema changes.
*/

CREATE OR REPLACE FUNCTION fn_bookings_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

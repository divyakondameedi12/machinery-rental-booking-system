# Laxminarasimha Earth Movers & Jai Hanuman Earth Movers

Family-owned agricultural and earth-moving machinery rental business in Kamalapur, Telangana.

**Proprietor:** Kondameedi Ravi · **Phone:** 9866901130

## Features

- Public website (Home, Machinery, Services, Booking, About, Contact)
- Real customer booking system with Supabase database persistence
- Automatic price calculation (Tractor ₹800/trip, JCB ₹1,200/hr, Harvester ₹2,000/hr)
- Secure admin dashboard at `/#admin` (Supabase email/password auth)
- Booking management: search, filter by machine/status/date, status changes, delete
- Summary cards (Total, Today's, Pending, Confirmed, Completed, Cancelled)
- CSV export of booking records
- Click-to-call and WhatsApp click-to-chat
- Mobile responsive with sticky bottom bar (Call / WhatsApp / Book Now)
- Row Level Security: public can only insert bookings; only authenticated admin can read/update/delete

## Environment Variables

Already configured in `.env` (Vite-exposed, safe for frontend):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The service-role key is **never** used in the frontend.

## Admin Account Setup

1. Go to your Supabase project → Authentication → Users → Add user.
2. Enter the admin email and password (e.g. `ravi@example.com`).
3. Ensure **Email confirmation is OFF** (it is by default).
4. Visit `https://your-site/#admin` and sign in.

Only users created in Supabase Auth can access the dashboard. There are no hardcoded credentials.

## Database Setup

The `bookings` table and RLS policies are already applied via migration. To re-apply or inspect, use the Supabase MCP tools. The schema:

- `bookings` table with validation constraints (phone format, machine type, status, quantity range)
- RLS: `anon` can INSERT only; `authenticated` can SELECT/UPDATE/DELETE
- `updated_at` trigger
- Indexes on `created_at`, `status`, `machine_type`

## Production Build

```bash
npm install
npm run build      # outputs to dist/
npm run preview    # local preview of production build
```

## Deployment

This is a static Vite app — deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

1. Set environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` on the host.
2. Build command: `npm run build`
3. Output directory: `dist`
4. SPA fallback: redirect all routes to `index.html` (so `/#admin` works).

## Custom Domain

After deploying, point your domain (e.g. `laxminarasimhaearthmovers.com`) to the deployment URL via your host's domain settings. Update DNS A/CNAME records as instructed by your hosting provider.

## Machinery Images

The three machine photos (tractor, JCB, harvester) are bundled from `src/assets/images/` and referenced in `src/lib/constants.ts`. To replace them, swap the files in that directory and update the imports at the top of `src/lib/constants.ts`.

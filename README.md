# SummitOS Conference Platform MVP

Starter implementation for a conference and event platform using Next.js, JavaScript, Supabase, Clerk, and Tailwind CSS.

## Included

- App architecture and product plan in [`docs/architecture.md`](/Users/nickfearon/Desktop/Conference%20Platform/docs/architecture.md)
- Supabase schema in [`supabase/schema.sql`](/Users/nickfearon/Desktop/Conference%20Platform/supabase/schema.sql)
- Clerk auth wiring and protected routes
- Tailwind-based reusable UI sections
- Core pages for events, organiser dashboard, networking, and community
- Demo data fallbacks so the UI can be reviewed before backend completion

## Project Structure

```text
app/
  api/health
  community
  dashboard
    events
  events
  networking
  sign-in
  sign-up
components/
  community
  dashboard
  events
  layout
  networking
  ui
docs/
lib/
  supabase
supabase/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add Clerk keys and Supabase credentials.

4. Run the app:

```bash
npm run dev
```

5. Apply the database schema in Supabase SQL editor using [`supabase/schema.sql`](/Users/nickfearon/Desktop/Conference%20Platform/supabase/schema.sql).

## Immediate Next Steps

1. Add Clerk webhooks to create `profiles` rows automatically.
2. Replace demo data in `lib/platform-data.js` with live queries and mutations.
3. Add organiser CRUD pages for event creation, ticket editing, and registration management.
4. Integrate payment processing for ticket checkout.

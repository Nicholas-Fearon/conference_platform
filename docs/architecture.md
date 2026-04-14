# Conference Platform MVP Architecture

## Product Goal

Build a conference platform that covers the full attendee lifecycle:

- Before the event: discovery, ticketing, profile completion, matchmaking
- During the event: attendee directory, intros, organiser visibility
- After the event: community threads, sponsor follow-up, retained engagement

## Tech Stack

- Next.js App Router with JavaScript
- Clerk for authentication and session management
- Supabase Postgres for core application data
- Tailwind CSS for UI styling and reusable design primitives

## Production-Minded Architecture

### Frontend

- `app/` contains route-level surfaces for marketing, event pages, dashboard, networking, and community.
- `components/` contains reusable UI sections that can evolve into a component library.
- Server components are used by default for route surfaces and data fetching.
- Clerk middleware protects authenticated routes.

### Backend/Data

- Supabase Postgres stores organiser, attendee, ticketing, networking, and community records.
- Clerk remains the source of truth for auth identity.
- `profiles.clerk_user_id` maps application records to Clerk users.
- Supabase views provide rollups for organiser dashboards.

### Integration Boundaries

- Clerk handles authentication, session state, and user UI.
- Supabase handles relational data, queries, RLS, and dashboard analytics views.
- Optional future payment integration can plug into `registrations` and `ticket_types`.

## Core App Structure

### Routes

- `/` marketing and platform overview
- `/events` event catalogue
- `/events/[slug]` branded public event page
- `/dashboard` organiser dashboard
- `/dashboard/events` organiser event creation and management starter
- `/networking` attendee directory and connection workflows
- `/community` post-event engagement hub
- `/sign-in` and `/sign-up` Clerk auth screens

### Reusable Components

- Layout: app header, footer
- Marketing: section heading, event cards
- Dashboard: organiser KPI shell and workstream cards
- Networking: attendee directory cards and discovery surface
- Community: recap feed and cohort sidebar

## Data Model

### Core Entities

- `profiles`: all users mapped from Clerk
- `user_roles`: platform admin, organiser, attendee, sponsor, optionally scoped to an event
- `events`: event metadata and brand configuration
- `ticket_types`: sellable ticket inventory
- `registrations`: attendee registration records
- `attendee_preferences`: networking intent and discovery attributes
- `connection_requests`: attendee-to-attendee networking
- `community_channels`, `community_posts`, `community_replies`: post-event engagement

### Insights Layer

- `organiser_event_insights` view provides registration and engagement rollups for organiser dashboards

## User Roles

- `platform_admin`: manages the full platform and all events
- `organiser`: creates and manages events, ticketing, attendee insights, and branding
- `attendee`: registers, creates a profile, discovers others, joins networking and community
- `sponsor`: can have scoped access to sponsor follow-up and audience lead views later

## MVP Scope

### In Scope

- Event CRUD starter structure
- Public branded event pages
- Ticket type modelling and registration data model
- Clerk auth and protected organiser/attendee routes
- Attendee profiles and searchable discovery UI
- Basic attendee networking requests
- Organiser dashboard with rollup metrics
- Community feed for post-event engagement

### Out of Scope for MVP

- Full payment checkout
- Rich messaging or live chat
- Native mobile app
- Complex recommendation engine
- Session-level agenda builder
- Sponsor CRM sync

## Build Phases

### Phase 1

- Project scaffold
- Clerk integration
- Supabase schema
- Public event pages

### Phase 2

- Event management CRUD
- Ticket configuration
- Registration flow
- Profile onboarding

### Phase 3

- Attendee directory
- Networking requests
- Organiser insights dashboard

### Phase 4

- Community hub
- Event recap workflows
- Sponsor follow-up
- Analytics refinement

## Suggested Next Backend Steps

1. Add Clerk webhook handling to sync `profiles` on user create/update.
2. Implement server actions or API routes for event CRUD and registration mutations.
3. Add role-aware RLS policies for organisers, attendees, and sponsors.
4. Replace demo data in `lib/platform-data.js` with live Supabase queries per route.

create extension if not exists "pgcrypto";

create type public.user_role as enum ('platform_admin', 'organiser', 'attendee', 'sponsor');
create type public.event_status as enum ('draft', 'published', 'on_sale', 'sold_out', 'completed');
create type public.registration_status as enum ('pending', 'confirmed', 'cancelled', 'refunded', 'waitlisted');
create type public.connection_status as enum ('pending', 'accepted', 'declined');
create type public.community_post_type as enum ('announcement', 'discussion', 'resource', 'sponsor_followup');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text not null unique,
  full_name text,
  avatar_url text,
  headline text,
  company_name text,
  job_title text,
  city text,
  country text,
  bio text,
  interests text[] default '{}',
  networking_goals text[] default '{}',
  linkedin_url text,
  website_url text,
  profile_completion_score int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.user_role not null,
  event_id uuid,
  created_at timestamptz not null default now(),
  unique (profile_id, role, event_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  organiser_profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text not null unique,
  category text not null,
  status public.event_status not null default 'draft',
  short_description text not null,
  long_description text,
  city text,
  country text,
  venue_name text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  timezone text not null default 'UTC',
  capacity int,
  cover_image_url text,
  brand_primary_color text default '#0f172a',
  brand_secondary_color text default '#d97706',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_roles
  add constraint user_roles_event_id_fkey
  foreign key (event_id) references public.events(id) on delete cascade;

create table public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  description text,
  price_cents int not null,
  currency text not null default 'GBP',
  quantity_total int,
  quantity_sold int not null default 0,
  is_public boolean not null default true,
  sales_start_at timestamptz,
  sales_end_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  ticket_type_id uuid references public.ticket_types(id) on delete set null,
  attendee_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.registration_status not null default 'pending',
  amount_paid_cents int not null default 0,
  currency text not null default 'GBP',
  checked_in_at timestamptz,
  created_at timestamptz not null default now(),
  unique (event_id, attendee_profile_id)
);

create table public.attendee_preferences (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  attendee_profile_id uuid not null references public.profiles(id) on delete cascade,
  open_to_networking boolean not null default true,
  looking_for text[] default '{}',
  can_help_with text[] default '{}',
  availability_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, attendee_profile_id)
);

create table public.connection_requests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  requester_profile_id uuid not null references public.profiles(id) on delete cascade,
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.connection_status not null default 'pending',
  message text,
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  check (requester_profile_id <> recipient_profile_id)
);

create table public.community_channels (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  is_private boolean not null default false,
  created_at timestamptz not null default now(),
  unique (event_id, slug)
);

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.community_channels(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id) on delete cascade,
  post_type public.community_post_type not null default 'discussion',
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.community_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create view public.organiser_event_insights as
select
  e.id as event_id,
  e.name,
  count(distinct r.id) as registration_count,
  count(distinct case when r.status = 'confirmed' then r.id end) as confirmed_count,
  count(distinct case when ap.open_to_networking then ap.attendee_profile_id end) as networking_opt_in_count,
  avg(p.profile_completion_score)::numeric(5,2) as avg_profile_completion_score
from public.events e
left join public.registrations r on r.event_id = e.id
left join public.attendee_preferences ap on ap.event_id = e.id
left join public.profiles p on p.id = r.attendee_profile_id
group by e.id, e.name;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.registrations enable row level security;
alter table public.attendee_preferences enable row level security;
alter table public.connection_requests enable row level security;
alter table public.community_channels enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_replies enable row level security;

create policy "Public can view published events"
on public.events
for select
using (status in ('published', 'on_sale', 'sold_out', 'completed'));

create policy "Users can view own profile"
on public.profiles
for select
using (true);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.jwt() ->> 'sub' = clerk_user_id);

create policy "Attendees can view confirmed registrations in same event"
on public.registrations
for select
using (true);

create policy "Attendees can manage own preferences"
on public.attendee_preferences
for all
using (
  attendee_profile_id in (
    select id from public.profiles where clerk_user_id = auth.jwt() ->> 'sub'
  )
);

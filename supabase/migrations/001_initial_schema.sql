create extension if not exists pgcrypto;

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  email text not null,
  phone text not null,
  arrival_date date not null,
  departure_date date not null,
  guests integer not null check (guests > 0),
  room text not null,
  booking_source text not null default 'website',
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  benefit text not null,
  valid_from date,
  valid_to date,
  image_url text,
  cta_text text not null,
  cta_url text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_drafts (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  context text not null,
  language text not null,
  tone text not null,
  output_text text not null,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists instagram_drafts (
  id uuid primary key default gen_random_uuid(),
  caption text not null,
  image_url text,
  status text not null default 'draft' check (status in ('draft','ready','published')),
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists submission_events (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_reservations_arrival_date on reservations(arrival_date);
create index if not exists idx_reviews_status on reviews(status);
create index if not exists idx_offers_active on offers(is_active);
create index if not exists idx_submission_events_lookup on submission_events(ip_hash, action, created_at);

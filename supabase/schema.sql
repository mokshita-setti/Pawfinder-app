-- ─── USERS TABLE ──────────────────────────────────────────────────────────────
-- Extends Supabase Auth users with extra profile fields
create table if not exists public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null,
  email         text not null,
  phone         text,
  address       text,
  emergency_contact text,
  created_at    timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can view own profile"
  on public.users for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert with check (auth.uid() = id);

-- ─── PETS TABLE ───────────────────────────────────────────────────────────────
create table if not exists public.pets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id) on delete cascade,
  pet_id        text unique not null,   -- e.g. PF-847291
  qr_code_url   text,
  pet_name      text not null,
  species       text not null default 'Dog',
  breed         text,
  age           text,
  weight        text,
  photo_url     text,
  medical_info  text,
  notes         text,
  status        text not null default 'safe' check (status in ('safe', 'missing')),
  created_at    timestamptz default now()
);

alter table public.pets enable row level security;

create policy "Owners can manage own pets"
  on public.pets for all using (auth.uid() = user_id);

-- Public read for QR scan (anyone can view a pet profile)
create policy "Anyone can view pet profiles"
  on public.pets for select using (true);

-- ─── REPORTS TABLE ────────────────────────────────────────────────────────────
create table if not exists public.reports (
  id            uuid primary key default gen_random_uuid(),
  pet_id        uuid not null references public.pets(id) on delete cascade,
  finder_name   text not null,
  finder_phone  text not null,
  location_found text not null,
  notes         text,
  injury_status text,
  photo_url     text,
  created_at    timestamptz default now()
);

alter table public.reports enable row level security;

-- Anyone can submit a report (no account needed)
create policy "Anyone can submit a report"
  on public.reports for insert with check (true);

-- Only the pet owner can view reports for their pet
create policy "Pet owners can view reports"
  on public.reports for select
  using (
    exists (
      select 1 from public.pets
      where pets.id = reports.pet_id
        and pets.user_id = auth.uid()
    )
  );

-- ─── AUTO-CREATE USER PROFILE ON SIGNUP ──────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── UNIQUE PET ID GENERATOR ──────────────────────────────────────────────────
create or replace function public.generate_pet_id()
returns text as $$
declare
  new_id text;
begin
  loop
    new_id := 'PF-' || floor(random() * 900000 + 100000)::text;
    exit when not exists (select 1 from public.pets where pet_id = new_id);
  end loop;
  return new_id;
end;
$$ language plpgsql;

begin;
create table public.client_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  phone text check (phone is null or char_length(phone) <= 30),
  company text check (company is null or char_length(company) <= 160),
  project text not null check (char_length(btrim(project)) between 10 and 5000),
  consent boolean not null check (consent = true),
  consent_version text not null default 'contact-v1' check (consent_version = 'contact-v1'),
  created_at timestamptz not null default now(),
  status text not null default 'nuevo' check (status in ('nuevo','contactado','en_propuesta','cerrado'))
);
create index client_inquiries_created_at_idx on public.client_inquiries (created_at desc);
alter table public.client_inquiries enable row level security;
revoke all on public.client_inquiries from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert (id,name,email,phone,company,project,consent) on public.client_inquiries to anon, authenticated;
create policy "Visitors can submit inquiries only"
  on public.client_inquiries for insert to anon, authenticated
  with check (consent = true and status = 'nuevo' and consent_version = 'contact-v1');
comment on table public.client_inquiries is 'Consultas comerciales. Lectura y gestión exclusivamente desde el panel autorizado de Supabase.';
commit;


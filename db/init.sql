create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text not null,
  price integer not null check (price >= 0),
  color text not null,
  composition text not null default '100% хлопок',
  density text not null default '210 г/м²',
  description text not null default '',
  images text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into products (slug, name, short_name, price, color, description, images, status)
values
  ('two-strangers-black', 'Футболка NUIT Two Strangers — Black', 'Two Strangers — Black', 2222, 'Черный', '', array['/images/product-black-front.jpeg','/images/product-black-back.jpeg','/images/walk-black.jpeg','/images/sunset-close.jpeg'], 'published'),
  ('two-strangers-white', 'Футболка NUIT Two Strangers — White', 'Two Strangers — White', 2222, 'Белый', '', array['/images/product-white-front.jpeg','/images/product-white-back.jpeg','/images/walk-white.jpeg','/images/white-back.jpeg'], 'published')
on conflict (slug) do nothing;

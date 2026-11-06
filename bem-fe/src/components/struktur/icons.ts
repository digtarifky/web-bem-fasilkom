// src/components/struktur/icons.ts
// Peta nama ikon (string di src/data/struktur.ts) → komponen lucide-react.
// Ikon dirender statis di file .astro (tanpa client:*), jadi 0 KB JS di browser.
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Award,
  BrainCog,
  FlaskConical,
  Gavel,
  Globe,
  Handshake,
  HeartHandshake,
  Megaphone,
  Network,
  Palette,
  Share2,
  ShieldCheck,
  Store,
  Trophy,
} from 'lucide-react';

export const ICONS = {
  ArrowRight,
  Award,
  BrainCog,
  FlaskConical,
  Gavel,
  Globe,
  Handshake,
  HeartHandshake,
  Megaphone,
  Network,
  Palette,
  Share2,
  ShieldCheck,
  Store,
  Trophy,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

/** Ambil komponen ikon dari nama. Nama yang tidak terdaftar menggagalkan build agar typo cepat ketahuan. */
export const getIcon = (name: string): LucideIcon => {
  const icon = (ICONS as Record<string, LucideIcon>)[name];
  if (!icon) {
    throw new Error(`[struktur/icons] Ikon "${name}" belum terdaftar di ICONS (src/components/struktur/icons.ts).`);
  }
  return icon;
};

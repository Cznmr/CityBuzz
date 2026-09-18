"use client";

import React, { useState } from "react";
import { Search, MapPin, ArrowRight, Sparkles, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// ─── Static stats ─────────────────────────────────────────────────────────────

const stats = [
  { value: "50+",  label: "Active Events" },
  { value: "12K+", label: "People Discovering" },
  { value: "8",    label: "Categories" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/events?q=${encodeURIComponent(query.trim())}`;
    } else {
      window.location.href = "/events";
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-label="Hero — Discover what's happening in Nizamabad"
    >
      {/* ── Subtle background grid / texture ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.06) 0%, transparent 60%), " +
            "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%)",
        }}
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #111827 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-6 max-w-xl">

            {/* Eyebrow pill */}
            <div className="flex">
              <span className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 text-sm font-semibold text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                Now live in Nizamabad, Telangana
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.25rem] font-black leading-[1.1] tracking-tight text-ink">
              Discover What&apos;s{" "}
              <span className="text-brand-500">Happening</span>{" "}
              in Nizamabad
            </h1>

            {/* Supporting text */}
            <p className="text-lg text-ink-muted leading-relaxed max-w-lg">
              Find events, activities, workshops, sports, cultural programs and
              local experiences — all in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center gap-2 bg-white border border-border-strong rounded-2xl p-2 shadow-card-lg focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
                <Search className="ml-2 h-5 w-5 text-ink-subtle shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events, activities, places..."
                  className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none py-1 min-w-0"
                  aria-label="Search events"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick category pills */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-ink-muted text-sm font-medium">Popular:</span>
              {["Cultural", "Sports", "Workshop", "Technology", "Music"].map((cat) => (
                <a
                  key={cat}
                  href={`/events?category=${cat}`}
                  className="px-3 py-1 rounded-full border border-border text-ink-secondary hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50 text-xs font-medium transition-all duration-150"
                >
                  {cat}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                href="/events"
                rightIcon={<Calendar className="h-4 w-4" />}
              >
                Explore Events
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/explore"
                rightIcon={<MapPin className="h-4 w-4" />}
              >
                Explore Nizamabad
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-2 border-t border-border">
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-ink">{s.value}</span>
                    <span className="text-xs text-ink-muted">{s.label}</span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-border" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Right: visual card stack ── */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Background decorative circles */}
            <div
              className="absolute h-[420px] w-[420px] rounded-full border border-brand-100 opacity-60"
              aria-hidden="true"
            />
            <div
              className="absolute h-[320px] w-[320px] rounded-full bg-brand-50"
              aria-hidden="true"
            />

            {/* Main event showcase card */}
            <div className="relative z-10 bg-white rounded-3xl shadow-card-lg border border-border p-0 overflow-hidden w-[320px]">
              {/* Event image */}
              <div
                className="h-44 bg-gradient-to-br from-brand-400 to-brand-600 flex items-end p-4"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10 flex items-center gap-2">
                  <Badge bgClass="bg-white/20 backdrop-blur-sm" textClass="text-white">
                    Cultural
                  </Badge>
                  <Badge bgClass="bg-brand-500/90" textClass="text-white">
                    Today
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ink text-sm leading-snug mb-1.5">
                  Nizamabad Kuchipudi Cultural Evening
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-3">
                  <MapPin className="h-3 w-3 text-brand-400" />
                  Town Hall Auditorium · 6:30 PM
                </div>
                <div className="flex items-center justify-between">
                  <Badge bgClass="bg-blue-100" textClass="text-blue-700" dot>
                    Free Entry
                  </Badge>
                  <span className="text-xs font-semibold text-brand-500">View →</span>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="absolute -top-2 -right-4 z-20 bg-white rounded-2xl shadow-card-lg border border-border p-3 flex items-center gap-2.5 w-[180px]">
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-lg">🏏</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink leading-tight">Inter-College Cricket</p>
                <p className="text-[10px] text-ink-muted mt-0.5">Sep 21 · Nizamabad Stadium</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 z-20 bg-white rounded-2xl shadow-card-lg border border-border p-3 flex items-center gap-2.5 w-[190px]">
              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-lg">🎵</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink leading-tight">Guitar Open Mic Night</p>
                <p className="text-[10px] text-ink-muted mt-0.5">Sep 25 · The Brew Yard</p>
              </div>
            </div>

            {/* Attending count bubble */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-8 z-20 bg-brand-500 text-white rounded-2xl shadow-lg px-3 py-2 text-center">
              <p className="text-lg font-black leading-none">1.2K</p>
              <p className="text-[10px] font-medium opacity-80">Attending</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-surface-secondary" aria-hidden="true"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />
    </section>
  );
}

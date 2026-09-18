"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, Calendar, Clock, MapPin,
  ArrowRight, BadgeCheck, Flame,
} from "lucide-react";
import type { Event } from "@/lib/types";
import { getFeaturedEvents, getTodaysEvents } from "@/lib/services/eventService";
import { formatDate, formatTimeRange, getCategoryColors, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBannerEvents(): Event[] {
  const todayFeatured = getTodaysEvents().filter((e) => e.isFeatured);
  const upcomingFeatured = getFeaturedEvents().filter((e) => !e.isToday);
  const combined = [...todayFeatured, ...upcomingFeatured];
  // deduplicate by id, cap at 4 slides
  const seen = new Set<string>();
  const result: Event[] = [];
  for (const e of combined) {
    if (!seen.has(e.id)) { seen.add(e.id); result.push(e); }
    if (result.length >= 4) break;
  }
  return result;
}

const AUTO_INTERVAL = 5000; // ms

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedEventsBanner() {
  const events = getBannerEvents();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = events.length;

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((idx + count) % count);
        setTransitioning(false);
      }, 180);
    },
    [current, count, transitioning]
  );

  const next = useCallback(() => goTo((current + 1) % count), [current, count, goTo]);
  const prev = useCallback(() => goTo((current - 1 + count) % count), [current, count, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, count]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  if (!events.length) return null;

  const event = events[current];
  const catColors = getCategoryColors(event.category);
  const isToday = Boolean(event.isToday);

  return (
    <section
      className="relative w-full overflow-hidden bg-ink"
      aria-label="Featured events"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Background image ── */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          transitioning ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      >
        <Image
          src={event.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Multi-layer gradient for strong text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div
        className={cn(
          "relative z-10 transition-all duration-300",
          transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-2xl flex flex-col gap-5">

            {/* Status pill */}
            <div className="flex flex-wrap items-center gap-2">
              {isToday ? (
                <span className="inline-flex items-center gap-1.5 bg-red-600/95 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wide backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  HAPPENING TODAY
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  <Flame className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                  FEATURED EVENT
                </span>
              )}
              {event.isVerified && (
                <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Verified Event
                </span>
              )}
            </div>

            {/* Category */}
            <div>
              <Badge bgClass={catColors.bg} textClass={catColors.text} size="md">
                {event.category}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {event.title}
            </h2>

            {/* Description */}
            <p className="text-white/75 text-base md:text-lg leading-relaxed line-clamp-2 max-w-xl">
              {event.description}
            </p>

            {/* Event meta row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-300 shrink-0" aria-hidden="true" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-300 shrink-0" aria-hidden="true" />
                {formatTimeRange(event.startTime, event.endTime)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-300 shrink-0" aria-hidden="true" />
                {event.venue}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                href={`/events/${event.id}`}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                View Event
              </Button>
              {event.registrationRequired && (
                <Button
                  variant="outline"
                  size="lg"
                  href={`/events/${event.id}`}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next controls ── */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous event"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/25 transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next event"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/25 transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* ── Bottom bar: dots + slide counter ── */}
      {count > 1 && (
        <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-3">
          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {events.map((e, i) => (
              <button
                key={e.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}: ${e.title}`}
                onClick={() => goTo(i)}
                className={cn(
                  "transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
                  i === current
                    ? "w-6 h-2 bg-brand-500"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-white/50 text-xs font-medium tabular-nums ml-1">
            {current + 1} / {count}
          </span>
        </div>
      )}

      {/* ── Progress bar ── */}
      {!paused && count > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20" aria-hidden="true">
          <div
            key={current}
            className="h-full bg-brand-500 origin-left"
            style={{
              animation: `progressBar ${AUTO_INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Inline keyframes for progress bar */}
      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

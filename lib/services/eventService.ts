/**
 * CityBuzz Event Service Layer
 *
 * All event data access goes through this module.
 * To replace mock data with a real backend (Firebase / Supabase / REST API),
 * only change the implementations here — UI components stay untouched.
 *
 * Pattern:
 *   Phase 2 → returns from in-memory mock array
 *   Phase 3 → swap body of each function with an async fetch / Firestore query
 */

import { getAllEvents } from "@/lib/data/events";
import type { Event, FilterState, SortOption, DateFilter, EventTypeFilter } from "@/lib/types";

// ─── Date helpers ─────────────────────────────────────────────────────────────

function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseDate(iso: string): Date {
  const d = new Date(iso + "T00:00:00");
  d.setHours(0, 0, 0, 0);
  return d;
}

function dayOfWeek(d: Date): number { return d.getDay(); } // 0=Sun … 6=Sat

function startOfWeek(ref: Date): Date {
  const d = new Date(ref);
  d.setDate(d.getDate() - dayOfWeek(d));
  return d;
}

function endOfWeek(ref: Date): Date {
  const d = new Date(ref);
  d.setDate(d.getDate() + (6 - dayOfWeek(d)));
  return d;
}

function startOfMonth(ref: Date): Date {
  return new Date(ref.getFullYear(), ref.getMonth(), 1);
}

function endOfMonth(ref: Date): Date {
  return new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function inRange(d: Date, from: Date, to: Date): boolean {
  return d >= from && d <= to;
}

// ─── Core fetchers ────────────────────────────────────────────────────────────

/** Return all events (replace body with API call in Phase 3). */
export function getEvents(): Event[] {
  return getAllEvents();
}

/** Return a single event by id or slug. */
export function getEventById(id: string): Event | undefined {
  return getAllEvents().find((e) => e.id === id || e.slug === id);
}

/** Return all featured events. */
export function getFeaturedEvents(): Event[] {
  return getAllEvents()
    .filter((e) => e.isFeatured)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
}

/** Return today's events (date matches today). */
export function getTodaysEvents(): Event[] {
  const t = today();
  return getAllEvents().filter((e) => isSameDay(parseDate(e.date), t));
}

/** Return future events (date strictly after today), sorted soonest first. */
export function getUpcomingEvents(limit?: number): Event[] {
  const t = today();
  const result = getAllEvents()
    .filter((e) => parseDate(e.date) > t)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
  return limit ? result.slice(0, limit) : result;
}

/** Return events by category. */
export function getEventsByCategory(category: string): Event[] {
  if (!category || category === "All") return getAllEvents();
  return getAllEvents().filter((e) => e.category === category);
}

// ─── Search ───────────────────────────────────────────────────────────────────

/**
 * Client-side full-text search across title, description, category,
 * venue, address, organizer and tags.
 */
export function searchEvents(events: Event[], query: string): Event[] {
  const q = query.trim().toLowerCase();
  if (!q) return events;
  return events.filter((e) => {
    const haystack = [
      e.title,
      e.description,
      e.category,
      e.venue,
      e.address,
      e.city,
      e.locality ?? "",
      e.organizer,
      ...(e.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

// ─── Date filter ──────────────────────────────────────────────────────────────

export function applyDateFilter(events: Event[], filter: DateFilter): Event[] {
  if (filter === "all") return events;
  const t = today();

  switch (filter) {
    case "today":
      return events.filter((e) => isSameDay(parseDate(e.date), t));

    case "tomorrow": {
      const tom = new Date(t);
      tom.setDate(t.getDate() + 1);
      return events.filter((e) => isSameDay(parseDate(e.date), tom));
    }

    case "this-week":
      return events.filter((e) =>
        inRange(parseDate(e.date), startOfWeek(t), endOfWeek(t))
      );

    case "this-weekend": {
      const sat = new Date(t);
      sat.setDate(t.getDate() + ((6 - dayOfWeek(t) + 7) % 7));
      const sun = new Date(sat);
      sun.setDate(sat.getDate() + 1);
      return events.filter((e) => {
        const d = parseDate(e.date);
        return isSameDay(d, sat) || isSameDay(d, sun);
      });
    }

    case "this-month":
      return events.filter((e) =>
        inRange(parseDate(e.date), startOfMonth(t), endOfMonth(t))
      );

    default:
      return events;
  }
}

// ─── Type filter ──────────────────────────────────────────────────────────────

export function applyTypeFilter(
  events: Event[],
  type: EventTypeFilter
): Event[] {
  switch (type) {
    case "free":
      return events.filter((e) => e.isFree);
    case "paid":
      return events.filter((e) => !e.isFree);
    case "registration-required":
      return events.filter((e) => e.registrationRequired);
    default:
      return events;
  }
}

// ─── Location filter ──────────────────────────────────────────────────────────

export function applyLocationFilter(
  events: Event[],
  location: string
): Event[] {
  if (!location || location === "all") return events;
  const loc = location.toLowerCase();
  return events.filter(
    (e) =>
      e.locality?.toLowerCase().includes(loc) ||
      e.venue.toLowerCase().includes(loc) ||
      e.address.toLowerCase().includes(loc)
  );
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

export function sortEvents(events: Event[], sort: SortOption): Event[] {
  const arr = [...events];
  switch (sort) {
    case "soonest":
      return arr.sort(
        (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
      );
    case "latest":
      return arr.sort(
        (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
      );
    case "popular":
      return arr.sort(
        (a, b) => (b.registrationCount ?? 0) - (a.registrationCount ?? 0)
      );
    case "recently-added":
      return arr.sort(
        (a, b) =>
          parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
      );
    default:
      return arr;
  }
}

// ─── Combined filter pipeline ─────────────────────────────────────────────────

/**
 * Single entry-point: apply all filter + sort dimensions in order.
 * UI components call this one function.
 */
export function filterEvents(state: FilterState): Event[] {
  let result = getEvents();

  if (state.query)                       result = searchEvents(result, state.query);
  if (state.category && state.category !== "All") {
    result = result.filter((e) => e.category === state.category);
  }
  if (state.dateFilter !== "all")        result = applyDateFilter(result, state.dateFilter);
  if (state.eventType !== "all")         result = applyTypeFilter(result, state.eventType);
  if (state.location && state.location !== "all") {
    result = applyLocationFilter(result, state.location);
  }
  result = sortEvents(result, state.sort);

  return result;
}

// ─── Utility exports ──────────────────────────────────────────────────────────

/** List of unique localities in the dataset (for location filter dropdown). */
export function getLocalities(): string[] {
  const set = new Set<string>();
  getAllEvents().forEach((e) => {
    if (e.locality) set.add(e.locality);
  });
  return Array.from(set).sort();
}

/** Default/reset filter state. */
export const DEFAULT_FILTERS: FilterState = {
  query: "",
  category: "All",
  dateFilter: "all",
  eventType: "all",
  location: "all",
  sort: "soonest",
};


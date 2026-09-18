/**
 * CityBuzz AI Context Service
 *
 * Prepares grounded, compact context for Gemini using the existing
 * CityBuzz Event Service and Explore dataset.
 *
 * Ensures the AI operates on 100% real Nizamabad event data, conserving
 * tokens and strictly preventing hallucinations.
 */

import {
  getEvents,
  getEventById,
  getTodaysEvents,
  getUpcomingEvents,
  getFeaturedEvents,
  getEventsByCategory,
  applyDateFilter,
  searchEvents,
} from "@/lib/services/eventService";
import { explorePlaces } from "@/lib/data/explore";
import type { Event, EventCategory } from "@/lib/types";

export interface UserContext {
  interests?: string[];
  city?: string;
  locality?: string;
  name?: string;
}

export interface GroundedContextResult {
  relevantEvents: Event[];
  contextPrompt: string;
}

const CATEGORIES: EventCategory[] = [
  "Cultural",
  "Sports",
  "Workshop",
  "Education",
  "Technology",
  "Music",
  "Competition",
  "Community",
  "Business",
];

/**
 * Identify relevant events and assemble a compact, token-efficient
 * context block for Gemini based on the user's inquiry and profile.
 */
export function buildCityBuzzContext(
  userQuery: string,
  userContext?: UserContext
): GroundedContextResult {
  const query = (userQuery || "").toLowerCase();
  const allEvents = getEvents();
  let matchedEvents: Event[] = [];

  // 1. Check Date-based intents
  if (query.includes("today") || query.includes("tonight") || query.includes("happening now")) {
    matchedEvents = getTodaysEvents();
    if (matchedEvents.length === 0) {
      // If no events strictly today, include upcoming soonest
      matchedEvents = getUpcomingEvents(3);
    }
  } else if (query.includes("tomorrow")) {
    matchedEvents = applyDateFilter(allEvents, "tomorrow");
  } else if (query.includes("weekend") || query.includes("saturday") || query.includes("sunday")) {
    matchedEvents = applyDateFilter(allEvents, "this-weekend");
  } else if (query.includes("this week") || query.includes("week")) {
    matchedEvents = applyDateFilter(allEvents, "this-week");
  } else if (query.includes("this month") || query.includes("month")) {
    matchedEvents = applyDateFilter(allEvents, "this-month");
  }

  // 2. Check Category-based intents
  for (const cat of CATEGORIES) {
    const catLower = cat.toLowerCase();
    if (
      query.includes(catLower) ||
      (cat === "Technology" && (query.includes("tech") || query.includes("coding") || query.includes("ai ") || query.includes("software") || query.includes("flutter") || query.includes("developer"))) ||
      (cat === "Cultural" && (query.includes("culture") || query.includes("dance") || query.includes("heritage") || query.includes("tradition") || query.includes("festival") || query.includes("diwali") || query.includes("kuchipudi"))) ||
      (cat === "Sports" && (query.includes("sport") || query.includes("cricket") || query.includes("football") || query.includes("badminton") || query.includes("tournament") || query.includes("match"))) ||
      (cat === "Competition" && (query.includes("contest") || query.includes("championship") || query.includes("prize") || query.includes("chess") || query.includes("hackathon"))) ||
      (cat === "Workshop" && (query.includes("learn") || query.includes("hands-on") || query.includes("training") || query.includes("seminar") || query.includes("class"))) ||
      (cat === "Education" && (query.includes("exam") || query.includes("study") || query.includes("school") || query.includes("college") || query.includes("career"))) ||
      (cat === "Music" && (query.includes("sing") || query.includes("concert") || query.includes("band") || query.includes("song")))
    ) {
      const catEvents = getEventsByCategory(cat);
      matchedEvents = Array.from(new Set([...matchedEvents, ...catEvents]));
    }
  }

  // 3. Free filter intent
  if (query.includes("free") && matchedEvents.length > 0) {
    const freeEvents = matchedEvents.filter((e) => e.isFree);
    if (freeEvents.length > 0) matchedEvents = freeEvents;
  } else if (query.includes("free") && matchedEvents.length === 0) {
    matchedEvents = allEvents.filter((e) => e.isFree).slice(0, 6);
  }

  // 4. Keyword search if no matches yet
  if (matchedEvents.length === 0 && query.trim()) {
    const searchResults = searchEvents(allEvents, query);
    if (searchResults.length > 0) {
      matchedEvents = searchResults.slice(0, 6);
    }
  }

  // 5. If user context has interests and matched is still empty
  if (matchedEvents.length === 0 && userContext?.interests && userContext.interests.length > 0) {
    for (const interest of userContext.interests) {
      const matching = getEventsByCategory(interest);
      matchedEvents.push(...matching);
    }
  }

  // 6. Default fallback: Provide featured & upcoming events
  if (matchedEvents.length === 0) {
    const featured = getFeaturedEvents();
    const upcoming = getUpcomingEvents(8);
    matchedEvents = Array.from(new Set([...featured, ...upcoming])).slice(0, 10);
  }

  // Limit to max 12 events to stay very free-tier token friendly
  const selectedEvents = matchedEvents.slice(0, 12);

  // Build compact text representation
  const eventSummaries = selectedEvents.map((e) => {
    return `- [ID: ${e.id}] "${e.title}" | Category: ${e.category} | Date: ${e.date} (${e.startTime} - ${e.endTime}) | Venue: ${e.venue}, ${e.locality || e.city} | Cost: ${e.isFree ? "Free" : "Paid"} | Status: ${e.registrationStatus} | Summary: ${e.description}`;
  }).join("\n");

  // Build explore landmarks text
  const exploreSummaries = explorePlaces.map((p) => {
    return `- ${p.title} (${p.category}): ${p.description}`;
  }).join("\n");

  let userContextStr = "";
  if (userContext) {
    const parts = [];
    if (userContext.name) parts.push(`Name: ${userContext.name}`);
    if (userContext.city) parts.push(`City: ${userContext.city}`);
    if (userContext.locality) parts.push(`Locality: ${userContext.locality}`);
    if (userContext.interests?.length) parts.push(`Interests: ${userContext.interests.join(", ")}`);
    if (parts.length > 0) {
      userContextStr = `\nUser Profile Context:\n${parts.join(" | ")}\n`;
    }
  }

  const contextPrompt = `
=== CURRENT CITYBUZZ DATA (NIZAMABAD) ===
${userContextStr}
Relevant CityBuzz Events (${selectedEvents.length} events loaded):
${eventSummaries || "No matching events currently scheduled in CityBuzz database."}

Nizamabad Places & Activities:
${exploreSummaries}
=========================================
`;

  return {
    relevantEvents: selectedEvents,
    contextPrompt,
  };
}

/**
 * Resolve event IDs back to full Event objects from CityBuzz service
 */
export function resolveEventIds(ids: string[]): Event[] {
  if (!ids || !Array.isArray(ids)) return [];
  const events: Event[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    const cleanId = id.trim();
    const event = getEventById(cleanId);
    if (event) {
      events.push(event);
      seen.add(event.id);
    }
  }

  return events;
}

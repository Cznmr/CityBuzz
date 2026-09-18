/**
 * CityBuzz Recommendation Engine — Phase 3
 *
 * Transparent, rule-based recommendation algorithm scoring events
 * against a user's chosen interests, locality, and event characteristics.
 */

import type { Event } from "@/lib/types";
import type { UserProfile } from "@/lib/types/user";

export interface ScoredEvent {
  event: Event;
  score: number;
  reasons: string[];
  primaryReason: string;
}

function isWithinDays(dateStr: string, days: number): boolean {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + "T00:00:00");
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= days;
  } catch {
    return false;
  }
}

/**
 * Calculates a relevance score and explanations for a single event based on user profile.
 */
export function scoreEvent(event: Event, user: UserProfile | null): ScoredEvent {
  let score = 0;
  const reasons: string[] = [];

  const interests = user?.interests ?? [];
  const userLocality = user?.locality?.trim().toLowerCase() ?? "";

  // 1. Category / Interest match (+50)
  const categoryMatched = interests.some(
    (int) => int.toLowerCase() === event.category.toLowerCase()
  );

  if (categoryMatched) {
    score += 50;
    reasons.push(`Recommended because you follow ${event.category}`);
  }

  // 2. Tag match (+15)
  if (event.tags && event.tags.length > 0) {
    const tagMatch = event.tags.find((tag) =>
      interests.some((int) => int.toLowerCase() === tag.toLowerCase())
    );
    if (tagMatch && !categoryMatched) {
      score += 15;
      reasons.push(`Matches your interest in ${tagMatch}`);
    }
  }

  // 3. Same locality match (+20)
  if (
    userLocality &&
    userLocality !== "other area in nizamabad" &&
    event.locality &&
    event.locality.toLowerCase() === userLocality
  ) {
    score += 20;
    reasons.push(`Happening in your area (${event.locality})`);
  }

  // 4. Featured status (+10)
  if (event.isFeatured) {
    score += 10;
    if (reasons.length === 0) {
      reasons.push("Featured CityBuzz highlight");
    }
  }

  // 5. Popularity / high interest (+10)
  if (event.registrationCount && event.registrationCount >= 100) {
    score += 10;
    if (reasons.length === 0) {
      reasons.push(`Popular in Nizamabad (${event.registrationCount}+ interested)`);
    }
  }

  // 6. Upcoming soon (within 7 days) (+10)
  if (isWithinDays(event.date, 7)) {
    score += 10;
    if (reasons.length === 0) {
      reasons.push("Happening in the next 7 days");
    }
  }

  // Fallback explanation if no explicit criteria triggered a reason
  if (reasons.length === 0) {
    reasons.push("Popular event in Nizamabad");
  }

  return {
    event,
    score,
    reasons,
    primaryReason: reasons[0],
  };
}

/**
 * Returns prioritized events matching user preferences, sorted highest score first.
 */
export function getPersonalizedRecommendations(
  events: Event[],
  user: UserProfile | null,
  limit = 6
): ScoredEvent[] {
  const scored = events.map((event) => scoreEvent(event, user));

  // Sort descending by score; if tied, sort by earliest date
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.event.date).getTime() - new Date(b.event.date).getTime();
  });

  return scored.slice(0, limit);
}

// ─── Event Types ─────────────────────────────────────────────────────────────

export type EventCategory =
  | "Cultural"
  | "Sports"
  | "Workshop"
  | "Education"
  | "Technology"
  | "Music"
  | "Competition"
  | "Community"
  | "Business";

export type RegistrationStatus = "Open" | "Closing Soon" | "Full" | "Free";

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  description: string;
  longDescription?: string;
  highlights?: string[];
  image: string;

  // Date & time
  date: string;       // ISO date  "2026-09-28"
  startTime: string;  // "10:00"
  endTime: string;    // "16:00"

  // Location
  venue: string;
  address: string;
  city: string;
  locality?: string;
  latitude?: number;
  longitude?: number;

  // Organizer
  organizer: string;
  organizerLogo?: string;

  // Status flags
  isFeatured: boolean;
  isVerified: boolean;
  isFree: boolean;
  isToday?: boolean;   // derived helper — set in data file

  // Registration
  registrationStatus: RegistrationStatus;
  registrationRequired: boolean;
  registrationUrl?: string;

  // Capacity & popularity
  capacity?: number;
  registrationCount?: number;
  attendeeCount?: number;

  // Tags
  tags?: string[];
  createdAt: string; // ISO date
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export type DateFilter =
  | "all"
  | "today"
  | "tomorrow"
  | "this-week"
  | "this-weekend"
  | "this-month";

export type EventTypeFilter = "all" | "free" | "paid" | "registration-required";

export type SortOption =
  | "soonest"
  | "latest"
  | "popular"
  | "recently-added";

export interface FilterState {
  query: string;
  category: string;        // "All" or a specific EventCategory
  dateFilter: DateFilter;
  eventType: EventTypeFilter;
  location: string;        // "all" or locality string
  sort: SortOption;
}

// ─── Place / Explore Types ────────────────────────────────────────────────────

export type PlaceCategory =
  | "Places to Visit"
  | "Food & Restaurants"
  | "Local Businesses"
  | "Activities";

export interface Place {
  id: string;
  title: string;
  category: PlaceCategory;
  description: string;
  image: string;
  icon: string;
}

// ─── Category UI Types ────────────────────────────────────────────────────────

export interface CategoryItem {
  label: EventCategory;
  icon: string;
  color: string;
  textColor: string;
}

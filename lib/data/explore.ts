import type { Place } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Mock explore / city discovery data — replace with API in Phase 2
// ─────────────────────────────────────────────────────────────────────────────

export const explorePlaces: Place[] = [
  {
    id: "place-001",
    title: "Places to Visit",
    category: "Places to Visit",
    description:
      "Discover Nizamabad's historic forts, the stunning Sriramsagar reservoir, Nizamabad Fort, Alisagar Deer Park and more beautiful landmarks.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    icon: "MapPin",
  },
  {
    id: "place-002",
    title: "Food & Restaurants",
    category: "Food & Restaurants",
    description:
      "From authentic Nizamabad biryani to street-side mirchi bajji and traditional Telangana thalis — find the best eateries in the city.",
    image: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?w=600&q=80",
    icon: "UtensilsCrossed",
  },
  {
    id: "place-003",
    title: "Local Businesses",
    category: "Local Businesses",
    description:
      "Support Nizamabad's local economy. Discover shops, service providers, artisans and entrepreneurs that make the city thrive.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    icon: "Store",
  },
  {
    id: "place-004",
    title: "Activities",
    category: "Activities",
    description:
      "From boating at Sriramsagar and trekking near Nizamabad hills to sports complexes and adventure parks — find things to do every day.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    icon: "Zap",
  },
];

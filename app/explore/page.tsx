import type { Metadata } from "next";
import { MapPin, Star, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import ExploreCard from "@/components/ui/ExploreCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { explorePlaces } from "@/lib/data/explore";

export const metadata: Metadata = {
  title: "Explore Nizamabad",
  description:
    "Discover places to visit, food & restaurants, local businesses and activities in Nizamabad.",
};

const highlights = [
  { name: "Nizamabad Fort", type: "Historic Site", rating: "4.5", open: "9am – 5pm" },
  { name: "Sriramsagar Reservoir", type: "Natural Attraction", rating: "4.7", open: "All day" },
  { name: "Alisagar Deer Park", type: "Park & Nature", rating: "4.3", open: "8am – 6pm" },
  { name: "Nimmanapalli Market", type: "Local Market", rating: "4.4", open: "7am – 9pm" },
  { name: "Nizamabad Turmeric Market", type: "Agriculture Hub", rating: "4.6", open: "6am – 2pm" },
  { name: "Pocharam Wildlife Sanctuary", type: "Wildlife", rating: "4.5", open: "6am – 6pm" },
];

export default function ExplorePage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="cb-container">
          <Badge variant="category" size="md" className="mb-4">
            <MapPin className="h-3.5 w-3.5 inline -mt-0.5 mr-1" />
            City Discovery
          </Badge>
          <h1 className="text-display-md md:text-display-lg font-bold text-ink leading-tight mb-3">
            Explore Nizamabad
          </h1>
          <p className="text-body-lg text-ink-muted max-w-xl">
            Discover places, local experiences, restaurants and activities across
            the city. Your complete guide to Nizamabad.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted bg-white border border-border rounded-full px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-400" />
              Full city guide — coming soon
            </span>
          </div>
        </div>
      </div>

      {/* ── Categories grid ── */}
      <Section className="bg-white pt-10 pb-6">
        <h2 className="text-display-sm font-bold text-ink mb-8">Explore by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {explorePlaces.map((place) => (
            <ExploreCard key={place.id} place={place} />
          ))}
        </div>
        <p className="text-sm text-ink-muted text-center mt-2">
          More categories and listings coming as CityBuzz expands.
        </p>
      </Section>

      {/* ── Highlights ── */}
      <Section className="bg-surface-secondary pt-4 pb-16">
        <h2 className="text-display-sm font-bold text-ink mb-2">Nizamabad Highlights</h2>
        <p className="text-body-md text-ink-muted mb-8">Popular places locals love.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((place) => (
            <div
              key={place.name}
              className="bg-white rounded-2xl border border-border shadow-card p-5 hover:shadow-card-hover transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-ink group-hover:text-brand-500 transition-colors mb-1">
                    {place.name}
                  </h3>
                  <p className="text-xs text-ink-muted">{place.type}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 rounded-lg px-2 py-1 shrink-0">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold text-yellow-700">{place.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-ink-muted">
                <Clock className="h-3 w-3 text-brand-400" />
                <span>{place.open}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="primary" size="lg" href="/events">
            Discover Events Instead →
          </Button>
        </div>
      </Section>
    </>
  );
}

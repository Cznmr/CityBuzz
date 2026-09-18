import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import ExploreCard from "@/components/ui/ExploreCard";
import Button from "@/components/ui/Button";
import { explorePlaces } from "@/lib/data/explore";

export default function ExploreSection() {
  return (
    <Section id="explore" className="bg-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <p className="text-label-md uppercase tracking-widest text-brand-500 mb-2">
            City Discovery
          </p>
          <h2 className="text-display-sm md:text-display-md font-bold text-ink leading-tight">
            Explore Nizamabad{" "}
            <span className="text-ink-muted font-normal">Beyond Events</span>
          </h2>
          <p className="mt-3 text-body-lg text-ink-muted leading-relaxed">
            Discover places, local experiences, businesses and activities
            across Nizamabad. CityBuzz is growing into your complete city guide.
          </p>

          {/* Coming soon pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Places", "Food", "Businesses", "Activities"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-tertiary rounded-full text-xs font-medium text-ink-muted border border-border"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ink-disabled" />
                {item}
                <span className="text-[9px] uppercase tracking-wide text-ink-subtle font-semibold bg-ink-disabled/20 px-1 rounded">
                  Soon
                </span>
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          href="/explore"
          rightIcon={<MapPin className="h-4 w-4" />}
          className="shrink-0 self-start lg:self-auto"
        >
          Explore Nizamabad
        </Button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {explorePlaces.map((place) => (
          <ExploreCard key={place.id} place={place} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center mt-8 text-body-sm text-ink-muted">
        Event discovery is live now. More city features coming soon.
      </p>
    </Section>
  );
}

import React from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import EventCard from "@/components/ui/EventCard";
import Button from "@/components/ui/Button";
import { getUpcomingEvents } from "@/lib/services/eventService";

export default function UpcomingEventsSection() {
  // Show first 6 upcoming events on homepage
  const upcomingEvents = getUpcomingEvents().slice(0, 6);

  return (
    <Section id="upcoming" className="bg-surface-secondary">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <SectionHeader
          eyebrow="Coming Up"
          title="Upcoming Events"
          subtitle="Plan ahead — register early and never miss a moment."
          className="mb-0"
        />
        <a
          href="/events"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          View all events <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Featured event — full width */}
      {upcomingEvents[0] && (
        <div className="mb-6">
          <EventCard event={upcomingEvents[0]} variant="featured" />
        </div>
      )}

      {/* Compact list for remaining */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {upcomingEvents.slice(1).map((event) => (
          <EventCard key={event.id} event={event} variant="compact" />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          size="lg"
          href="/events"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          View All Events
        </Button>
      </div>
    </Section>
  );
}

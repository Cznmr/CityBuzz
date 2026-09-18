import React from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Section } from "@/components/ui/Section";
import EventCard from "@/components/ui/EventCard";
import { getTodaysEvents } from "@/lib/services/eventService";

export default function HappeningTodaySection() {
  const todayEvents = getTodaysEvents();

  return (
    <Section id="today" className="bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-label-md uppercase tracking-widest text-brand-500">Today</span>
            <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Flame className="h-3 w-3" fill="currentColor" /> Live
            </span>
          </div>
          <h2 className="text-display-sm md:text-display-md font-bold text-ink leading-tight">
            Happening Today
          </h2>
          <p className="mt-2 text-body-md text-ink-muted max-w-xl">
            See what&apos;s happening around Nizamabad today. Don&apos;t miss out.
          </p>
        </div>
        <a
          href="/events?filter=today"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          See all today <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Event grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {todayEvents.map((event) => (
          <EventCard key={event.id} event={event} variant="default" />
        ))}
      </div>

      {/* Empty state (safety net) */}
      {todayEvents.length === 0 && (
        <div className="text-center py-20 text-ink-muted">
          <p className="text-body-lg">No events scheduled for today.</p>
          <a href="/events" className="text-brand-500 font-semibold mt-2 inline-block hover:underline">
            Browse upcoming events →
          </a>
        </div>
      )}
    </Section>
  );
}

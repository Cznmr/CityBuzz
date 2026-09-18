import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";
import EventCard from "@/components/ui/EventCard";
import Badge from "@/components/ui/Badge";
import EventSearchBar from "@/components/forms/EventSearchBar";
import { getEvents, getTodaysEvents, getUpcomingEvents } from "@/lib/services/eventService";

export const metadata: Metadata = {
  title: "Discover Events in Nizamabad | CityBuzz",
  description:
    "Find cultural programs, workshops, sports, competitions and activities happening in Nizamabad.",
};

export default function EventsPage() {
  const allEvents      = getEvents();
  const todayEvents    = getTodaysEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="cb-container">
          <div className="flex flex-col gap-4 max-w-2xl">
            <Badge variant="category" size="md">
              <Calendar className="h-3.5 w-3.5 inline -mt-0.5 mr-1" />
              Nizamabad Events
            </Badge>
            <h1 className="text-display-md md:text-display-lg font-bold text-ink leading-tight">
              Discover Events in Nizamabad
            </h1>
            <p className="text-body-lg text-ink-muted max-w-xl">
              Find cultural programs, workshops, sports, competitions and
              activities happening around the city.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive search + filter (client component handles all filtering) ── */}
      <Section className="bg-white pt-10 pb-20">
        <div className="mb-6">
          <EventSearchBar />
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-body-sm text-ink-muted">
            <span className="font-semibold text-ink">{allEvents.length}</span>{" "}
            events in Nizamabad
          </p>
          <div className="flex gap-2">
            <Badge bgClass="bg-green-100" textClass="text-green-700" dot>
              {todayEvents.length} Today
            </Badge>
            <Badge bgClass="bg-blue-100" textClass="text-blue-700" dot>
              {upcomingEvents.length} Upcoming
            </Badge>
          </div>
        </div>

        {/* Today's events */}
        {todayEvents.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-heading-xl font-bold text-ink">Happening Today</h2>
              <span className="bg-brand-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {todayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming events */}
        {upcomingEvents.length > 0 && (
          <div>
            <h2 className="text-heading-xl font-bold text-ink mb-5">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

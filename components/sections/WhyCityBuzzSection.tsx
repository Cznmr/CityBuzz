import React from "react";
import { LayoutGrid, Search, Bell, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: LayoutGrid,
    title: "Everything in One Place",
    description:
      "No more scrolling through WhatsApp groups, Instagram stories or scattered posters. CityBuzz brings all local events and activities into a single, clean platform.",
    accent: "bg-brand-50",
    iconColor: "text-brand-500",
    iconBg: "bg-brand-100",
  },
  {
    icon: Search,
    title: "Discover Local Events",
    description:
      "Find cultural programs, sports meets, workshops, music nights and community activities happening right around you in Nizamabad — all in real time.",
    accent: "bg-blue-50",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    icon: Bell,
    title: "Never Miss an Event",
    description:
      "Get notified before events you care about. Register with one tap and receive timely reminders so you always show up for what matters.",
    accent: "bg-purple-50",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
  {
    icon: MapPin,
    title: "Built for Nizamabad",
    description:
      "CityBuzz is designed specifically for Nizamabad — not a generic template. Every feature is built with local context, local culture and local people in mind.",
    accent: "bg-green-50",
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyCityBuzzSection() {
  return (
    <Section id="why" className="bg-surface-secondary">
      <SectionHeader
        eyebrow="The CityBuzz Advantage"
        title="Why CityBuzz?"
        subtitle="People miss local events because information is scattered. We fix that."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className={cn(
                "group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-white",
                "hover:shadow-card-hover transition-all duration-200"
              )}
            >
              {/* Number + icon */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center",
                    benefit.iconBg
                  )}
                >
                  <Icon
                    className={cn("h-5 w-5", benefit.iconColor)}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-3xl font-black text-ink-disabled/60 leading-none tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="font-bold text-ink text-heading-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

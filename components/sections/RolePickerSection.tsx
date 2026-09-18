"use client";

import React, { useState } from "react";
import {
  Compass, Megaphone, ArrowRight, Sparkles,
  Users, Calendar, MapPin, Star,
} from "lucide-react";
import { useRole, type UserRole } from "@/context/RoleContext";
import { cn } from "@/lib/utils";

// ─── Role card data ───────────────────────────────────────────────────────────

const ROLES = [
  {
    key: "participant" as UserRole,
    icon: Compass,
    title: "I'm a Participant",
    subtitle: "Discover & Attend",
    description:
      "Find events, activities and experiences happening around Nizamabad. Explore by category, save favourites and never miss what matters to you.",
    highlights: [
      { icon: Calendar, text: "Browse all upcoming events" },
      { icon: MapPin, text: "Explore Nizamabad" },
      { icon: Star, text: "Save & share events" },
      { icon: Users, text: "Join the community" },
    ],
    cta: "Continue as Participant",
    accent: "brand",
    gradient: "from-brand-500/10 to-brand-600/5",
    border: "border-brand-200 hover:border-brand-400",
    iconBg: "bg-brand-100",
    iconColor: "text-brand-500",
    ctaClass: "bg-brand-500 hover:bg-brand-600 text-white",
    selectedBorder: "border-brand-500 ring-2 ring-brand-500/30",
  },
  {
    key: "organizer" as UserRole,
    icon: Megaphone,
    title: "I'm an Organizer",
    subtitle: "Create & Manage",
    description:
      "Publish your event on CityBuzz and reach thousands of people across Nizamabad. Manage registrations and grow your audience.",
    highlights: [
      { icon: Sparkles, text: "List events for free" },
      { icon: Users, text: "Reach all of Nizamabad" },
      { icon: Calendar, text: "Manage event details" },
      { icon: Star, text: "Track registrations" },
    ],
    cta: "Continue as Organizer",
    accent: "ink",
    gradient: "from-ink/5 to-ink/3",
    border: "border-border-strong hover:border-ink",
    iconBg: "bg-ink/8",
    iconColor: "text-ink",
    ctaClass: "bg-ink hover:bg-ink/90 text-white",
    selectedBorder: "border-ink ring-2 ring-ink/20",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function RolePickerSection() {
  const { setRole, role, hydrated } = useRole();
  const [hovered, setHovered] = useState<UserRole>(null);

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setTimeout(() => {
      const el = document.getElementById("role-content-area");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };


  return (
    <section
      id="role-picker"
      className="bg-white border-b border-border py-16 md:py-20"
      aria-labelledby="role-picker-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-label-md uppercase tracking-widest text-brand-500 mb-2">
            Welcome to CityBuzz
          </p>
          <h2
            id="role-picker-heading"
            className="text-display-sm md:text-display-md font-bold text-ink leading-tight"
          >
            How are you using CityBuzz?
          </h2>
          <p className="mt-3 text-body-lg text-ink-muted max-w-lg mx-auto">
            Choose your role so we can show you the most relevant experience.
            You can always switch later.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.key;
            const isHovered = hovered === r.key;

            return (
              <button
                key={r.key}
                onClick={() => handleSelectRole(r.key)}
                onMouseEnter={() => setHovered(r.key)}
                onMouseLeave={() => setHovered(null)}
                aria-pressed={isSelected}
                aria-label={r.cta}
                className={cn(
                  "relative group text-left rounded-3xl border-2 bg-white transition-all duration-200 overflow-hidden",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                  isSelected
                    ? r.selectedBorder + " shadow-card-lg"
                    : r.border + " shadow-card hover:shadow-card-hover"
                )}
              >
                {/* Background gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200",
                    r.gradient,
                    (isSelected || isHovered) && "opacity-100"
                  )}
                  aria-hidden="true"
                />

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-brand-500 flex items-center justify-center shadow-sm">
                    <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                <div className="relative p-6 md:p-8 flex flex-col gap-5">

                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200",
                      r.iconBg,
                      (isSelected || isHovered) && "scale-110"
                    )}>
                      <Icon className={cn("h-7 w-7", r.iconColor)} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-0.5">
                        {r.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-ink leading-tight">
                        {r.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body-md text-ink-secondary leading-relaxed">
                    {r.description}
                  </p>

                  {/* Highlights */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {r.highlights.map(({ icon: HIcon, text }) => (
                      <li key={text} className="flex items-center gap-2 text-body-sm text-ink-muted">
                        <HIcon className="h-3.5 w-3.5 text-brand-400 shrink-0" aria-hidden="true" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <div className={cn(
                    "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm transition-all duration-150 mt-1",
                    r.ctaClass,
                    "w-full"
                  )}>
                    {r.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip / Already chosen hint */}
        {role && (
          <p className="text-center mt-6 text-body-sm text-ink-muted">
            Currently browsing as{" "}
            <span className="font-semibold text-ink capitalize">{role}</span>.{" "}
            <button
              onClick={() => setRole(null)}
              className="text-brand-500 hover:text-brand-600 font-semibold underline-offset-2 hover:underline transition-colors"
            >
              Switch role
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

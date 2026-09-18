"use client";

import React from "react";
import {
  PlusCircle, LayoutList, Users, BarChart2,
  Megaphone, ArrowRight, Clock, Zap, ChevronRight,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ─── Action cards ─────────────────────────────────────────────────────────────

const ACTIONS = [
  {
    icon: PlusCircle,
    title: "Create an Event",
    description: "List a new event on CityBuzz and reach everyone in Nizamabad.",
    href: "/organizer",
    available: true,
    badge: null,
  },
  {
    icon: LayoutList,
    title: "Manage Events",
    description: "View, edit and update your listed events in one place.",
    href: "/organizer",
    available: false,
    badge: "Coming Soon",
  },
  {
    icon: Users,
    title: "View Registrations",
    description: "See who has registered for your events and track attendance.",
    href: "/organizer",
    available: false,
    badge: "Coming Soon",
  },
  {
    icon: BarChart2,
    title: "Event Analytics",
    description: "Understand your event reach, views and registration trends.",
    href: "/organizer",
    available: false,
    badge: "Phase 3",
  },
] as const;

const STEPS = [
  { n: "01", text: "Submit your event details via the quick form." },
  { n: "02", text: "CityBuzz reviews and publishes within 24 hours." },
  { n: "03", text: "Your event is live and discoverable city-wide." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrganizerDashboardPreview() {
  const { clearRole } = useRole();

  return (
    <div className="bg-surface-secondary min-h-screen">

      {/* ── Hero bar ── */}
      <div className="bg-ink border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/25 rounded-full px-4 py-1.5 mb-4">
                <Megaphone className="h-4 w-4 text-brand-400" />
                <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">
                  Organizer Portal
                </span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-bold text-white leading-tight">
                Welcome, Organizer
              </h1>
              <p className="text-white/60 mt-2 max-w-lg text-body-md">
                Publish events, manage listings and reach everyone in Nizamabad
                — all from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                href="/organizer"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                List Your Event
              </Button>
              <button
                onClick={clearRole}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-white/20 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
              >
                Switch to Participant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Action cards ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <h2 className="text-heading-xl font-bold text-ink mb-6">What would you like to do?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.title}
                href={action.href}
                className={cn(
                  "group bg-white rounded-2xl border border-border p-5 flex flex-col gap-4 transition-all duration-200",
                  action.available
                    ? "hover:shadow-card-hover hover:border-brand-200 cursor-pointer"
                    : "cursor-default opacity-75"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center",
                    action.available ? "bg-brand-100" : "bg-surface-tertiary"
                  )}>
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        action.available ? "text-brand-500" : "text-ink-muted"
                      )}
                    />
                  </div>
                  {action.badge && (
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full",
                      action.badge === "Coming Soon"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-surface-tertiary text-ink-subtle"
                    )}>
                      {action.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold text-heading-md mb-1 transition-colors",
                    action.available
                      ? "text-ink group-hover:text-brand-500"
                      : "text-ink-secondary"
                  )}>
                    {action.title}
                  </h3>
                  <p className="text-body-sm text-ink-muted leading-relaxed">
                    {action.description}
                  </p>
                </div>
                {action.available && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:text-brand-600 mt-auto transition-colors">
                    Get started <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-3xl border border-border p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <h2 className="font-bold text-ink text-heading-xl">How listing works</h2>
              <p className="text-body-sm text-ink-muted">3 simple steps to go live</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="text-3xl font-black text-brand-100 leading-none shrink-0">
                  {s.n}
                </span>
                <p className="text-body-sm text-ink-secondary leading-relaxed pt-1">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase note */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Organizer dashboard coming in Phase 3
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Full event management, analytics and registration tracking will be
              available in the next phase. For now, use the enquiry form to list
              your event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

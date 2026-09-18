import React from "react";
import { Megaphone, Users, BarChart2, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

// ─── Perks ────────────────────────────────────────────────────────────────────

const perks = [
  { icon: Users,     text: "Reach thousands of people in Nizamabad" },
  { icon: BarChart2, text: "Track registrations and attendance" },
  { icon: Megaphone, text: "Free event listing during Phase 1" },
  { icon: CheckCircle2, text: "Quick listing — live in minutes" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrganizerCTASection() {
  return (
    <section
      id="organizer"
      className="relative overflow-hidden bg-ink py-16 md:py-20 lg:py-24 isolate"
      aria-label="List your event on CityBuzz"
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 rounded-full px-4 py-1.5 mb-5">
              <Megaphone className="h-3.5 w-3.5 text-brand-400" />
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest">
                For Organizers
              </span>
            </div>

            <h2 className="text-display-sm md:text-display-md font-bold text-white leading-tight mb-4">
              Have an Event in{" "}
              <span className="text-brand-400">Nizamabad?</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Publish your event on CityBuzz and reach people across the city.
              From cultural programs to sports meets, workshops to community
              gatherings — we&apos;ll help you fill every seat.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="xl"
                href="/organizer"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                List Your Event
              </Button>
              <Button
                variant="outline"
                size="xl"
                href="/about"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: perks card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              What you get
            </p>
            <ul className="flex flex-col gap-4">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-brand-400" strokeWidth={2} />
                  </div>
                  <p className="text-base text-white/80 leading-snug pt-1.5">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full bg-brand-400/80 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {["K", "R", "S"][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50">
                Organizers are already listing events — join them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Compass, ClipboardCheck, PartyPopper } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    icon: Compass,
    title: "Discover",
    description:
      "Browse events by category, date or location. Search for what interests you — cultural programs, sports, workshops, music and more.",
    color: "text-brand-500",
    bgColor: "bg-brand-50",
    borderColor: "border-brand-200",
    connectorColor: "bg-brand-200",
  },
  {
    step: "02",
    icon: ClipboardCheck,
    title: "Register",
    description:
      "Reserve your spot in seconds. No complicated forms. Just one tap to register and you're confirmed for the event.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
    borderColor: "border-accent-200",
    connectorColor: "bg-accent-200",
  },
  {
    step: "03",
    icon: PartyPopper,
    title: "Participate",
    description:
      "Get timely reminders before the event. Show up, connect with the community and experience everything Nizamabad has to offer.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    connectorColor: "bg-purple-200",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="bg-white">
      <SectionHeader
        eyebrow="Simple Process"
        title="How It Works"
        subtitle="Getting started with CityBuzz takes less than a minute."
        centered
      />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {/* Connector lines — desktop only */}
        <div
          className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-brand-200 via-accent-200 to-purple-200"
          aria-hidden="true"
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className={cn(
                "relative flex flex-col items-center text-center gap-5 p-8 rounded-2xl border bg-white",
                step.borderColor,
                "hover:shadow-card-hover transition-all duration-200"
              )}
            >
              {/* Step number badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span
                  className={cn(
                    "inline-block text-xs font-black px-3 py-1 rounded-full border",
                    step.bgColor,
                    step.color,
                    step.borderColor
                  )}
                >
                  Step {step.step}
                </span>
              </div>

              {/* Icon */}
              <div
                className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center mt-2",
                  step.bgColor
                )}
              >
                <Icon
                  className={cn("h-7 w-7", step.color)}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-heading-xl font-bold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

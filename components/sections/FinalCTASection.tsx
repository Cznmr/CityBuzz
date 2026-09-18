import React from "react";
import { ArrowRight, Bell } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-brand-500 to-brand-600 py-16 md:py-20"
      aria-label="Final call to action"
    >
      {/* Subtle dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/15 mx-auto mb-6">
          <Bell className="h-7 w-7 text-white" strokeWidth={1.75} />
        </div>

        <h2 className="text-display-sm md:text-display-md font-bold text-white leading-tight mb-4">
          Don&apos;t Miss What&apos;s Happening Around You.
        </h2>
        <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
          Stay connected with events, activities and experiences in Nizamabad.
          CityBuzz keeps you in the loop — every single day.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            size="xl"
            href="/events"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="bg-white text-brand-600 hover:bg-brand-50 font-bold shadow-lg"
          >
            Explore Events
          </Button>
          <Button
            variant="outline"
            size="xl"
            href="/signup"
            className="border-white/40 text-white hover:bg-white/15 hover:border-white/60"
          >
            Create Free Account
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/50">
          Free to use · No account required to browse
        </p>
      </div>
    </section>
  );
}

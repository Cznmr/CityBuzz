"use client";

/**
 * HomepageOrchestrator
 *
 * Controls what the visitor sees based on their chosen role.
 *
 * Flow:
 *   ① FeaturedEventsBanner  (always visible — immediate "wow" moment)
 *   ② RolePickerSection     (always visible — user picks Participant / Organizer)
 *   ③ Role-specific content:
 *        Participant → full participant homepage sections
 *        Organizer   → OrganizerDashboardPreview
 *        No role yet → nothing below (user scrolls to picker naturally)
 */

import React from "react";
import { useRole } from "@/context/RoleContext";
import OrganizerDashboardPreview from "./OrganizerDashboardPreview";

// Participant sections (passed as children to avoid import coupling)
interface Props {
  participantSections: React.ReactNode;
}

export default function HomepageOrchestrator({ participantSections }: Props) {
  const { role, hydrated } = useRole();

  // Before hydration: show nothing below the picker (avoids layout flash)
  if (!hydrated) {
    return null;
  }

  if (role === "organizer") {
    return (
      <div id="role-content-area" className="scroll-mt-16">
        <OrganizerDashboardPreview />
      </div>
    );
  }

  if (role === "participant") {
    return (
      <div id="role-content-area" className="scroll-mt-16">
        {participantSections}
      </div>
    );
  }

  // No role chosen yet — prompt user to choose a role above
  return (
    <div className="bg-surface-secondary py-10 flex items-center justify-center border-t border-border">
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-brand-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-body-sm text-ink-muted">
          Select Participant or Organizer above to explore CityBuzz
        </p>
      </div>
    </div>
  );
}

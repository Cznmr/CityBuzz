import type { Metadata } from "next";

// ── Opening experience components (always shown)
import FeaturedEventsBanner  from "@/components/sections/FeaturedEventsBanner";
import RolePickerSection     from "@/components/sections/RolePickerSection";
import HomepageOrchestrator  from "@/components/sections/HomepageOrchestrator";

// ── Participant homepage sections
import CategorySection       from "@/components/sections/CategorySection";
import HappeningTodaySection from "@/components/sections/HappeningTodaySection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import ExploreSection        from "@/components/sections/ExploreSection";
import WhyCityBuzzSection    from "@/components/sections/WhyCityBuzzSection";
import HowItWorksSection     from "@/components/sections/HowItWorksSection";
import OrganizerCTASection   from "@/components/sections/OrganizerCTASection";
import FinalCTASection       from "@/components/sections/FinalCTASection";

export const metadata: Metadata = {
  title: "CityBuzz | Discover Events & Activities in Nizamabad",
  description:
    "Discover events, workshops, sports, cultural programs and activities happening in Nizamabad with CityBuzz — your local city platform.",
};

// ── Participant sections bundle (Server Component — no "use client" needed)
function ParticipantSections() {
  return (
    <>
      <CategorySection />
      <HappeningTodaySection />
      <UpcomingEventsSection />
      <ExploreSection />
      <WhyCityBuzzSection />
      <HowItWorksSection />
      <OrganizerCTASection />
      <FinalCTASection />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ① Large featured-event banner carousel — always first */}
      <FeaturedEventsBanner />

      {/* ② Role picker — always visible below the banner */}
      <RolePickerSection />

      {/* ③ Role-based content — controlled by RoleContext */}
      <HomepageOrchestrator
        participantSections={<ParticipantSections />}
      />
    </>
  );
}

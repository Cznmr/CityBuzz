import React from "react";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import CategoryCard from "@/components/ui/CategoryCard";
import { categories } from "@/lib/data/categories";

export default function CategorySection() {
  return (
    <Section id="categories" className="bg-surface-secondary py-16 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <SectionHeader
          eyebrow="Browse"
          title="Explore by Category"
          subtitle="Jump straight into the events that matter to you."
          className="mb-0"
        />
        <a
          href="/events"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          View all events <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.label}
            category={cat}
            href={`/events?category=${cat.label}`}
          />
        ))}
      </div>
    </Section>
  );
}

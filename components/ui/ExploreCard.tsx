import React from "react";
import Image from "next/image";
import {
  MapPin, UtensilsCrossed, Store, Zap, ArrowRight, LucideIcon,
} from "lucide-react";
import type { Place } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  MapPin, UtensilsCrossed, Store, Zap,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ExploreCardProps {
  place: Place;
  className?: string;
}

export default function ExploreCard({ place, className }: ExploreCardProps) {
  const IconComponent = iconMap[place.icon] ?? MapPin;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer bg-white",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={place.image}
          alt={place.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Icon badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-sm">
          <IconComponent className="h-5 w-5 text-brand-500" strokeWidth={2} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-ink text-heading-md mb-1.5 group-hover:text-brand-500 transition-colors">
          {place.title}
        </h3>
        <p className="text-body-sm text-ink-muted line-clamp-2 leading-relaxed mb-3">
          {place.description}
        </p>
        <span className="text-xs font-semibold text-brand-500 group-hover:text-brand-600 flex items-center gap-1 transition-colors">
          Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

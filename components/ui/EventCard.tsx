"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, Users, ArrowRight, BadgeCheck } from "lucide-react";
import type { Event } from "@/lib/types";
import {
  formatDate, formatTimeRange, getMonth, getDay,
  getCategoryColors, getStatusColors, cn,
} from "@/lib/utils";
import Badge from "./Badge";
import Button from "./Button";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

// ─── Default card ────────────────────────────────────────────────────────────

export default function EventCard({ event, variant = "default", className }: EventCardProps) {
  const catColors    = getCategoryColors(event.category);
  const statusColors = getStatusColors(event.registrationStatus);

  if (variant === "compact") {
    return <CompactCard event={event} catColors={catColors} statusColors={statusColors} className={className} />;
  }
  if (variant === "featured") {
    return <FeaturedCard event={event} catColors={catColors} statusColors={statusColors} className={className} />;
  }

  return (
    <article
      className={cn(
        "group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-border transition-all duration-200 overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Date chip */}
        <div className="absolute top-3 left-3 bg-white rounded-xl px-2.5 py-1.5 shadow-sm flex flex-col items-center min-w-[2.8rem]">
          <span className="text-[0.55rem] font-bold uppercase tracking-widest text-brand-500 leading-none">
            {getMonth(event.date)}
          </span>
          <span className="text-lg font-bold text-ink leading-tight">
            {getDay(event.date)}
          </span>
        </div>
        {/* Verified */}
        {event.isVerified && (
          <div className="absolute top-3 right-12">
            <BadgeCheck className="h-5 w-5 text-accent-500 drop-shadow" />
          </div>
        )}
        {/* Category */}
        <div className="absolute top-3 right-3">
          <Badge bgClass={catColors.bg} textClass={catColors.text}>
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-semibold text-ink text-heading-md leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-body-sm text-ink-muted">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            <span>{formatTimeRange(event.startTime, event.endTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          {event.registrationCount != null && (
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 shrink-0 text-brand-400" />
              <span>{event.registrationCount.toLocaleString("en-IN")} interested</span>
            </div>
          )}
        </div>

        <p className="text-body-sm text-ink-muted line-clamp-2 flex-1">
          {event.description}
        </p>

        <div className="flex items-center justify-between pt-1 mt-auto gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge bgClass={statusColors.bg} textClass={statusColors.text} dot>
              {event.registrationStatus}
            </Badge>
            {event.isFree && (
              <Badge bgClass="bg-green-100" textClass="text-green-700">Free</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            href={`/events/${event.id}`}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="text-brand-500 hover:text-brand-600 hover:bg-brand-50 shrink-0 -mr-1"
          >
            View
          </Button>
        </div>
      </div>
    </article>
  );
}

// ─── Compact variant ─────────────────────────────────────────────────────────

function CompactCard({
  event, catColors, statusColors, className,
}: { event: Event; catColors: { bg: string; text: string }; statusColors: { bg: string; text: string }; className?: string }) {
  return (
    <article className={cn(
      "group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-border transition-all duration-200 flex gap-4 p-4",
      className
    )}>
      <div className="flex flex-col items-center justify-center bg-brand-50 rounded-xl px-3 py-2 min-w-[3.5rem] shrink-0">
        <span className="text-[0.55rem] font-bold uppercase tracking-widest text-brand-400 leading-none">
          {getMonth(event.date)}
        </span>
        <span className="text-xl font-bold text-brand-600 leading-tight">
          {getDay(event.date)}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-ink text-body-md leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors flex-1">
            {event.title}
          </h3>
          <Badge bgClass={catColors.bg} textClass={catColors.text} className="shrink-0">
            {event.category}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-body-sm text-ink-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTimeRange(event.startTime, event.endTime)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {event.venue}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1.5">
            <Badge bgClass={statusColors.bg} textClass={statusColors.text} dot>
              {event.registrationStatus}
            </Badge>
          </div>
          <a
            href={`/events/${event.id}`}
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            View <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Featured variant ─────────────────────────────────────────────────────────

function FeaturedCard({
  event, catColors, statusColors, className,
}: { event: Event; catColors: { bg: string; text: string }; statusColors: { bg: string; text: string }; className?: string }) {
  return (
    <article className={cn(
      "group relative bg-white rounded-2xl shadow-card-lg hover:shadow-card-hover border border-border transition-all duration-200 overflow-hidden",
      className
    )}>
      <div className="relative h-56 md:h-64 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <Badge bgClass={catColors.bg} textClass={catColors.text}>
            {event.category}
          </Badge>
          {event.isFeatured && (
            <Badge bgClass="bg-brand-500" textClass="text-white">Featured</Badge>
          )}
          {event.isVerified && (
            <Badge bgClass="bg-white/90" textClass="text-accent-600">✓ Verified</Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-heading-xl leading-snug line-clamp-2">
            {event.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-white/80 text-body-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(event.date)} · {formatTimeRange(event.startTime, event.endTime)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {event.venue}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge bgClass={statusColors.bg} textClass={statusColors.text} dot>
            {event.registrationStatus}
          </Badge>
          {event.registrationCount != null && (
            <span className="text-body-sm text-ink-muted flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {event.registrationCount.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          href={`/events/${event.id}`}
          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
        >
          View Event
        </Button>
      </div>
    </article>
  );
}

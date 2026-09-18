"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@/lib/types";
import {
  formatTimeRange,
  getMonth,
  getDay,
  getCategoryColors,
  getStatusColors,
} from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ChatEventCardProps {
  event: Event;
  onNavigate?: () => void;
}

export default function ChatEventCard({ event, onNavigate }: ChatEventCardProps) {
  const catColors = getCategoryColors(event.category);
  const statusColors = getStatusColors(event.registrationStatus);

  return (
    <div className="group bg-white rounded-xl border border-border hover:border-brand-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden my-2 text-left">
      <div className="p-3.5 flex gap-3 items-start">
        {/* Date chip */}
        <div className="flex flex-col items-center justify-center bg-brand-50 rounded-lg px-2.5 py-1.5 min-w-[3rem] shrink-0 border border-brand-100">
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-brand-500 leading-none">
            {getMonth(event.date)}
          </span>
          <span className="text-base font-extrabold text-brand-700 leading-tight">
            {getDay(event.date)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1.5">
            <h4 className="font-semibold text-ink text-sm leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
              {event.title}
            </h4>
          </div>

          {/* Details */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="h-3 w-3 text-brand-400" />
              {formatTimeRange(event.startTime, event.endTime)}
            </span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 text-brand-400 shrink-0" />
              <span className="truncate">{event.locality ? `${event.locality}, ${event.venue}` : event.venue}</span>
            </span>
          </div>

          {/* Badges & Action */}
          <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Badge bgClass={catColors.bg} textClass={catColors.text} className="text-[0.65rem] px-1.5 py-0.5">
                {event.category}
              </Badge>
              {event.isFree ? (
                <span className="inline-flex items-center text-[0.65rem] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  Free
                </span>
              ) : (
                <Badge bgClass={statusColors.bg} textClass={statusColors.text} className="text-[0.65rem] px-1.5 py-0.5">
                  {event.registrationStatus}
                </Badge>
              )}
            </div>

            <Link
              href={`/events/${event.id}`}
              onClick={onNavigate}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors px-2 py-1 rounded-md hover:bg-brand-50"
            >
              View Event
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

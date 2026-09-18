"use client";

import React from "react";
import {
  Calendar,
  Sparkles,
  Laptop,
  Trophy,
  Palette,
  Wrench,
  MapPin,
} from "lucide-react";

interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Today",
    prompt: "What events are happening today in Nizamabad?",
    icon: Calendar,
  },
  {
    label: "This Weekend",
    prompt: "Show me events happening this weekend in Nizamabad",
    icon: Sparkles,
  },
  {
    label: "Technology",
    prompt: "Are there any technology or coding workshops in Nizamabad?",
    icon: Laptop,
  },
  {
    label: "Sports",
    prompt: "Show me sports competitions and matches in Nizamabad",
    icon: Trophy,
  },
  {
    label: "Cultural",
    prompt: "What cultural and dance programs are scheduled in Nizamabad?",
    icon: Palette,
  },
  {
    label: "Workshops",
    prompt: "What educational workshops or training sessions are coming up?",
    icon: Wrench,
  },
  {
    label: "Nearby",
    prompt: "What are the best places and activities to explore in Nizamabad?",
    icon: MapPin,
  },
];

interface ChatQuickActionsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export default function ChatQuickActions({ onSelect, disabled }: ChatQuickActionsProps) {
  return (
    <div className="py-1.5 px-3 border-t border-border/40 bg-surface-secondary/40">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ink-subtle shrink-0 mr-1">
          Quick:
        </span>
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(action.prompt)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-ink-secondary bg-white hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 border border-border transition-all duration-150 shrink-0 shadow-2xs active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Icon className="h-3 w-3 text-brand-500" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  Palette, Trophy, Wrench, GraduationCap,
  Cpu, Music, Medal, Users, LucideIcon,
} from "lucide-react";
import type { CategoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Icon registry ────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Palette, Trophy, Wrench, GraduationCap, Cpu, Music, Medal, Users,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: CategoryItem;
  className?: string;
  onClick?: (label: string) => void;
  href?: string;
}

export default function CategoryCard({
  category,
  className,
  onClick,
  href,
}: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] ?? Palette;

  const content = (
    <div
      className={cn(
        "group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-border bg-white",
        "hover:shadow-card-hover hover:border-transparent transition-all duration-200 cursor-pointer select-none",
        "text-center",
        className
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? () => onClick(category.label) : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(category.label);
              }
            }
          : undefined
      }
    >
      {/* Icon container */}
      <div
        className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
          category.color
        )}
      >
        <IconComponent
          className={cn("h-5 w-5", category.textColor)}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-body-sm font-semibold text-ink-secondary group-hover:text-ink transition-colors leading-tight"
        )}
      >
        {category.label}
      </span>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  narrow?: boolean;   // max-w-4xl instead of max-w-7xl
  noPadding?: boolean;
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

export function Section({
  id,
  className,
  innerClassName,
  children,
  as: Tag = "section",
  narrow = false,
  noPadding = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(!noPadding && "py-16 md:py-20 lg:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-4xl" : "max-w-7xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-10 md:mb-12", className)}>
      {eyebrow && (
        <p className="text-label-md uppercase tracking-widest text-brand-500 mb-2">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-display-sm md:text-display-md text-ink font-bold leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-body-lg text-ink-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

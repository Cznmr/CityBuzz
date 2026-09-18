import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = "default" | "category" | "status" | "outline";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  bgClass?: string;   // override background e.g. "bg-purple-100"
  textClass?: string; // override text color e.g. "text-purple-700"
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
  dotColor?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Badge({
  variant = "default",
  size = "sm",
  bgClass,
  textClass,
  className,
  children,
  dot = false,
  dotColor,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 font-semibold tracking-wide rounded-full leading-none";

  const sizeMap: Record<BadgeSize, string> = {
    sm: "px-2.5 py-1   text-xs",
    md: "px-3   py-1.5 text-xs",
  };

  const variantMap: Record<BadgeVariant, string> = {
    default: "bg-surface-tertiary text-ink-secondary",
    category: "bg-brand-50 text-brand-600",
    status: "bg-green-100 text-green-700",
    outline: "border border-border text-ink-muted bg-transparent",
  };

  return (
    <span
      className={cn(
        base,
        sizeMap[size],
        bgClass ?? variantMap[variant],
        textClass,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full shrink-0",
            dotColor ?? "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}

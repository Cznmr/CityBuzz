import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

// ─── Variant & size maps ──────────────────────────────────────────────────────

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md focus-visible:ring-brand-500",
  secondary:
    "bg-brand-50 text-brand-600 hover:bg-brand-100 active:bg-brand-200 focus-visible:ring-brand-500",
  outline:
    "border border-border-strong bg-transparent text-ink hover:bg-surface-secondary active:bg-surface-tertiary focus-visible:ring-brand-500",
  ghost:
    "bg-transparent text-ink hover:bg-surface-secondary active:bg-surface-tertiary focus-visible:ring-brand-500",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500",
};

const sizeClasses: Record<Size, string> = {
  sm:  "h-8  px-3   text-sm   gap-1.5 rounded-lg",
  md:  "h-10 px-4   text-sm   gap-2   rounded-lg",
  lg:  "h-11 px-5   text-base gap-2   rounded-xl",
  xl:  "h-13 px-7   text-base gap-2.5 rounded-xl",
};

// ─── Component ────────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

    const classes = cn(
      base,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

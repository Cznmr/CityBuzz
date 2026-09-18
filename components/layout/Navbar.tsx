"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Zap, Megaphone, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useRole } from "@/context/RoleContext";

// ─── Nav link data ────────────────────────────────────────────────────────────

const participantLinks = [
  { label: "Home",       href: "/" },
  { label: "Events",     href: "/events" },
  { label: "Explore",    href: "/explore" },
  { label: "Businesses", href: "/businesses" },
  { label: "About",      href: "/about" },
];

const organizerLinks = [
  { label: "Home",         href: "/" },
  { label: "List Event",   href: "/organizer" },
  { label: "How It Works", href: "/about" },
  { label: "Contact",      href: "/contact" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { role, isOrganizer, clearRole, hydrated } = useRole();

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const navLinks = isOrganizer ? organizerLinks : participantLinks;

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-[0_1px_12px_0_rgb(0_0_0/0.08)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* ── Logo ── */}
            <a href="/" className="flex items-center gap-2 shrink-0 group" aria-label="CityBuzz home">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-sm group-hover:bg-brand-600 transition-colors">
                <Zap className="h-4 w-4 text-white" strokeWidth={2.5} fill="currentColor" />
              </div>
              <span className="text-lg font-black tracking-tight text-ink">
                CITY<span className="text-brand-500">BUZZ</span>
              </span>
            </a>

            {/* ── Role pill (shows once hydrated + role chosen) ── */}
            {hydrated && role && (
              <button
                onClick={clearRole}
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all",
                  isOrganizer
                    ? "bg-ink/8 border-ink/20 text-ink hover:bg-ink/15"
                    : "bg-brand-50 border-brand-200 text-brand-600 hover:bg-brand-100"
                )}
                aria-label="Switch role"
                title="Click to switch role"
              >
                {isOrganizer
                  ? <><Megaphone className="h-3 w-3" /> Organizer</>
                  : <><Compass className="h-3 w-3" /> Participant</>
                }
                <span className="text-ink-subtle">·</span>
                <span className="text-ink-muted font-normal">switch</span>
              </button>
            )}

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    currentPath === link.href
                      ? "text-brand-500 bg-brand-50"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-secondary"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-2">
              {/* Search — only for participants */}
              {!isOrganizer && (
                <button
                  aria-label="Toggle search"
                  onClick={() => setSearchOpen((p) => !p)}
                  className="h-9 w-9 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-secondary transition-colors"
                >
                  {searchOpen ? <X className="h-4.5 w-4.5" /> : <Search className="h-4.5 w-4.5" />}
                </button>
              )}

              {/* Desktop auth / CTA */}
              <div className="hidden md:flex items-center gap-2">
                {isOrganizer ? (
                  <Button variant="primary" size="sm" href="/organizer">
                    List Your Event
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" href="/login">Login</Button>
                    <Button variant="primary" size="sm" href="/signup">Sign Up</Button>
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-secondary transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* ── Search bar expansion ── */}
          {!isOrganizer && (
            <div className={cn(
              "overflow-hidden transition-all duration-200",
              searchOpen ? "max-h-16 pb-3 opacity-100" : "max-h-0 opacity-0"
            )}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/events?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="relative"
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle pointer-events-none" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, activities, places..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile menu panel ── */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b border-border shadow-lg",
          "transition-all duration-200 ease-out",
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                currentPath === link.href
                  ? "bg-brand-50 text-brand-500"
                  : "text-ink-secondary hover:bg-surface-secondary hover:text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-4 pb-4 flex flex-col gap-2 border-t border-border pt-3">
          {isOrganizer ? (
            <Button variant="primary" size="lg" fullWidth href="/organizer">
              List Your Event
            </Button>
          ) : (
            <>
              <Button variant="outline" size="lg" fullWidth href="/login">Login</Button>
              <Button variant="primary" size="lg" fullWidth href="/signup">Sign Up</Button>
            </>
          )}
          {hydrated && role && (
            <button
              onClick={() => { clearRole(); setMobileOpen(false); }}
              className="text-sm text-ink-muted hover:text-ink font-medium py-2 transition-colors"
            >
              Switch role ({role})
            </button>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Share2, Link2, MessageCircle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;        // defaults to current page URL
  className?: string;
  variant?: "icon" | "full";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShareButton({
  title,
  description,
  url,
  className,
  variant = "full",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    url ?? (typeof window !== "undefined" ? window.location.href : "");

  // ── Web Share API (mobile / supported browsers) ──
  const handleNativeShare = async () => {
    const shareUrl = getUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description ?? title, url: shareUrl });
      } catch {
        // user cancelled — ignore
      }
    } else {
      setOpen(true);
    }
  };

  // ── Copy link ──
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
      const el = document.createElement("input");
      el.value = getUrl();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── WhatsApp ──
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${getUrl()}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      {variant === "icon" ? (
        <button
          onClick={handleNativeShare}
          aria-label="Share event"
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-border text-ink-muted hover:bg-surface-secondary hover:text-ink transition-colors"
        >
          <Share2 className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-ink-secondary hover:bg-surface-secondary transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      )}

      {/* Fallback share sheet */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div
            className="absolute right-0 bottom-full mb-2 z-50 bg-white rounded-2xl shadow-card-lg border border-border w-64 overflow-hidden animate-fade-up"
            role="dialog"
            aria-label="Share options"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-ink">Share Event</span>
              <button
                onClick={() => setOpen(false)}
                className="h-6 w-6 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-secondary transition-colors"
                aria-label="Close share menu"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="p-2">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-secondary transition-colors text-left"
              >
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-ink">Share on WhatsApp</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-secondary transition-colors text-left"
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  copied ? "bg-green-100" : "bg-surface-tertiary"
                )}>
                  {copied
                    ? <Check className="h-4 w-4 text-green-600" />
                    : <Link2 className="h-4 w-4 text-ink-muted" />
                  }
                </div>
                <span className="text-sm font-medium text-ink">
                  {copied ? "Link Copied!" : "Copy Link"}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

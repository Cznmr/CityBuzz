"use client";

import React from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

export default function OrganizerEnquiryForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="org-name" className="text-xs font-semibold text-ink-secondary">
            Your Name
          </label>
          <input
            id="org-name"
            type="text"
            placeholder="Name"
            className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="org-phone" className="text-xs font-semibold text-ink-secondary">
            Phone / WhatsApp
          </label>
          <input
            id="org-phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="org-event" className="text-xs font-semibold text-ink-secondary">
          Event Name & Type
        </label>
        <input
          id="org-event"
          type="text"
          placeholder="e.g. Annual Cultural Fest — Cultural / Performing Arts"
          className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="org-date" className="text-xs font-semibold text-ink-secondary">
          Event Date
        </label>
        <input
          id="org-date"
          type="date"
          className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth>
        Submit Enquiry
      </Button>
    </form>
  );
}

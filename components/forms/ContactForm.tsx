"use client";

import React from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      {/* Name + email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-ink-secondary">
            Full Name <span className="text-brand-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your name"
            className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-ink-secondary">
            Email Address <span className="text-brand-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="your@email.com"
            className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-xs font-semibold text-ink-secondary">
          Subject
        </label>
        <select
          id="subject"
          className="h-11 px-4 rounded-xl border border-border bg-surface-secondary text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition appearance-none"
        >
          <option value="">Select a topic</option>
          <option value="general">General Enquiry</option>
          <option value="event">List an Event</option>
          <option value="business">List a Business</option>
          <option value="feedback">Feedback</option>
          <option value="press">Press / Media</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-ink-secondary">
          Message <span className="text-brand-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Tell us what's on your mind..."
          className="px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        rightIcon={<Send className="h-4 w-4" />}
      >
        Send Message
      </Button>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { categories } from "@/lib/data/categories";

export default function EventSearchBar() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (activeCategory !== "All") params.set("category", activeCategory);
    window.location.href = `/events?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-white border border-border-strong rounded-2xl p-2 shadow-card max-w-xl focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all"
      >
        <Search className="ml-2 h-4 w-4 text-ink-subtle shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events..."
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none py-1"
          aria-label="Search events"
        />
        <Button type="submit" variant="primary" size="sm" className="rounded-xl shrink-0">
          Search
        </Button>
      </form>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 items-center pb-4 border-b border-border">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === "All"
              ? "bg-brand-500 text-white"
              : "border border-border bg-white text-ink-secondary hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
              activeCategory === cat.label
                ? "bg-brand-500 text-white border-brand-500"
                : "border-border bg-white text-ink-secondary hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

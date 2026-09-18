import type { Metadata } from "next";
import { Store, Search, Star, MapPin, Phone, Tag, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Local Businesses in Nizamabad",
  description:
    "Discover and support local businesses in Nizamabad — shops, services, restaurants, artisans and more.",
};

const businessCategories = [
  { name: "Restaurants",    count: "80+",  icon: "🍽️" },
  { name: "Retail Shops",   count: "200+", icon: "🛍️" },
  { name: "Services",       count: "150+", icon: "🔧" },
  { name: "Healthcare",     count: "60+",  icon: "🏥" },
  { name: "Education",      count: "40+",  icon: "📚" },
  { name: "Entertainment",  count: "25+",  icon: "🎬" },
];

const featuredBusinesses = [
  {
    name: "Spice Garden Restaurant",
    category: "Restaurant",
    rating: "4.6",
    location: "Main Road, Nizamabad",
    tag: "Authentic Telangana Cuisine",
    open: true,
  },
  {
    name: "Nizamabad Sarees",
    category: "Retail",
    rating: "4.8",
    location: "Nimmanapalli Market",
    tag: "Handloom & Silk",
    open: true,
  },
  {
    name: "City Tech Services",
    category: "Services",
    rating: "4.4",
    location: "Station Road, Nizamabad",
    tag: "Computer & Mobile Repair",
    open: false,
  },
  {
    name: "Turmeric Agro Mart",
    category: "Agriculture",
    rating: "4.7",
    location: "APMC Yard, Nizamabad",
    tag: "Direct Farm Produce",
    open: true,
  },
  {
    name: "Heritage Book Store",
    category: "Retail",
    rating: "4.5",
    location: "College Road, Nizamabad",
    tag: "Books & Stationery",
    open: true,
  },
  {
    name: "Royal Sweets & Bakery",
    category: "Food",
    rating: "4.9",
    location: "Subhash Chowk, Nizamabad",
    tag: "Traditional Sweets",
    open: true,
  },
];

export default function BusinessesPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="cb-container">
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-1.5 mb-4">
            <Store className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-semibold text-ink-secondary">Local Businesses</span>
          </div>
          <h1 className="text-display-md md:text-display-lg font-bold text-ink leading-tight mb-3">
            Nizamabad Businesses
          </h1>
          <p className="text-body-lg text-ink-muted max-w-xl mb-6">
            Discover and support local shops, restaurants, service providers and
            artisans that make Nizamabad thrive.
          </p>
          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-border-strong rounded-2xl p-2 shadow-card max-w-md focus-within:ring-2 focus-within:ring-brand-500 transition-all">
            <Search className="ml-2 h-4 w-4 text-ink-subtle shrink-0" />
            <input
              type="search"
              placeholder="Search businesses..."
              className="flex-1 bg-transparent text-sm placeholder:text-ink-subtle focus:outline-none py-1"
            />
            <Button variant="primary" size="sm" className="rounded-xl shrink-0">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* ── Category tiles ── */}
      <Section className="bg-white pt-10 pb-6">
        <h2 className="text-heading-xl font-bold text-ink mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {businessCategories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-2.5 p-4 bg-surface-secondary rounded-2xl border border-border hover:border-brand-200 hover:bg-brand-50 transition-all group text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-ink-secondary group-hover:text-brand-500 transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-ink-muted">{cat.count} listed</span>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Featured listings ── */}
      <Section className="bg-surface-secondary pt-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-display-sm font-bold text-ink">Featured Businesses</h2>
          <Badge bgClass="bg-amber-100" textClass="text-amber-700">Preview</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featuredBusinesses.map((biz) => (
            <div
              key={biz.name}
              className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 p-5 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-ink group-hover:text-brand-500 transition-colors mb-0.5">
                    {biz.name}
                  </h3>
                  <Badge variant="default" size="sm">{biz.category}</Badge>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 rounded-lg px-2 py-1 shrink-0">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold text-yellow-700">{biz.rating}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-ink-muted mb-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-brand-400" /> {biz.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3 w-3 text-brand-400" /> {biz.tag}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    biz.open
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {biz.open ? "Open Now" : "Closed"}
                </span>
                <button className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors">
                  View <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for businesses to list */}
        <div className="bg-ink rounded-3xl p-8 md:p-10 text-center text-white">
          <h3 className="text-display-sm font-bold mb-3">Own a Business in Nizamabad?</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            List your business on CityBuzz and connect with thousands of local customers.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            List Your Business
          </Button>
        </div>
      </Section>
    </>
  );
}

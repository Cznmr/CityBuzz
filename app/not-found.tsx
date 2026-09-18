import type { Metadata } from "next";
import { Zap, ArrowLeft, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tight text-ink">
            CITY<span className="text-brand-500">BUZZ</span>
          </span>
        </div>

        {/* 404 */}
        <p className="text-8xl font-black text-brand-100 leading-none mb-4">404</p>
        <h1 className="text-display-sm font-bold text-ink mb-3">Page Not Found</h1>
        <p className="text-body-md text-ink-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="lg" href="/" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Home
          </Button>
          <Button variant="outline" size="lg" href="/events" leftIcon={<Search className="h-4 w-4" />}>
            Browse Events
          </Button>
        </div>
      </div>
    </div>
  );
}

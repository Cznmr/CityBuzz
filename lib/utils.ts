// ─── Utility helpers ─────────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function getMonth(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
}

export function getDay(isoDate: string): string {
  return String(new Date(isoDate + "T00:00:00").getDate());
}

/** "10:00" → "10:00 AM" */
export function formatTime(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  const h = parseInt(hStr, 10);
  const m = mStr ?? "00";
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${suffix}`;
}

/** "10:00" + "16:00" → "10:00 AM – 4:00 PM" */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export function getStatusColors(status: string): { bg: string; text: string } {
  switch (status) {
    case "Open":          return { bg: "bg-green-100",  text: "text-green-700" };
    case "Closing Soon":  return { bg: "bg-amber-100",  text: "text-amber-700" };
    case "Full":          return { bg: "bg-red-100",    text: "text-red-700" };
    case "Free":          return { bg: "bg-blue-100",   text: "text-blue-700" };
    default:              return { bg: "bg-gray-100",   text: "text-gray-600" };
  }
}

export function getCategoryColors(category: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    Cultural:    { bg: "bg-purple-100", text: "text-purple-700" },
    Sports:      { bg: "bg-green-100",  text: "text-green-700" },
    Workshop:    { bg: "bg-yellow-100", text: "text-yellow-700" },
    Education:   { bg: "bg-blue-100",   text: "text-blue-700" },
    Technology:  { bg: "bg-cyan-100",   text: "text-cyan-700" },
    Music:       { bg: "bg-pink-100",   text: "text-pink-700" },
    Competition: { bg: "bg-orange-100", text: "text-orange-700" },
    Community:   { bg: "bg-teal-100",   text: "text-teal-700" },
    Business:    { bg: "bg-indigo-100", text: "text-indigo-700" },
  };
  return map[category] ?? { bg: "bg-gray-100", text: "text-gray-600" };
}

/** Percentage fill for capacity indicator */
export function capacityPercent(registered: number, capacity: number): number {
  return Math.min(100, Math.round((registered / capacity) * 100));
}

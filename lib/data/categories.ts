import type { CategoryItem } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Event categories with display config
// icon: corresponds to Lucide icon names resolved in the CategoryCard component
// ─────────────────────────────────────────────────────────────────────────────

export const categories: CategoryItem[] = [
  {
    label: "Cultural",
    icon: "Palette",
    color: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    label: "Sports",
    icon: "Trophy",
    color: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    label: "Workshop",
    icon: "Wrench",
    color: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    label: "Education",
    icon: "GraduationCap",
    color: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    label: "Technology",
    icon: "Cpu",
    color: "bg-cyan-50",
    textColor: "text-cyan-700",
  },
  {
    label: "Music",
    icon: "Music",
    color: "bg-pink-50",
    textColor: "text-pink-700",
  },
  {
    label: "Competition",
    icon: "Medal",
    color: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    label: "Community",
    icon: "Users",
    color: "bg-teal-50",
    textColor: "text-teal-700",
  },
];

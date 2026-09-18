/**
 * CityBuzz User & Personalization Types — Phase 3
 */

export interface NotificationPreferences {
  eventReminders: boolean;       // Upcoming event reminders
  interestBasedEvents: boolean;  // New events matching my interests
  importantUpdates: boolean;     // Important event updates / changes
  promotionalUpdates: boolean;   // Promotional updates / offers
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  city: string;
  locality?: string;
  interests: string[];
  onboardingCompleted: boolean;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface InterestCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    activeBg: string;
  };
}

export const AVAILABLE_INTERESTS: InterestCategory[] = [
  {
    id: "Technology",
    name: "Technology",
    description: "Coding, AI, gadgets, web dev & tech meetups",
    iconName: "Laptop",
    colorClass: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      activeBg: "bg-blue-600 text-white border-blue-600",
    },
  },
  {
    id: "Education",
    name: "Education",
    description: "Seminars, career guidance, study groups & science",
    iconName: "GraduationCap",
    colorClass: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      activeBg: "bg-indigo-600 text-white border-indigo-600",
    },
  },
  {
    id: "Sports",
    name: "Sports",
    description: "Cricket, badminton, marathons, tournaments & fitness",
    iconName: "Trophy",
    colorClass: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      activeBg: "bg-emerald-600 text-white border-emerald-600",
    },
  },
  {
    id: "Cultural",
    name: "Cultural",
    description: "Classical dance, folklore, festivals & traditions",
    iconName: "Sparkles",
    colorClass: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      activeBg: "bg-purple-600 text-white border-purple-600",
    },
  },
  {
    id: "Music",
    name: "Music",
    description: "Live concerts, acoustic nights, DJ sets & bands",
    iconName: "Music",
    colorClass: {
      bg: "bg-pink-50",
      text: "text-pink-700",
      border: "border-pink-200",
      activeBg: "bg-pink-600 text-white border-pink-600",
    },
  },
  {
    id: "Workshops",
    name: "Workshops",
    description: "Hands-on skill building, crafts, photography & DIY",
    iconName: "Wrench",
    colorClass: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      activeBg: "bg-amber-600 text-white border-amber-600",
    },
  },
  {
    id: "Competitions",
    name: "Competitions",
    description: "Hackathons, chess, quizzes, gaming & athletics",
    iconName: "Medal",
    colorClass: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      activeBg: "bg-orange-600 text-white border-orange-600",
    },
  },
  {
    id: "Community",
    name: "Community",
    description: "Volunteering, cleanups, meetups & social causes",
    iconName: "Users",
    colorClass: {
      bg: "bg-teal-50",
      text: "text-teal-700",
      border: "border-teal-200",
      activeBg: "bg-teal-600 text-white border-teal-600",
    },
  },
  {
    id: "Business",
    name: "Business",
    description: "Startups, networking, entrepreneurship & commerce",
    iconName: "Briefcase",
    colorClass: {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      activeBg: "bg-slate-700 text-white border-slate-700",
    },
  },
  {
    id: "Food",
    name: "Food",
    description: "Food festivals, culinary workshops, tastings & night markets",
    iconName: "Utensils",
    colorClass: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      activeBg: "bg-rose-600 text-white border-rose-600",
    },
  },
  {
    id: "Travel",
    name: "Travel",
    description: "Treks, heritage walks, nature camping & city trails",
    iconName: "Compass",
    colorClass: {
      bg: "bg-cyan-50",
      text: "text-cyan-700",
      border: "border-cyan-200",
      activeBg: "bg-cyan-600 text-white border-cyan-600",
    },
  },
  {
    id: "Arts",
    name: "Arts",
    description: "Painting exhibitions, theater plays, poetry & sculpture",
    iconName: "Palette",
    colorClass: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      border: "border-violet-200",
      activeBg: "bg-violet-600 text-white border-violet-600",
    },
  },
];

export const NIZAMABAD_LOCALITIES = [
  "Station Road",
  "Sports Complex",
  "Subhash Nagar",
  "Khaleelwadi",
  "Pragathi Nagar",
  "Shivaji Nagar",
  "Kanteshwar",
  "Collectorate Road",
  "Bodhan Road",
  "Armoor Road",
  "Goutham Nagar",
  "Vinayak Nagar",
  "Other Area in Nizamabad",
];

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  eventReminders: true,
  interestBasedEvents: true,
  importantUpdates: true,
  promotionalUpdates: false,
};

/**
 * CityBuzz User Profile Service Layer — Phase 3
 *
 * Manages user profile data in Cloud Firestore (`users/{userId}`)
 * with automatic fallback to local persistence when Firebase is unconfigured.
 */

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";
import type { UserProfile, NotificationPreferences } from "@/lib/types/user";
import { DEFAULT_NOTIFICATION_PREFERENCES } from "@/lib/types/user";

const MOCK_PROFILES_PREFIX = "citybuzz_profile_";

function getLocalProfile(userId: string): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MOCK_PROFILES_PREFIX + userId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLocalProfile(userId: string, profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MOCK_PROFILES_PREFIX + userId, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, "users", userId);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
      return null;
    } catch (err) {
      console.warn("CityBuzz: Error fetching Firestore profile:", err);
    }
  }

  // Local fallback
  return getLocalProfile(userId);
}

export async function createInitialUserProfile(
  userId: string,
  email: string,
  fullName: string,
  phone?: string
): Promise<UserProfile> {
  const now = new Date().toISOString();
  const profile: UserProfile = {
    id: userId,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || undefined,
    city: "Nizamabad",
    locality: undefined,
    interests: [],
    onboardingCompleted: false,
    notificationPreferences: { ...DEFAULT_NOTIFICATION_PREFERENCES },
    createdAt: now,
    updatedAt: now,
  };

  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, profile);
    } catch (err) {
      console.warn("CityBuzz: Error creating Firestore user document:", err);
    }
  }

  setLocalProfile(userId, profile);
  return profile;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, "id" | "createdAt">>
): Promise<UserProfile> {
  const existing = (await getUserProfile(userId)) || {
    id: userId,
    fullName: "CityBuzz User",
    email: "",
    city: "Nizamabad",
    interests: [],
    onboardingCompleted: false,
    notificationPreferences: { ...DEFAULT_NOTIFICATION_PREFERENCES },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated: UserProfile = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: updated.updatedAt,
      });
    } catch (err) {
      console.warn("CityBuzz: Error updating Firestore user document:", err);
    }
  }

  setLocalProfile(userId, updated);
  return updated;
}

export async function completeOnboarding(
  userId: string,
  data: {
    interests: string[];
    city: string;
    locality?: string;
    notificationPreferences: NotificationPreferences;
  }
): Promise<UserProfile> {
  return updateUserProfile(userId, {
    ...data,
    onboardingCompleted: true,
  });
}

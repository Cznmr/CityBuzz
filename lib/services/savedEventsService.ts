/**
 * CityBuzz Saved Events Service Layer — Phase 3
 *
 * Persists bookmarked events per user account.
 * Supports Firestore subcollection `users/{userId}/savedEvents/{eventId}`
 * and seamlessly handles migration from Phase 2 localStorage.
 */

import { collection, doc, getDocs, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";

const LOCAL_USER_SAVED_PREFIX = "citybuzz_saved_usr_";

function getLocalUserSaved(userId: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LOCAL_USER_SAVED_PREFIX + userId);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function setLocalUserSaved(userId: string, ids: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_USER_SAVED_PREFIX + userId, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}

export async function fetchUserSavedEventIds(userId: string): Promise<Set<string>> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "users", userId, "savedEvents");
      const snapshot = await getDocs(colRef);
      const ids = new Set<string>();
      snapshot.forEach((doc) => ids.add(doc.id));
      setLocalUserSaved(userId, ids);
      return ids;
    } catch (err) {
      console.warn("CityBuzz: Error fetching Firestore saved events:", err);
    }
  }

  return getLocalUserSaved(userId);
}

export async function saveUserEvent(userId: string, eventId: string): Promise<void> {
  const current = getLocalUserSaved(userId);
  current.add(eventId);
  setLocalUserSaved(userId, current);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "users", userId, "savedEvents", eventId);
      await setDoc(docRef, {
        eventId,
        savedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("CityBuzz: Error saving event to Firestore:", err);
    }
  }
}

export async function unsaveUserEvent(userId: string, eventId: string): Promise<void> {
  const current = getLocalUserSaved(userId);
  current.delete(eventId);
  setLocalUserSaved(userId, current);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "users", userId, "savedEvents", eventId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("CityBuzz: Error removing event from Firestore:", err);
    }
  }
}

/**
 * Migrates Phase 2 anonymous localStorage bookmarks into the authenticated account.
 * Only clears the local anonymous bookmarks after successfully merging.
 */
export async function migratePhase2SavedEvents(
  userId: string,
  anonymousIds: string[]
): Promise<Set<string>> {
  if (!anonymousIds.length) {
    return fetchUserSavedEventIds(userId);
  }

  const existing = await fetchUserSavedEventIds(userId);
  const toAdd = anonymousIds.filter((id) => !existing.has(id));

  if (!toAdd.length) {
    return existing;
  }

  toAdd.forEach((id) => existing.add(id));
  setLocalUserSaved(userId, existing);

  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      for (const eventId of toAdd) {
        const docRef = doc(db, "users", userId, "savedEvents", eventId);
        batch.set(docRef, {
          eventId,
          savedAt: new Date().toISOString(),
          migratedFromAnonymous: true,
        });
      }
      await batch.commit();
    } catch (err) {
      console.warn("CityBuzz: Firestore migration batch failed, keeping local copy:", err);
    }
  }

  return existing;
}

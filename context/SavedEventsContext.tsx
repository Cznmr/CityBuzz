"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useAuth } from "@/context/AuthContext";
import {
  fetchUserSavedEventIds,
  saveUserEvent,
  unsaveUserEvent,
  migratePhase2SavedEvents,
} from "@/lib/services/savedEventsService";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SavedEventsContextValue {
  savedIds: Set<string>;
  isSaved: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
  saveEvent: (id: string) => Promise<void>;
  unsaveEvent: (id: string) => Promise<void>;
  count: number;
  loading: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SavedEventsContext = createContext<SavedEventsContextValue | null>(null);
const ANONYMOUS_STORAGE_KEY = "citybuzz_saved_events";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SavedEventsProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const migrationAttempted = useRef(false);

  // 1. Initial hydration: read anonymous storage first
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ANONYMOUS_STORAGE_KEY);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setSavedIds(new Set(arr));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // 2. Sync with user account when authenticated
  useEffect(() => {
    if (!hydrated) return;

    async function syncUserSaved() {
      if (user && isAuthenticated) {
        setLoading(true);
        try {
          // Read any existing anonymous IDs from Phase 2
          let anonymousIds: string[] = [];
          try {
            const raw = localStorage.getItem(ANONYMOUS_STORAGE_KEY);
            if (raw) anonymousIds = JSON.parse(raw);
          } catch {
            // ignore
          }

          let merged: Set<string>;
          if (anonymousIds.length > 0 && !migrationAttempted.current) {
            migrationAttempted.current = true;
            merged = await migratePhase2SavedEvents(user.id, anonymousIds);
            // Clear local anonymous copy only after successful migration
            localStorage.removeItem(ANONYMOUS_STORAGE_KEY);
          } else {
            merged = await fetchUserSavedEventIds(user.id);
          }

          setSavedIds(merged);
        } catch (err) {
          console.error("CityBuzz: Failed to load saved events for user:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // Logged out: fallback to anonymous local storage
        try {
          const raw = localStorage.getItem(ANONYMOUS_STORAGE_KEY);
          setSavedIds(raw ? new Set(JSON.parse(raw)) : new Set());
        } catch {
          setSavedIds(new Set());
        }
        setLoading(false);
      }
    }

    syncUserSaved();
  }, [user, isAuthenticated, hydrated]);

  // 3. Persist anonymous saves to localStorage when logged out
  useEffect(() => {
    if (!hydrated || isAuthenticated) return;
    try {
      localStorage.setItem(ANONYMOUS_STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
    } catch {
      // ignore
    }
  }, [savedIds, hydrated, isAuthenticated]);

  const saveEvent = useCallback(
    async (id: string) => {
      setSavedIds((prev) => new Set([...prev, id]));
      if (user) {
        await saveUserEvent(user.id, id);
      }
    },
    [user]
  );

  const unsaveEvent = useCallback(
    async (id: string) => {
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (user) {
        await unsaveUserEvent(user.id, id);
      }
    },
    [user]
  );

  const toggle = useCallback(
    async (id: string) => {
      if (savedIds.has(id)) {
        await unsaveEvent(id);
      } else {
        await saveEvent(id);
      }
    },
    [savedIds, saveEvent, unsaveEvent]
  );

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  return (
    <SavedEventsContext.Provider
      value={{
        savedIds,
        isSaved,
        toggle,
        saveEvent,
        unsaveEvent,
        count: savedIds.size,
        loading,
      }}
    >
      {children}
    </SavedEventsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSavedEvents(): SavedEventsContextValue {
  const ctx = useContext(SavedEventsContext);
  if (!ctx) {
    throw new Error("useSavedEvents must be used inside SavedEventsProvider");
  }
  return ctx;
}

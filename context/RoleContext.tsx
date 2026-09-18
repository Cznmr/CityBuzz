"use client";

import React, {
  createContext, useContext, useEffect, useState, useCallback,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "participant" | "organizer" | null;

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clearRole: () => void;
  isParticipant: boolean;
  isOrganizer: boolean;
  hasChosen: boolean;   // true once user has made a selection
  hydrated: boolean;    // false during SSR / before localStorage read
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RoleContext = createContext<RoleContextValue | null>(null);
const STORAGE_KEY = "citybuzz_user_role";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(null);
  const [hydrated, setHydrated] = useState(false);

  // Read from localStorage after first mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as UserRole;
      if (stored === "participant" || stored === "organizer") {
        setRoleState(stored);
      }
    } catch {
      // localStorage unavailable — keep null
    }
    setHydrated(true);
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    try {
      if (newRole) {
        localStorage.setItem(STORAGE_KEY, newRole);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const clearRole = useCallback(() => setRole(null), [setRole]);

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        clearRole,
        isParticipant: role === "participant",
        isOrganizer: role === "organizer",
        hasChosen: role !== null,
        hydrated,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}

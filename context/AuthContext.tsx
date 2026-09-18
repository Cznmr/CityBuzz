"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { UserProfile, NotificationPreferences } from "@/lib/types/user";
import {
  signUpUser,
  logInUser,
  logOutUser,
  resetPasswordUser,
  subscribeToAuth,
  type AuthSessionUser,
} from "@/lib/services/authService";
import {
  getUserProfile,
  createInitialUserProfile,
  updateUserProfile as updateProfileService,
  completeOnboarding as completeOnboardingService,
} from "@/lib/services/userService";

interface AuthContextValue {
  user: UserProfile | null;
  sessionUser: AuthSessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  logIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, fullName: string, phone?: string) => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Omit<UserProfile, "id" | "createdAt">>) => Promise<UserProfile>;
  finishOnboarding: (data: {
    interests: string[];
    city: string;
    locality?: string;
    notificationPreferences: NotificationPreferences;
  }) => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessionUser, setSessionUser] = useState<AuthSessionUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync profile whenever session changes
  const loadProfile = useCallback(async (session: AuthSessionUser | null) => {
    if (!session) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      let profile = await getUserProfile(session.uid);
      if (!profile) {
        profile = await createInitialUserProfile(
          session.uid,
          session.email,
          session.displayName || "CityBuzz Explorer",
          session.phoneNumber || undefined
        );
      }
      setUser(profile);
    } catch (err) {
      console.error("CityBuzz: Error loading user profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((sUser) => {
      setSessionUser(sUser);
      loadProfile(sUser);
    });
    return () => unsubscribe();
  }, [loadProfile]);

  const logIn = useCallback(
    async (email: string, pass: string) => {
      setLoading(true);
      try {
        const sUser = await logInUser(email, pass);
        setSessionUser(sUser);
        await loadProfile(sUser);
      } finally {
        setLoading(false);
      }
    },
    [loadProfile]
  );

  const signUp = useCallback(
    async (email: string, pass: string, fullName: string, phone?: string) => {
      setLoading(true);
      try {
        const sUser = await signUpUser(email, pass, fullName, phone);
        setSessionUser(sUser);
        const profile = await createInitialUserProfile(
          sUser.uid,
          sUser.email,
          fullName,
          phone
        );
        setUser(profile);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logOut = useCallback(async () => {
    setLoading(true);
    try {
      await logOutUser();
      setSessionUser(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await resetPasswordUser(email);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (sessionUser) {
      const p = await getUserProfile(sessionUser.uid);
      if (p) setUser(p);
    }
  }, [sessionUser]);

  const updateProfile = useCallback(
    async (updates: Partial<Omit<UserProfile, "id" | "createdAt">>) => {
      if (!user) throw new Error("No authenticated user to update");
      const updated = await updateProfileService(user.id, updates);
      setUser(updated);
      return updated;
    },
    [user]
  );

  const finishOnboarding = useCallback(
    async (data: {
      interests: string[];
      city: string;
      locality?: string;
      notificationPreferences: NotificationPreferences;
    }) => {
      if (!user) throw new Error("No authenticated user to onboard");
      const updated = await completeOnboardingService(user.id, data);
      setUser(updated);
      return updated;
    },
    [user]
  );

  const value: AuthContextValue = {
    user,
    sessionUser,
    loading,
    isAuthenticated: Boolean(sessionUser),
    isOnboarded: Boolean(user?.onboardingCompleted),
    logIn,
    signUp,
    logOut,
    resetPassword,
    refreshProfile,
    updateProfile,
    finishOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

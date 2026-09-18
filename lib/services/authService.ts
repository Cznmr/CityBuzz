/**
 * CityBuzz Authentication Service Layer — Phase 3
 *
 * Supports Firebase Authentication when configured,
 * with a reliable local development fallback provider.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/config";

export interface AuthSessionUser {
  uid: string;
  email: string;
  displayName: string | null;
  phoneNumber?: string | null;
}

export function formatAuthError(error: unknown): string {
  if (!error) return "An unexpected error occurred. Please try again.";
  const err = error as { code?: string; message?: string };
  const code = err.code ?? "";

  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact CityBuzz support.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      return "Incorrect email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Access temporarily disabled. Please wait or reset password.";
    default:
      return err.message || "Authentication failed. Please check your details and try again.";
  }
}

// ─── Local Mock Fallback Store ────────────────────────────────────────────────
const MOCK_STORAGE_KEY = "citybuzz_mock_auth_user";
const MOCK_USERS_KEY = "citybuzz_mock_registered_users";

function getMockStoredUser(): AuthSessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setMockStoredUser(user: AuthSessionUser | null) {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(MOCK_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

interface MockRecord {
  uid: string;
  email: string;
  passwordHash: string;
  displayName: string;
  phoneNumber?: string;
}

function getMockUsers(): MockRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMockUser(record: MockRecord) {
  if (typeof window === "undefined") return;
  try {
    const list = getMockUsers().filter((u) => u.email.toLowerCase() !== record.email.toLowerCase());
    list.push(record);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

// ─── Service Methods ──────────────────────────────────────────────────────────

export async function signUpUser(
  email: string,
  pass: string,
  fullName: string,
  phone?: string
): Promise<AuthSessionUser> {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && auth) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      await updateProfile(cred.user, { displayName: fullName });
      return {
        uid: cred.user.uid,
        email: cred.user.email || cleanEmail,
        displayName: fullName,
        phoneNumber: phone || null,
      };
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }

  // Local mock provider
  const existing = getMockUsers().find((u) => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error(formatAuthError({ code: "auth/email-already-in-use" }));
  }

  const uid = "usr_" + Math.random().toString(36).substring(2, 10);
  const record: MockRecord = {
    uid,
    email: cleanEmail,
    passwordHash: btoa(pass), // local simulation
    displayName: fullName,
    phoneNumber: phone,
  };
  saveMockUser(record);

  const sessionUser: AuthSessionUser = {
    uid,
    email: cleanEmail,
    displayName: fullName,
    phoneNumber: phone || null,
  };
  setMockStoredUser(sessionUser);
  return sessionUser;
}

export async function logInUser(email: string, pass: string): Promise<AuthSessionUser> {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      return {
        uid: cred.user.uid,
        email: cred.user.email || cleanEmail,
        displayName: cred.user.displayName,
        phoneNumber: cred.user.phoneNumber,
      };
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }

  // Local mock provider
  const user = getMockUsers().find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user || user.passwordHash !== btoa(pass)) {
    // Check default demo credentials
    if (cleanEmail === "demo@citybuzz.in" && pass === "password123") {
      const sessionUser: AuthSessionUser = {
        uid: "usr_demo123",
        email: "demo@citybuzz.in",
        displayName: "Sandeep Kumar",
        phoneNumber: "+91 9876543210",
      };
      setMockStoredUser(sessionUser);
      return sessionUser;
    }
    throw new Error(formatAuthError({ code: "auth/invalid-credential" }));
  }

  const sessionUser: AuthSessionUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber || null,
  };
  setMockStoredUser(sessionUser);
  return sessionUser;
}

export async function logOutUser(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  }
  setMockStoredUser(null);
}

export async function resetPasswordUser(email: string): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  if (isFirebaseConfigured && auth) {
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  } else {
    // Local mock simulation
    const exists = getMockUsers().some((u) => u.email.toLowerCase() === cleanEmail) || cleanEmail === "demo@citybuzz.in";
    if (!exists) {
      throw new Error(formatAuthError({ code: "auth/user-not-found" }));
    }
  }
}

export function subscribeToAuth(
  callback: (user: AuthSessionUser | null) => void
): () => void {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName,
          phoneNumber: firebaseUser.phoneNumber,
        });
      } else {
        callback(null);
      }
    });
  }

  // Local fallback subscription
  const user = getMockStoredUser();
  callback(user);
  return () => {};
}

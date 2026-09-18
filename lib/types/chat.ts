import type { Event } from "@/lib/types";

export type ChatRole = "user" | "assistant" | "model";

export interface ChatHistoryMessage {
  role: ChatRole;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO string
  events?: Event[];
  suggestedQuestions?: string[];
  isError?: boolean;
}

export interface ChatApiUserContext {
  interests?: string[];
  city?: string;
  locality?: string;
  name?: string;
}

export interface ChatApiRequest {
  message: string;
  history?: ChatHistoryMessage[];
  userContext?: ChatApiUserContext;
}

export interface ChatApiResponse {
  reply: string;
  events: Event[];
  suggestedQuestions: string[];
  status?: "success" | "error";
  error?: string;
}

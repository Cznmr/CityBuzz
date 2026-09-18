"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Minus,
  RotateCcw,
  Bot,
} from "lucide-react";
import type { ChatMessage, ChatHistoryMessage, ChatApiResponse } from "@/lib/types/chat";
import type { UserContext } from "@/lib/services/aiContextService";
import ChatMessageItem from "./ChatMessageItem";
import ChatQuickActions from "./ChatQuickActions";
import ChatInput from "./ChatInput";
import { cn } from "@/lib/utils";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userContext?: UserContext;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "msg-welcome",
  role: "assistant",
  content: `Hi! 👋 I'm **CityBuzz AI**.

I can help you discover events, activities and places around **Nizamabad**.

What are you looking for?`,
  timestamp: new Date().toISOString(),
  suggestedQuestions: [
    "What's happening today?",
    "Events this weekend",
    "Technology events",
    "Sports events",
    "Events near me",
    "Explore Nizamabad",
  ],
};

export default function ChatDrawer({
  isOpen,
  onClose,
  userContext,
}: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change or loading state toggles
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    // Reset input immediately
    setInput("");

    // Create user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history payload for multi-turn chat (exclude initial greeting or errors)
      const validHistory: ChatHistoryMessage[] = messages
        .filter((m) => m.id !== "msg-welcome" && !m.isError)
        .map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          text: m.content,
        }));

      // Call server-side API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: validHistory,
          userContext,
        }),
      });

      const data: ChatApiResponse = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I couldn't find any information for that request.",
        timestamp: new Date().toISOString(),
        events: data.events || [],
        suggestedQuestions: data.suggestedQuestions || [],
        isError: data.status === "error",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[ChatDrawer Error]:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Sorry, CityBuzz AI is temporarily unavailable. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true,
        suggestedQuestions: ["What's happening today?", "Explore Nizamabad"],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop (only on screens < 640px) */}
      <div
        className="fixed inset-0 bg-ink/30 backdrop-blur-xs z-50 sm:hidden transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Chat Drawer / Window */}
      <aside
        aria-label="CityBuzz AI Assistant"
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-2xl transition-all duration-300 ease-out overflow-hidden border border-border",
          // Mobile layout: Full-screen or high drawer
          "inset-x-0 bottom-0 top-12 rounded-t-3xl sm:top-auto sm:inset-x-auto",
          // Desktop layout: Floating bottom-right card
          "sm:right-6 sm:bottom-6 sm:w-[420px] sm:max-w-[calc(100vw-3rem)] sm:h-[630px] sm:max-h-[85vh] sm:rounded-2xl",
          // Minimized state on desktop
          isMinimized && "sm:h-14 sm:max-h-14 overflow-hidden"
        )}
      >
        {/* ── Chat Header ── */}
        <header className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-border select-none shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Logo badge */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xs shrink-0">
              <Bot className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold tracking-tight text-ink">
                  CITYBUZZ AI
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[0.6rem] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[0.7rem] text-ink-muted truncate">
                <span>Your local guide to Nizamabad</span>
                <span className="text-ink-subtle">·</span>
                <span className="text-[0.65rem] text-brand-600 font-medium">Gemini</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleResetChat}
              aria-label="Restart chat"
              title="Restart conversation"
              className="p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-secondary transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              title={isMinimized ? "Expand" : "Minimize"}
              className="hidden sm:inline-flex p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-secondary transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              aria-label="Close CityBuzz AI Assistant"
              title="Close chat"
              className="p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* ── Scrollable Chat Messages ── */}
        {!isMinimized && (
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-surface-secondary/30 scroll-smooth"
          >
            {messages.map((message) => (
              <ChatMessageItem
                key={message.id}
                message={message}
                onSelectSuggestion={(q) => handleSendMessage(q)}
                onEventNavigate={onClose}
              />
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 mb-4 animate-in fade-in duration-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xs shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-surface-secondary border border-border/80 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-brand-600 animate-bounce" />
                  </div>
                  <span className="text-xs text-ink-muted font-medium ml-1">
                    Searching Nizamabad events...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* ── Chat Footer (Quick actions + Input) ── */}
        {!isMinimized && (
          <footer className="shrink-0 bg-white">
            <ChatQuickActions
              onSelect={(q) => handleSendMessage(q)}
              disabled={isLoading}
            />
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              isLoading={isLoading}
            />
          </footer>
        )}
      </aside>
    </>
  );
}

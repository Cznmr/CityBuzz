"use client";

import React from "react";
import { Sparkles, Bot, AlertCircle, ArrowUpRight } from "lucide-react";
import type { ChatMessage } from "@/lib/types/chat";
import ChatEventCard from "./ChatEventCard";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectSuggestion?: (query: string) => void;
  onEventNavigate?: () => void;
}

/**
 * Lightweight markdown-like formatter for bold text, bullet lists and line breaks
 */
function FormattedContent({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty lines create spacing
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Bullet point lines (- or * or •)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-brand-500 font-bold leading-none mt-1.5">•</span>
              <span className="flex-1">{renderInlineFormatting(content)}</span>
            </div>
          );
        }

        // Numbered lists (1. 2. etc.)
        const matchNumber = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (matchNumber) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-brand-600 font-semibold text-xs leading-tight min-w-[1rem] mt-0.5">
                {matchNumber[1]}.
              </span>
              <span className="flex-1">{renderInlineFormatting(matchNumber[2])}</span>
            </div>
          );
        }

        // Regular paragraph line
        return <p key={idx}>{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

/**
 * Formats **bold**, `code`, and links safely
 */
function renderInlineFormatting(text: string): React.ReactNode[] {
  // Split by bold tokens **...**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ChatMessageItem({
  message,
  onSelectSuggestion,
  onEventNavigate,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="max-w-[82%] sm:max-w-[75%] flex flex-col items-end">
          <div className="bg-brand-500 text-white px-4 py-2.5 rounded-2xl rounded-br-xs shadow-sm text-sm leading-relaxed selection:bg-brand-700 selection:text-white break-words">
            {message.content}
          </div>
          <span className="text-[0.65rem] text-ink-subtle mt-1 mr-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    );
  }

  // Assistant response
  return (
    <div className="flex items-start gap-2.5 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Bot Avatar */}
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xs shrink-0 mt-0.5">
        <Bot className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0 max-w-[88%] sm:max-w-[85%]">
        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-2xl rounded-tl-xs px-4 py-3 text-ink shadow-xs border text-sm leading-relaxed",
            message.isError
              ? "bg-amber-50/80 border-amber-200 text-amber-900"
              : "bg-surface-secondary border-border/80"
          )}
        >
          {message.isError && (
            <div className="flex items-center gap-1.5 font-medium text-amber-700 text-xs mb-1.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Notice</span>
            </div>
          )}

          <FormattedContent text={message.content} />
        </div>

        {/* Linked CityBuzz Event Cards */}
        {message.events && message.events.length > 0 && (
          <div className="mt-2 space-y-2">
            <div className="text-[0.7rem] font-bold uppercase tracking-wider text-ink-muted px-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand-500" />
              <span>Featured CityBuzz Events ({message.events.length})</span>
            </div>
            {message.events.map((event) => (
              <ChatEventCard
                key={event.id}
                event={event}
                onNavigate={onEventNavigate}
              />
            ))}
          </div>
        )}

        {/* Suggested Follow-up Questions */}
        {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestion?.(question)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-ink-secondary bg-white hover:bg-brand-50 hover:text-brand-600 rounded-full border border-border transition-colors text-left shadow-2xs"
              >
                <span>{question}</span>
                <ArrowUpRight className="h-2.5 w-2.5 text-brand-400" />
              </button>
            ))}
          </div>
        )}

        <div className="text-[0.65rem] text-ink-subtle mt-1 ml-1 flex items-center gap-2">
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    </div>
  );
}

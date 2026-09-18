"use client";

import React, { useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  disabled = false,
  placeholder = "Ask CityBuzz anything...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSubmit(e);
      }
    }
  };

  const isSendDisabled = disabled || isLoading || !input.trim();

  return (
    <form onSubmit={onSubmit} className="p-3 bg-white border-t border-border">
      <div className="relative flex items-end gap-2 bg-surface-secondary rounded-2xl border border-border focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all p-1.5 pl-3">
        <label htmlFor="citybuzz-chat-input" className="sr-only">
          Ask CityBuzz AI
        </label>
        <textarea
          id="citybuzz-chat-input"
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          aria-disabled={disabled || isLoading}
          maxLength={1000}
          className="w-full resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none max-h-28 leading-relaxed"
        />

        <button
          type="submit"
          disabled={isSendDisabled}
          aria-label="Send message"
          title={isSendDisabled ? "Type a message to send" : "Send message"}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-xs hover:bg-brand-600 active:scale-95 transition-all duration-150 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center px-1 pt-1.5 text-[0.65rem] text-ink-subtle">
        <span>Enter to send · Shift + Enter for new line</span>
        {input.length > 800 && (
          <span className={input.length >= 950 ? "text-amber-600 font-medium" : ""}>
            {input.length}/1000
          </span>
        )}
      </div>
    </form>
  );
}

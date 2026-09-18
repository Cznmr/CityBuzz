"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ChatDrawer from "./ChatDrawer";

export default function CityBuzzAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Prepare safe non-sensitive profile context
  const userContext = user
    ? {
        name: user.fullName || undefined,
        city: user.city || "Nizamabad",
        locality: user.locality || undefined,
        interests: user.interests || [],
      }
    : {
        city: "Nizamabad",
      };

  return (
    <>
      {/* ── Floating AI Trigger Button ── */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 animate-in fade-in zoom-in-95 duration-200">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Ask CityBuzz AI Assistant"
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-brand-500/25 transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {/* Pulsing indicator ring */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white" />
            </span>

            {/* Bot Icon with bounce on hover */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
              <Bot className="h-4 w-4 text-white" />
            </div>

            {/* Text Label */}
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-100">
                AI Assistant
              </span>
              <span className="text-sm font-bold tracking-tight">
                Ask CityBuzz
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ── Chat Drawer / Window ── */}
      <ChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userContext={userContext}
      />
    </>
  );
}

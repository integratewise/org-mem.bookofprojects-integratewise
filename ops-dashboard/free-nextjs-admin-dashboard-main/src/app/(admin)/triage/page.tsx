"use client";

import { useState, useRef, useEffect } from "react";
import { useTriageBot } from "@/hooks/use-triage-bot";

export default function TriageBotPage() {
  const { messages, sendMessage, clearHistory, isLoading, error, suggestions } = useTriageBot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");

    try {
      await sendMessage(message);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInput("");
    try {
      await sendMessage(suggestion);
    } catch (err) {
      console.error("Failed to send suggestion:", err);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Triage Bot</h1>
          <p className="text-sm text-[#6b6556] mt-1">
            Intelligent knowledge assistant — answers questions, helps write, manages content
          </p>
        </div>
        <button
          onClick={clearHistory}
          className="px-3 py-1.5 text-xs text-[#6b6556] border border-[#c4baa8] rounded-lg hover:bg-[#f4f0e8]"
        >
          Clear History
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-[#e6e0d0] rounded-xl overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-serif text-lg font-bold text-[#1a3a2a] mb-2">
                Triage Bot — Intelligent Knowledge Assistant
              </h3>
              <p className="text-sm text-[#6b6556] max-w-md mx-auto mb-6">
                I can answer questions, help you write content, classify information,
                and manage the knowledge base. All writes go through governance.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["What is our GTM strategy?", "Help me write a blog post", "Classify this document", "What can you do?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="px-3 py-1.5 text-xs text-[#1a3a2a] bg-[#f4f0e8] rounded-lg hover:bg-[#e6e0d0]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#1a3a2a] text-white"
                    : "bg-[#f4f0e8] text-[#1a3a2a]"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[10px] mt-2 ${
                    msg.role === "user" ? "text-white/50" : "text-[#9b9484]"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#f4f0e8] rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#b8943f] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#b8943f] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-[#b8943f] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="px-6 py-3 border-t border-[#e6e0d0]">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-xs text-[#1a3a2a] bg-[#f4f0e8] rounded-lg hover:bg-[#e6e0d0]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t border-[#e6e0d0]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question, write content, or submit to knowledge base..."
              className="flex-1 px-4 py-3 border border-[#c4baa8] rounded-lg text-sm focus:outline-none focus:border-[#b8943f]"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-[#1a3a2a] text-white rounded-lg text-sm font-medium hover:bg-[#2d5a3d] disabled:opacity-50"
            >
              Send
            </button>
          </div>
          {error && (
            <p className="text-xs text-[#cf222e] mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

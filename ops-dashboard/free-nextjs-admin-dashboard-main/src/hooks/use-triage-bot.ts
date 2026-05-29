/**
 * useTriageBot — React hook for intelligent Triage Bot agent
 * 
 * Triage Bot is an intelligent agent with memory that:
 * 1. Answers questions from org_memory
 * 2. Helps users write content
 * 3. Classifies and triages content
 * 4. Manages API keys
 * 5. Remembers conversations
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { triageBot, TriageMessage, TriageResponse } from '@/lib/triage-bot';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseTriageBotResult {
  // Chat
  messages: TriageMessage[];
  sendMessage: (message: string) => Promise<TriageResponse>;
  clearHistory: () => void;
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Suggestions
  suggestions: string[];
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useTriageBot(): UseTriageBotResult {
  const [messages, setMessages] = useState<TriageMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const initialized = useRef(false);

  // Load conversation on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadConversation();
    }
  }, []);

  const loadConversation = async () => {
    try {
      await triageBot.loadConversation();
      setMessages(triageBot.getHistory());
    } catch (err) {
      console.error('Failed to load conversation:', err);
    }
  };

  const sendMessage = useCallback(async (message: string): Promise<TriageResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await triageBot.chat(message);
      
      // Update messages from bot history
      setMessages(triageBot.getHistory());
      
      // Update suggestions
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }

      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    triageBot.clearHistory();
    setMessages([]);
    setSuggestions([]);
  }, []);

  return {
    messages,
    sendMessage,
    clearHistory,
    isLoading,
    error,
    suggestions,
  };
}

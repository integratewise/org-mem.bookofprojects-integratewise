import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot, X, Send, Sparkles, FileText, PenTool, Lightbulb,
  MessageSquare, ChevronDown, ChevronUp, Settings,
  Copy, Check, RefreshCw, Loader2, PanelRight, PanelRightClose
} from 'lucide-react';
import { sendMessageToAI } from '../../services/openrouter';
import { loadText, saveText } from '../../lib/storage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface AIAssistantProps {
  initialContext?: string;
  pageTitle?: string;
}

// Quick action buttons
const QUICK_ACTIONS = [
  { id: 'review', label: 'Review Content', icon: FileText, prompt: 'Review the current page content for brand alignment and suggest improvements.' },
  { id: 'generate', label: 'Generate Copy', icon: PenTool, prompt: 'Help me write new brand copy for...' },
  { id: 'strategize', label: 'Content Strategy', icon: Lightbulb, prompt: 'What content strategy would you recommend for...' },
  { id: 'check', label: 'Check Messaging', icon: MessageSquare, prompt: 'Check if this follows our messaging hierarchy (Workspace → Spine → AI):' },
];

export function AIAssistant({ initialContext, pageTitle }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your Brand Documentation AI. I can help you:\n\n• Review content for brand alignment\n• Generate on-brand copy\n• Develop content strategy\n• Check messaging consistency\n\nHow can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('anthropic/claude-3.5-sonnet');
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = loadText('openrouter_api_key');
    if (savedKey) setApiKey(savedKey);
    const savedModel = loadText('openrouter_model', 'anthropic/claude-3.5-sonnet');
    if (savedModel) setModel(savedModel);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const context = initialContext 
        ? `Current page: ${pageTitle || 'Unknown'}\n\nPage content:\n${initialContext}`
        : undefined;

      const response = await sendMessageToAI(text, context, apiKey || undefined, model || undefined);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error 
          ? `Error: ${error.message}\n\nPlease check your OpenRouter API key in settings.`
          : 'An error occurred. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    handleSend(action.prompt);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveApiKey = () => {
    saveText('openrouter_api_key', apiKey);
    saveText('openrouter_model', model);
    setShowSettings(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Chat cleared. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl"
            style={{ 
              background: 'linear-gradient(135deg, #4154A3 0%, #1B2544 100%)',
              boxShadow: '0 8px 32px rgba(65, 84, 163, 0.4)'
            }}
          >
            <Bot className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">AI Assistant</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              width: isExpanded ? '600px' : '380px'
            }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col"
            style={{ maxWidth: '100vw' }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: '#E8ECF2', background: 'linear-gradient(135deg, #4154A3 0%, #1B2544 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Brand AI</h3>
                  <p className="text-xs text-white/70">{model}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <PanelRightClose className="w-5 h-5 text-white" />
                  ) : (
                    <PanelRight className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b overflow-hidden"
                  style={{ borderColor: '#E8ECF2', background: '#F8FAFC' }}
                >
                  <div className="p-4">
                    <label className="block text-sm font-medium text-[#1B2544] mb-2">
                      OpenRouter API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-or-v1-..."
                        className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]"
                        style={{ borderColor: '#D5DAE5' }}
                      />
                      <button
                        onClick={saveApiKey}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: '#4154A3' }}
                      >
                        Save
                      </button>
                    </div>
                    <p className="text-xs text-[#5F6E93] mt-2">
                      Get your key at{' '}
                      <a 
                        href="https://openrouter.ai/keys" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#4154A3] underline"
                      >
                        openrouter.ai/keys
                      </a>
                    </p>
                    <label className="block text-sm font-medium text-[#1B2544] mt-4 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="anthropic/claude-3.5-sonnet"
                      className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]"
                      style={{ borderColor: '#D5DAE5' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick actions */}
            <div className="p-4 border-b" style={{ borderColor: '#E8ECF2' }}>
              <p className="text-xs font-medium text-[#5F6E93] mb-2 uppercase tracking-wider">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:bg-[#F0F2F7] text-left"
                    style={{ border: '1px solid #E8ECF2' }}
                  >
                    <action.icon className="w-4 h-4 text-[#4154A3]" />
                    <span className="text-[#475578]">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'text-white'
                        : message.isError
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-[#F0F2F7] text-[#1B2544]'
                    }`}
                    style={message.role === 'user' ? { background: '#4154A3' } : undefined}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' && !message.isError && (
                        <Bot className="w-4 h-4 mt-1 text-[#4154A3] shrink-0" />
                      )}
                      {message.isError && (
                        <RefreshCw className="w-4 h-4 mt-1 text-red-500 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        {message.role === 'assistant' && !message.isError && (
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="mt-2 flex items-center gap-1 text-xs text-[#5F6E93] hover:text-[#4154A3] transition-colors"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#F0F2F7] rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#4154A3] animate-spin" />
                    <span className="text-sm text-[#5F6E93]">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: '#E8ECF2' }}>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about brand content..."
                  className="flex-1 px-4 py-3 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-[#4154A3] max-h-32"
                  style={{ borderColor: '#D5DAE5' }}
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                  style={{ background: '#4154A3' }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={clearChat}
                  className="text-xs text-[#5F6E93] hover:text-[#4154A3] transition-colors"
                >
                  Clear chat
                </button>
                <p className="text-xs text-[#9BA8C2]">
                  Powered by OpenRouter • Claude 3.5 Sonnet
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIAssistant;

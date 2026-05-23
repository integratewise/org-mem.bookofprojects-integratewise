import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot, X, Send, Sparkles, FileText, PenTool, Lightbulb,
  MessageSquare, Settings, Copy, Check, RefreshCw, Loader2,
  PanelRight, PanelRightClose, ChevronDown
} from 'lucide-react';
import {
  sendToProvider, fetchModels,
  PROVIDERS, type ProviderId, type ModelInfo
} from '../../services/aiProviders';
import { loadText, saveText } from '../../lib/storage';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Quick actions ────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { id: 'review',     label: 'Review Content',    icon: FileText,      prompt: 'Review the current page content for brand alignment and suggest improvements.' },
  { id: 'generate',  label: 'Generate Copy',      icon: PenTool,       prompt: 'Help me write new brand copy that follows the Forest+Paper design language and IntegrateWise tone.' },
  { id: 'strategy',  label: 'Content Strategy',   icon: Lightbulb,     prompt: 'What content strategy would you recommend for this page?' },
  { id: 'check',     label: 'Check Messaging',    icon: MessageSquare, prompt: 'Check if this content follows our messaging hierarchy and brand voice.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AIAssistant({ initialContext, pageTitle }: AIAssistantProps) {
  const [isOpen,        setIsOpen]        = useState(false);
  const [isExpanded,    setIsExpanded]    = useState(false);
  const [showSettings,  setShowSettings]  = useState(false);
  const [input,         setInput]         = useState('');
  const [isLoading,     setIsLoading]     = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [copiedId,      setCopiedId]      = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: 'Hello! I\'m your Brand Documentation AI.\n\nOpen Settings to choose your provider and add your API key. Then I can help you review content, generate copy, and check brand alignment.',
    timestamp: new Date(),
  }]);

  // ── Provider state ──────────────────────────────────────────────────────────
  const [provider, setProvider] = useState<ProviderId>('openrouter');

  const [apiKeys, setApiKeys] = useState<Record<ProviderId, string>>({
    openrouter: '', anthropic: '', gemini: '', github: '',
  });

  const [models, setModels] = useState<Record<ProviderId, string>>({
    openrouter: '', anthropic: '', gemini: '', github: '',
  });

  const [availableModels, setAvailableModels] = useState<Record<ProviderId, ModelInfo[]>>({
    openrouter: [], anthropic: [], gemini: [], github: [],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);

  // ── Load saved settings ─────────────────────────────────────────────────────
  useEffect(() => {
    const savedProvider = loadText('ai_provider', 'openrouter') as ProviderId;
    setProvider(savedProvider);

    // Migrate old openrouter_api_key if present
    const legacyKey = loadText('openrouter_api_key', '');

    const savedKeys: Record<ProviderId, string> = {
      openrouter: loadText('ai_key_openrouter', '') || legacyKey,
      anthropic:  loadText('ai_key_anthropic',  ''),
      gemini:     loadText('ai_key_gemini',      ''),
      github:     loadText('ai_key_github',      ''),
    };
    setApiKeys(savedKeys);

    const savedModels: Record<ProviderId, string> = {
      openrouter: loadText('ai_model_openrouter', ''),
      anthropic:  loadText('ai_model_anthropic',  ''),
      gemini:     loadText('ai_model_gemini',     ''),
      github:     loadText('ai_model_github',     ''),
    };
    setModels(savedModels);

    // Auto-load models for current provider if key exists
    const activeKey = savedKeys[savedProvider];
    if (activeKey) {
      loadModelsForProvider(savedProvider, activeKey);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ── Load models from provider API ───────────────────────────────────────────
  const loadModelsForProvider = async (pid: ProviderId, key: string) => {
    if (!key) return;
    setLoadingModels(true);
    try {
      const fetched = await fetchModels(pid, key);
      if (fetched.length > 0) {
        setAvailableModels((prev) => ({ ...prev, [pid]: fetched }));
        // Set first model if none selected
        setModels((prev) => ({
          ...prev,
          [pid]: prev[pid] || fetched[0].id,
        }));
      }
    } finally {
      setLoadingModels(false);
    }
  };

  // ── When provider switches, auto-load if key present ────────────────────────
  const handleProviderChange = (pid: ProviderId) => {
    setProvider(pid);
    if (apiKeys[pid] && availableModels[pid].length === 0) {
      loadModelsForProvider(pid, apiKeys[pid]);
    }
  };

  // ── Save settings ────────────────────────────────────────────────────────────
  const saveSettings = () => {
    saveText('ai_provider', provider);
    saveText('ai_key_openrouter', apiKeys.openrouter);
    saveText('ai_key_anthropic',  apiKeys.anthropic);
    saveText('ai_key_gemini',     apiKeys.gemini);
    saveText('ai_key_github',     apiKeys.github);
    saveText('ai_model_openrouter', models.openrouter);
    saveText('ai_model_anthropic',  models.anthropic);
    saveText('ai_model_gemini',     models.gemini);
    saveText('ai_model_github',     models.github);
    setShowSettings(false);
  };

  // ── Send message ─────────────────────────────────────────────────────────────
  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const context = initialContext
        ? `Current page: ${pageTitle || 'Unknown'}\n\nPage content:\n${initialContext}`
        : undefined;

      const response = await sendToProvider(text, provider, apiKeys[provider], models[provider], context);

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An error occurred. Please try again.',
        timestamp: new Date(),
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeProvider = PROVIDERS.find((p) => p.id === provider)!;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg"
            style={{
              background: 'var(--paper-warm)',
              color: 'var(--forest)',
              border: '1px solid var(--rule)',
              boxShadow: '0 8px 24px -8px rgb(26 58 42 / 0.18)'
            }}
          >
            <Bot className="w-5 h-5" style={{ color: 'var(--forest)' }} />
            <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>AI Assistant</span>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--gold)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, width: isExpanded ? '600px' : '380px' }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full z-50 shadow-2xl flex flex-col"
            style={{ background: 'var(--paper-warm)', maxWidth: '100vw' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0"
                 style={{ borderColor: 'var(--rule)', background: 'var(--forest)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(244,240,232,0.15)' }}>
                  <Bot className="w-5 h-5" style={{ color: 'var(--paper)' }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)' }}>Brand AI</h3>
                  <p className="text-xs" style={{ color: 'var(--gold-light)' }}>
                    {activeProvider.label}{models[provider] ? ` · ${models[provider].split('/').pop()}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--paper)]/10"
                        title={isExpanded ? 'Collapse' : 'Expand'}>
                  {isExpanded
                    ? <PanelRightClose className="w-5 h-5" style={{ color: 'var(--paper)' }} />
                    : <PanelRight      className="w-5 h-5" style={{ color: 'var(--paper)' }} />}
                </button>
                <button onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--paper)]/10"
                        title="Settings">
                  <Settings className="w-5 h-5" style={{ color: 'var(--paper)' }} />
                </button>
                <button onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--paper)]/10"
                        title="Close">
                  <X className="w-5 h-5" style={{ color: 'var(--paper)' }} />
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
                  className="border-b overflow-hidden shrink-0"
                  style={{ borderColor: 'var(--rule)', background: 'var(--paper-deep)' }}
                >
                  <div className="p-4 space-y-4">

                    {/* Provider selector */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-2"
                             style={{ color: 'var(--forest-mid)', fontFamily: 'var(--font-mono)' }}>
                        Provider
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PROVIDERS.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProviderChange(p.id)}
                            className="px-3 py-2 rounded-lg text-sm font-medium text-left transition-all"
                            style={{
                              background: provider === p.id ? 'var(--forest)' : 'var(--paper-warm)',
                              color:      provider === p.id ? 'var(--paper)'  : 'var(--ink)',
                              border:     '1px solid ' + (provider === p.id ? 'var(--forest)' : 'var(--rule)'),
                            }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* API key for active provider */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-1"
                             style={{ color: 'var(--forest-mid)', fontFamily: 'var(--font-mono)' }}>
                        {activeProvider.apiKeyLabel}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={apiKeys[provider]}
                          onChange={(e) => setApiKeys((prev) => ({ ...prev, [provider]: e.target.value }))}
                          onBlur={(e) => e.target.value && loadModelsForProvider(provider, e.target.value)}
                          placeholder={activeProvider.apiKeyPlaceholder}
                          className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none"
                          style={{ borderColor: 'var(--rule)', background: 'var(--paper)', color: 'var(--ink)' }}
                        />
                        <button
                          onClick={() => loadModelsForProvider(provider, apiKeys[provider])}
                          disabled={!apiKeys[provider] || loadingModels}
                          className="px-3 py-2 rounded-lg text-xs font-medium disabled:opacity-40"
                          style={{ background: 'var(--forest)', color: 'var(--paper)' }}
                          title="Fetch models from provider"
                        >
                          {loadingModels ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Load'}
                        </button>
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {activeProvider.apiKeyHint} ·{' '}
                        <a href={activeProvider.apiKeyUrl} target="_blank" rel="noopener noreferrer"
                           style={{ color: 'var(--forest-bright)' }}>
                          Get key
                        </a>
                      </p>
                    </div>

                    {/* Model selector — live from provider */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-1"
                             style={{ color: 'var(--forest-mid)', fontFamily: 'var(--font-mono)' }}>
                        Model{availableModels[provider].length > 0 &&
                          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> ({availableModels[provider].length} available)</span>}
                      </label>
                      {availableModels[provider].length > 0 ? (
                        <div className="relative">
                          <select
                            value={models[provider]}
                            onChange={(e) => setModels((prev) => ({ ...prev, [provider]: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border text-sm appearance-none focus:outline-none pr-8"
                            style={{ borderColor: 'var(--rule)', background: 'var(--paper)', color: 'var(--ink)' }}
                          >
                            {availableModels[provider].map((m) => (
                              <option key={m.id} value={m.id}>{m.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                       style={{ color: 'var(--text-muted)' }} />
                        </div>
                      ) : (
                        <p className="text-xs px-3 py-2 rounded-lg border"
                           style={{ borderColor: 'var(--rule)', color: 'var(--text-muted)', background: 'var(--paper)' }}>
                          {apiKeys[provider] ? 'Click Load to fetch available models' : 'Enter API key first, then click Load'}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={saveSettings}
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{ background: 'var(--forest)', color: 'var(--paper)' }}
                    >
                      Save Settings
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick actions */}
            <div className="p-4 border-b shrink-0" style={{ borderColor: 'var(--rule)' }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2"
                 style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSend(action.prompt)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all hover:brightness-95"
                    style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}
                  >
                    <action.icon className="w-4 h-4 shrink-0" style={{ color: 'var(--forest)' }} />
                    <span style={{ color: 'var(--ink)' }}>{action.label}</span>
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
                  className={'flex ' + (message.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3"
                    style={
                      message.role === 'user'
                        ? { background: 'var(--forest)', color: 'var(--paper)' }
                        : message.isError
                        ? { background: 'var(--gold-pale)', color: 'var(--red)', border: '1px solid var(--gold)' }
                        : { background: 'var(--paper)', border: '1px solid var(--rule)', color: 'var(--ink)' }
                    }
                  >
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' && !message.isError && (
                        <Bot className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--forest)' }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        {message.role === 'assistant' && !message.isError && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t"
                               style={{ borderColor: 'var(--rule)' }}>
                            <button
                              onClick={() => handleCopy(message.id, message.content)}
                              className="flex items-center gap-1 text-xs transition-colors"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {copiedId === message.id
                                ? <><Check className="w-3 h-3" /> Copied</>
                                : <><Copy className="w-3 h-3" /> Copy</>}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-2"
                       style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                    <Bot className="w-4 h-4" style={{ color: 'var(--forest)' }} />
                    <RefreshCw className="w-4 h-4 animate-spin" style={{ color: 'var(--forest)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t shrink-0" style={{ borderColor: 'var(--rule)' }}>
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything about brand content..."
                  rows={1}
                  className="flex-1 px-4 py-3 rounded-xl border resize-none text-sm focus:outline-none focus:ring-2"
                  style={{
                    borderColor: 'var(--rule)',
                    background: 'var(--paper)',
                    color: 'var(--ink)',
                    maxHeight: '120px',
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl transition-all disabled:opacity-40"
                  style={{ background: 'var(--forest)', color: 'var(--paper)' }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIAssistant;

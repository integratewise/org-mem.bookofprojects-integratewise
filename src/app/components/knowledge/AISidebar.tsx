import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Check, X, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  triageId?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onTriageSubmit: (content: string, category: string, priority: string) => void;
}

const CATEGORIES = [
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'operations', label: 'Operations', icon: '⚙️' },
  { id: 'marketing', label: 'Marketing', icon: '📢' },
  { id: 'sales', label: 'Sales', icon: '💰' },
  { id: 'support', label: 'Support', icon: '🤝' },
  { id: 'strategy', label: 'Strategy', icon: '🎯' },
];

const PRIORITIES = [
  { id: 'critical', label: 'Critical', color: 'var(--red)' },
  { id: 'high', label: 'High', color: 'var(--gold)' },
  { id: 'medium', label: 'Medium', color: 'var(--slate-mid)' },
  { id: 'low', label: 'Low', color: 'var(--ink-muted)' },
];

export function AISidebar({ isOpen, onClose, onTriageSubmit }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your Knowledge Intake Assistant. Tell me what you want to add to the organizational memory, and I\'ll help you structure it for the Triage Bot.\n\nYou can:\n• Paste a document or text\n• Describe a decision or pattern\n• Share an insight or learning\n\nI\'ll categorize it and prepare it for review.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('product');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: `I've received your knowledge input. Here's what I've prepared for the Triage Bot:\n\n**Category:** ${selectedCategory}\n**Priority:** ${selectedPriority}\n**Content:** ${userMessage.content.substring(0, 100)}...\n\nClick "Submit to Triage" to add this to the review queue.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleSubmitToTriage = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      onTriageSubmit(lastUserMessage.content, selectedCategory, selectedPriority);
      
      const confirmMessage: Message = {
        id: `confirm_${Date.now()}`,
        role: 'assistant',
        content: '✓ Submitted to Triage Bot! The content will be reviewed and published to the appropriate memory layer after approval.',
        timestamp: new Date(),
        triageId: `triage_${Date.now()}`,
        status: 'pending',
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      width: 400,
      background: 'var(--paper)',
      borderLeft: '1px solid var(--rule)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--rule)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--forest)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Bot style={{ width: 18, height: 18, color: 'var(--forest)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, color: 'var(--paper)' }}>
            Knowledge Intake
          </div>
          <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            AI → Triage Bot → Memory
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--paper)',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <X style={{ width: 18, height: 18 }} />
        </button>
      </div>

      {/* Category & Priority Selectors */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid var(--rule)',
        display: 'flex',
        gap: 8,
      }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              color: 'var(--ink)',
              fontSize: 12,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
            }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Priority
          </label>
          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              color: 'var(--ink)',
              fontSize: 12,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
            }}
          >
            {PRIORITIES.map(pri => (
              <option key={pri.id} value={pri.id}>{pri.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: 8,
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: msg.role === 'assistant' ? 'var(--forest)' : 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {msg.role === 'assistant' 
                ? <Sparkles style={{ width: 12, height: 12, color: 'var(--paper)' }} />
                : <User style={{ width: 12, height: 12, color: 'var(--forest)' }} />
              }
            </div>
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
              background: msg.role === 'assistant' ? 'var(--paper-warm)' : 'var(--forest)',
              color: msg.role === 'assistant' ? 'var(--ink)' : 'var(--paper)',
              border: msg.role === 'assistant' ? '1px solid var(--rule)' : 'none',
              fontSize: 13,
              lineHeight: 1.5,
              fontFamily: 'var(--font-sans)',
            }}>
              {msg.content}
              {msg.triageId && (
                <div style={{
                  marginTop: 8,
                  padding: '6px 10px',
                  borderRadius: 4,
                  background: 'var(--gold-pale)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--gold)',
                }}>
                  Triage ID: {msg.triageId}
                </div>
              )}
              <div style={{
                fontSize: 10,
                marginTop: 4,
                opacity: 0.5,
                fontFamily: 'var(--font-mono)',
              }}>
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'var(--forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Loader2 style={{ width: 12, height: 12, color: 'var(--paper)', animation: 'spin 1s linear infinite' }} />
            </div>
            <div style={{
              padding: '10px 14px',
              borderRadius: '2px 12px 12px 12px',
              background: 'var(--paper-warm)',
              border: '1px solid var(--rule)',
              fontSize: 13,
              color: 'var(--ink-muted)',
            }}>
              Processing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Submit to Triage Button */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--rule)',
      }}>
        <button
          onClick={handleSubmitToTriage}
          disabled={!messages.some(m => m.role === 'user')}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            background: messages.some(m => m.role === 'user') ? 'var(--gold)' : 'var(--rule)',
            color: messages.some(m => m.role === 'user') ? 'var(--forest)' : 'var(--ink-muted)',
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            cursor: messages.some(m => m.role === 'user') ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check style={{ width: 16, height: 16 }} />
          Submit to Triage
        </button>
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--rule)',
        background: 'var(--paper-warm)',
      }}>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type knowledge to add to memory..."
            rows={2}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              color: 'var(--ink)',
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
              resize: 'none',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: input.trim() ? 'var(--forest)' : 'var(--rule)',
              color: input.trim() ? 'var(--paper)' : 'var(--ink-muted)',
              border: 'none',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div style={{
          fontSize: 10,
          color: 'var(--ink-muted)',
          marginTop: 4,
          fontFamily: 'var(--font-mono)',
        }}>
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}

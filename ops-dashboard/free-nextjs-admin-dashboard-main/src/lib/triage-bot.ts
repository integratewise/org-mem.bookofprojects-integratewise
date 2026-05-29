/**
 * Triage Bot — Intelligent Agent with Memory
 * 
 * Not just a gateway — an intelligent agent that:
 * 1. Answers questions from org_memory
 * 2. Helps users write content
 * 3. Classifies and triages content
 * 4. Manages API keys
 * 5. Remembers conversations (conversational_memory)
 * 6. Learns patterns (org_memory)
 * 7. Tracks sessions (agent_sessions)
 * 8. Stores learnings (agent_memory)
 * 
 * All writes to Spine go through Triage Bot.
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';
import { agentMemory, AgentSession, AgentMemory } from '@/lib/agent-memory';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TriageMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface TriageContext {
  conversation_history: TriageMessage[];
  user_preferences: Record<string, any>;
  org_knowledge: Record<string, any>;
  current_intent?: string;
}

export interface TriageResponse {
  message: string;
  action?: 'write' | 'classify' | 'answer' | 'help';
  classification?: 'personal' | 'org' | 'conversational';
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  content_to_write?: string;
  suggestions?: string[];
}

// ─── Triage Bot Agent ──────────────────────────────────────────────────────

export class TriageBotAgent {
  private endpoint: string;
  private headers: Record<string, string>;
  private context: TriageContext;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
    this.context = {
      conversation_history: [],
      user_preferences: {},
      org_knowledge: {},
    };
  }

  /**
   * Send message to Triage Bot agent
   */
  async chat(message: string): Promise<TriageResponse> {
    const startTime = Date.now();
    
    // Add user message to history
    const userMessage: TriageMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    this.context.conversation_history.push(userMessage);

    // Detect intent
    const intent = this.detectIntent(message);
    this.context.current_intent = intent;

    // Process based on intent
    let response: TriageResponse;

    switch (intent) {
      case 'question':
        response = await this.answerQuestion(message);
        break;
      case 'write':
        response = await this.helpWrite(message);
        break;
      case 'submit':
        response = await this.submitContent(message);
        break;
      case 'classify':
        response = await this.classifyContent(message);
        break;
      case 'help':
        response = this.showHelp();
        break;
      default:
        response = await this.generalChat(message);
    }

    // Add assistant response to history
    const assistantMessage: TriageMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response.message,
      timestamp: new Date().toISOString(),
    };
    this.context.conversation_history.push(assistantMessage);

    // Log session
    const duration = Date.now() - startTime;
    await this.logSession(message, response, intent, duration);

    // Store learnings
    await this.storeLearnings(message, response, intent);

    // Save conversation to memory
    await this.saveConversation();

    return response;
  }

  /**
   * Log agent session
   */
  private async logSession(input: string, output: TriageResponse, intent: string, duration: number): Promise<void> {
    try {
      await agentMemory.logSession({
        agent_id: 'triage-bot',
        agent_type: 'triage',
        action: intent,
        input: { message: input },
        output: { response: output.message, action: output.action },
        status: 'success',
        duration_ms: duration,
        metadata: {
          classification: output.classification,
          category: output.category,
          priority: output.priority,
        },
      });
    } catch (error) {
      console.error('Failed to log session:', error);
    }
  }

  /**
   * Store learnings from interaction
   */
  private async storeLearnings(input: string, output: TriageResponse, intent: string): Promise<void> {
    try {
      // Store pattern if classification was successful
      if (output.classification && output.category) {
        await agentMemory.storeMemory({
          agent_id: 'triage-bot',
          memory_type: 'pattern',
          key: `classification_${output.category}`,
          value: { input, classification: output.classification, category: output.category },
          confidence: 0.8,
        });
      }

      // Store error pattern if there was an error
      if (!output.action) {
        await agentMemory.storeMemory({
          agent_id: 'triage-bot',
          memory_type: 'error',
          key: `error_${intent}`,
          value: { input, error: output.message },
          confidence: 0.9,
        });
      }

      // Write to org_memory via MCP
      await this.writeToOrgMemory(input, output, intent);
    } catch (error) {
      console.error('Failed to store learnings:', error);
    }
  }

  /**
   * Write to org_memory via MCP
   */
  private async writeToOrgMemory(input: string, output: TriageResponse, intent: string): Promise<void> {
    try {
      const request = buildMCPRequest('memory.upsert_org', {
        category: 'triage-bot',
        key: `triage_${Date.now()}`,
        content: JSON.stringify({
          input,
          output: output.message,
          intent,
          classification: output.classification,
          category: output.category,
          priority: output.priority,
        }),
        source: 'triage-bot',
        confidence: 0.8,
        governance_state: 'approved',
      });

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.status === 'error') {
        console.error('Failed to write to org_memory:', data.error?.message);
      }
    } catch (error) {
      console.error('Failed to write to org_memory:', error);
    }
  }

  /**
   * Detect user intent
   */
  private detectIntent(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('?') || lower.startsWith('what') || lower.startsWith('how') || lower.startsWith('why') || lower.startsWith('when') || lower.startsWith('where')) {
      return 'question';
    }

    if (lower.includes('write') || lower.includes('create') || lower.includes('draft') || lower.includes('compose')) {
      return 'write';
    }

    if (lower.includes('submit') || lower.includes('save') || lower.includes('add to') || lower.includes('store')) {
      return 'submit';
    }

    if (lower.includes('classify') || lower.includes('categorize') || lower.includes('tag')) {
      return 'classify';
    }

    if (lower.includes('help') || lower.includes('what can you do')) {
      return 'help';
    }

    return 'general';
  }

  /**
   * Answer question from org_memory
   */
  private async answerQuestion(question: string): Promise<TriageResponse> {
    // Search org_memory for relevant content
    const searchResult = await this.searchOrgMemory(question);

    if (searchResult && searchResult.length > 0) {
      const answer = searchResult[0];
      return {
        message: `Based on our organizational knowledge:\n\n${answer.content}`,
        action: 'answer',
        suggestions: ['Tell me more', 'How does this apply?', 'Submit related content'],
      };
    }

    return {
      message: "I don't have specific information about that in our organizational memory. Would you like me to help you find it or create new content?",
      action: 'answer',
      suggestions: ['Search deeper', 'Create new content', 'Ask Twin'],
    };
  }

  /**
   * Help user write content
   */
  private async helpWrite(message: string): Promise<TriageResponse> {
    // Extract what they want to write about
    const topic = message.replace(/write|create|draft|compose/gi, '').trim();

    // Search for related content
    const related = await this.searchOrgMemory(topic);

    let suggestions: string[] = [];
    if (related && related.length > 0) {
      suggestions = related.slice(0, 3).map(r => `Reference: ${r.key}`);
    }

    return {
      message: `I'll help you write about "${topic}". Here's what I found in our knowledge base:\n\n${related?.map(r => `- ${r.key}: ${r.content?.substring(0, 100)}...`).join('\n') || 'No existing content found.'}\n\nWhat would you like to write?`,
      action: 'write',
      suggestions: ['Start drafting', 'Use existing template', 'Submit to review'],
    };
  }

  /**
   * Submit content to Spine
   */
  private async submitContent(message: string): Promise<TriageResponse> {
    // Extract content to submit
    const content = message.replace(/submit|save|add to|store/gi, '').trim();

    // Auto-classify
    const classification = this.autoClassify(content);
    const category = this.autoCategory(content);

    return {
      message: `I'll submit this content to the knowledge base.\n\nClassification: ${classification}\nCategory: ${category}\n\nReady to submit?`,
      action: 'write',
      classification: classification as any,
      category,
      content_to_write: content,
      suggestions: ['Approve and submit', 'Change classification', 'Edit content'],
    };
  }

  /**
   * Classify content
   */
  private async classifyContent(message: string): Promise<TriageResponse> {
    const content = message.replace(/classify|categorize|tag/gi, '').trim();
    const classification = this.autoClassify(content);
    const category = this.autoCategory(content);

    return {
      message: `Classification result:\n\nLayer: ${classification}\nCategory: ${category}\n\nWould you like to submit this to the knowledge base?`,
      action: 'classify',
      classification: classification as any,
      category,
      suggestions: ['Submit to knowledge base', 'Change classification', 'Discard'],
    };
  }

  /**
   * General chat
   */
  private async generalChat(message: string): Promise<TriageResponse> {
    // Check if user wants to know about capabilities
    if (message.toLowerCase().includes('what can you do') || message.toLowerCase().includes('capabilities')) {
      return this.showHelp();
    }

    // Default response with context awareness
    const recentContext = this.context.conversation_history.slice(-3);
    const contextSummary = recentContext.map(m => `${m.role}: ${m.content.substring(0, 50)}`).join('\n');

    return {
      message: `I'm here to help you manage organizational knowledge. I can:\n\n• Answer questions from our knowledge base\n• Help you write and submit content\n• Classify and categorize information\n• Manage API keys for external tools\n\nWhat would you like to do?`,
      suggestions: ['Ask a question', 'Write content', 'Submit to knowledge base', 'Manage API keys'],
    };
  }

  /**
   * Show help
   */
  private showHelp(): TriageResponse {
    return {
      message: `I'm the Triage Bot — your intelligent knowledge assistant.\n\n**What I can do:**\n\n• **Answer Questions** — Ask me anything about our organization\n• **Help Write** — I'll help you create content\n• **Submit Content** — Send content to the knowledge base\n• **Classify** — Auto-categorize information\n• **Manage API Keys** — Issue keys for external tools\n\n**How to use:**\n• Ask a question: "What is our GTM strategy?"\n• Write content: "Write a blog post about our product"\n• Submit: "Submit this to the knowledge base"\n• Classify: "Classify this document"\n\nI remember our conversations and learn from them.`,
      suggestions: ['Ask a question', 'Write content', 'Submit to knowledge base'],
    };
  }

  /**
   * Search org_memory
   */
  private async searchOrgMemory(query: string): Promise<any[]> {
    try {
      const request = buildMCPRequest('memory.search_org', {
        content: query,
        limit: 5,
      });

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request),
      });

      const data = await response.json();
      return data.result?.items || [];
    } catch (error) {
      console.error('Failed to search org_memory:', error);
      return [];
    }
  }

  /**
   * Auto-classify content
   */
  private autoClassify(content: string): string {
    const lower = content.toLowerCase();

    if (lower.includes('personal') || lower.includes('my') || lower.includes('private')) {
      return 'personal';
    }

    if (lower.includes('team') || lower.includes('company') || lower.includes('organization') || lower.includes('our')) {
      return 'org';
    }

    return 'conversational';
  }

  /**
   * Auto-categorize content
   */
  private autoCategory(content: string): string {
    const lower = content.toLowerCase();

    if (lower.includes('marketing') || lower.includes('campaign') || lower.includes('brand')) {
      return 'marketing';
    }

    if (lower.includes('sales') || lower.includes('deal') || lower.includes('pipeline')) {
      return 'sales';
    }

    if (lower.includes('product') || lower.includes('feature') || lower.includes('roadmap')) {
      return 'product';
    }

    if (lower.includes('engineering') || lower.includes('technical') || lower.includes('architecture')) {
      return 'engineering';
    }

    if (lower.includes('finance') || lower.includes('revenue') || lower.includes('budget')) {
      return 'finance';
    }

    if (lower.includes('hr') || lower.includes('team') || lower.includes('hiring')) {
      return 'hr';
    }

    return 'general';
  }

  /**
   * Save conversation to memory
   */
  private async saveConversation(): Promise<void> {
    try {
      const request = buildMCPRequest('memory.write_conversational', {
        session_id: 'triage-bot-session',
        user_id: 'triage-bot',
        role: 'system',
        content: JSON.stringify(this.context.conversation_history.slice(-10)),
      });

      await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request),
      });
    } catch (error) {
      console.error('Failed to save conversation:', error);
    }
  }

  /**
   * Load conversation from memory
   */
  async loadConversation(): Promise<void> {
    try {
      const request = buildMCPRequest('memory.read_conversational', {
        session_id: 'triage-bot-session',
        limit: 50,
      });

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.result?.items) {
        this.context.conversation_history = data.result.items.map((item: any) => ({
          id: item.id,
          role: item.role,
          content: item.content,
          timestamp: item.created_at,
        }));
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  }

  /**
   * Get conversation history
   */
  getHistory(): TriageMessage[] {
    return this.context.conversation_history;
  }

  /**
   * Clear conversation
   */
  clearHistory(): void {
    this.context.conversation_history = [];
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const triageBot = new TriageBotAgent();

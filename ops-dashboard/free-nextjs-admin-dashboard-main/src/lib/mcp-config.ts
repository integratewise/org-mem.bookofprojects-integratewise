/**
 * MCP Environment Configuration
 * 
 * All tools speak via MCP + Spine only.
 * No direct Supabase access. No direct database access.
 */

export const MCP_CONFIG = {
  // MCP Endpoint (Cloudflare Worker)
  endpoint: process.env.NEXT_PUBLIC_MCP_ENDPOINT || 'https://mcp.integratewise.ai',
  
  // Auth
  apiKey: process.env.NEXT_PUBLIC_MCP_API_KEY || '',
  
  // Tenant
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || '',
  
  // User
  userId: process.env.NEXT_PUBLIC_USER_ID || '',
  
  // Environment
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  
  // Rate limiting
  maxRequestsPerMinute: 1000,
  
  // Timeouts
  requestTimeout: 30000, // 30 seconds
  
  // Retry
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Get auth headers for MCP requests
 */
export function getMCPHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (MCP_CONFIG.apiKey) {
    headers['Authorization'] = `Bearer ${MCP_CONFIG.apiKey}`;
  }
  
  if (MCP_CONFIG.tenantId) {
    headers['x-tenant-id'] = MCP_CONFIG.tenantId;
  }
  
  if (MCP_CONFIG.userId) {
    headers['x-user-id'] = MCP_CONFIG.userId;
  }
  
  return headers;
}

/**
 * Build MCP request payload
 */
export function buildMCPRequest(
  toolName: string,
  args: Record<string, any>
): Record<string, any> {
  return {
    request_id: crypto.randomUUID(),
    actor: {
      tenant_id: MCP_CONFIG.tenantId,
      user_id: MCP_CONFIG.userId,
      roles: ['admin'], // TODO: Get from auth context
    },
    tool: {
      name: toolName,
      arguments: {
        tenant_id: MCP_CONFIG.tenantId,
        ...args,
      },
    },
  };
}

/**
 * MCP Environment Configuration
 * 
 * All tools speak via MCP + Spine only.
 * No direct Supabase access. No direct database access.
 */

export const MCP_CONFIG = {
  // MCP Endpoint (Cloudflare Worker)
  endpoint: process.env.NEXT_PUBLIC_MCP_ENDPOINT || 'https://mcp.integratewise.ai',
  
  // Auth (SERVER-SIDE ONLY - never exposed to browser)
  apiKey: process.env.MCP_API_KEY || '',  // Removed NEXT_PUBLIC_
  
  // Client credentials (manual - server doesn't support auto-registration)
  clientId: process.env.MCP_CLIENT_ID || 'integratewise-ops-dashboard',  // Removed NEXT_PUBLIC_
  clientSecret: process.env.MCP_CLIENT_SECRET || '',  // Removed NEXT_PUBLIC_
  
  // Tenant (public - needed for client requests)
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || '',
  
  // User (public - needed for client requests)
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
  
  if (MCP_CONFIG.clientId) {
    headers['X-Client-ID'] = MCP_CONFIG.clientId;
  }
  
  if (MCP_CONFIG.clientSecret) {
    headers['X-Client-Secret'] = MCP_CONFIG.clientSecret;
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

import { NextRequest, NextResponse } from 'next/server';
import { MCP_CONFIG } from '@/lib/mcp-config';

/**
 * MCP Proxy API Route
 * 
 * Keeps API key server-side only.
 * External tools connect via custom MCP endpoint.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to MCP endpoint with server-side API key
    const response = await fetch(MCP_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MCP_CONFIG.apiKey}`,
        'X-Client-ID': MCP_CONFIG.clientId,
        'X-Client-Secret': MCP_CONFIG.clientSecret,
        'x-tenant-id': MCP_CONFIG.tenantId,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', error: { message: error.message } },
      { status: 500 }
    );
  }
}

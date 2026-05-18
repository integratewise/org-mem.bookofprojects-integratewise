/**
 * Canonical Domain Registry
 *
 * The 12 approved operational continuity domains.
 * New domains require governance approval.
 */

export const APPROVED_DOMAINS = [
  "executive",
  "product",
  "engineering",
  "design",
  "ai-operations",
  "business-operations",
  "sales",
  "marketing",
  "customer-success",
  "finance",
  "research-and-continuity",
  "infrastructure-and-security",
] as const;

export type ApprovedDomain = (typeof APPROVED_DOMAINS)[number];

export const DOMAIN_LABELS: Record<ApprovedDomain, string> = {
  executive: "Executive",
  product: "Product",
  engineering: "Engineering",
  design: "Design",
  "ai-operations": "AI Operations",
  "business-operations": "Business Operations",
  sales: "Sales",
  marketing: "Marketing",
  "customer-success": "Customer Success",
  finance: "Finance",
  "research-and-continuity": "Research & Continuity",
  "infrastructure-and-security": "Infrastructure & Security",
};

export const DOMAIN_COLORS: Record<ApprovedDomain, string> = {
  executive: "#1B2544",
  product: "#EB4F72",
  engineering: "#4154A3",
  design: "#8B5CF6",
  "ai-operations": "#6366F1",
  "business-operations": "#55608C",
  sales: "#D9637F",
  marketing: "#F59E0B",
  "customer-success": "#10B981",
  finance: "#232D42",
  "research-and-continuity": "#3B82F6",
  "infrastructure-and-security": "#EF4444",
};

export function isApprovedDomain(value: string): value is ApprovedDomain {
  return APPROVED_DOMAINS.includes(value as ApprovedDomain);
}

export function normalizeDomain(value: string): ApprovedDomain | null {
  const normalized = value.toLowerCase().trim();
  if (isApprovedDomain(normalized)) return normalized;
  const aliases: Record<string, ApprovedDomain> = {
    "ai ops": "ai-operations",
    "aiops": "ai-operations",
    "biz ops": "business-operations",
    "bizops": "business-operations",
    "cs": "customer-success",
    "cust success": "customer-success",
    "infra": "infrastructure-and-security",
    "security": "infrastructure-and-security",
    "dev": "engineering",
    "research": "research-and-continuity",
    "continuity": "research-and-continuity",
  };
  return aliases[normalized] || null;
}

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
  executive: "#1A2E4A",
  product: "#1A3A2A",
  engineering: "#2A4A6A",
  design: "#D4AC5A",
  "ai-operations": "#2D5A3D",
  "business-operations": "#1A2E4A",
  sales: "#8B2020",
  marketing: "#B8943F",
  "customer-success": "#3D7A50",
  finance: "#0C0C0C",
  "research-and-continuity": "#2D5A3D",
  "infrastructure-and-security": "#8B2020",
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

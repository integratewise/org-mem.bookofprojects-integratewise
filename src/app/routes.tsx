import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/pages/HomePage";
import { BrandAssetsPage } from "./components/pages/BrandAssetsPage";
import { DesignTokensPage } from "./components/pages/DesignTokensPage";
import { MarketingPage } from "./components/pages/MarketingPage";
import { SalesPage } from "./components/pages/SalesPage";
import { StationeryPage } from "./components/pages/StationeryPage";
import { GeneratorsPage } from "./components/pages/GeneratorsPage";
import { DocumentationPage } from "./components/pages/DocumentationPage";
import { CompanyPage } from "./components/pages/CompanyPage";
import { ArchitecturePage } from "./components/pages/ArchitecturePage";
import { LinkedInPage } from "./components/pages/LinkedInPage";
import { WhatsAppPage } from "./components/pages/WhatsAppPage";
import { EmailPage } from "./components/pages/EmailPage";
import { PresentationsPage } from "./components/pages/PresentationsPage";
import { ControlPanelPage } from "./components/pages/ControlPanelPage";
import { QuickStartPage } from "./components/pages/QuickStartPage";
import { ProductGalleryPage } from "./components/pages/ProductGalleryPage";
import { ProductWriteupPage } from "./components/pages/ProductWriteupPage";
import { AccountSuccessPage } from "./components/pages/AccountSuccessPage";
import { BusinessIntelligencePage } from "./components/pages/BusinessIntelligencePage";
import { HowItWorksPage } from "./components/pages/HowItWorksPage";
import { AboutPage } from "./components/pages/AboutPage";
import { PricingPage } from "./components/pages/PricingPage";
import { ContactPage } from "./components/pages/ContactPage";
import { BlogPage } from "./components/pages/BlogPage";

const SECTION_LABELS: Record<string, { label: string; description: string; subsections: string[] }> = {
  '04': {
    label: '04 Customer Success',
    description: 'Onboarding, support, health monitoring, and renewals.',
    subsections: ['Onboarding & Implementation', 'Support & Casework', 'Health & QBRs', 'Renewals & Expansion'],
  },
  '05': {
    label: '05 Operations',
    description: 'Workflow orchestration, runbooks, incident response, and systems administration.',
    subsections: ['Workflow Orchestration', 'Intake Routing & Execution', 'Service Runbooks & DR', 'Observability & Incident Response', 'Systems Administration', 'Data Normalization & Stewardship'],
  },
  '06': {
    label: '06 Finance, Legal, HR',
    description: 'Finance, legal contracts, compliance, HR, and access control.',
    subsections: ['Finance', 'Legal & Contracts', 'Compliance & Risk', 'HR & People Ops', 'Approvals & Access Control'],
  },
  '08': {
    label: '08 External Communications',
    description: 'Website, press, events, community, and partner communications.',
    subsections: ['Website & Public Narrative', 'Press & Newsroom', 'Events & Community', 'Partner Communications'],
  },
  '09': {
    label: '09 Archives & Retention',
    description: 'Yearly archives, legal hold, retention policies, and deletion logs.',
    subsections: ['Yearly Archives', 'Legal Hold', 'Retention Policies', 'Deletion Logs'],
  },
};

function ComingSoonPage() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const section = params.get('section') || '';
  const info = SECTION_LABELS[section] || { label: 'Coming Soon', description: 'This section is being built.', subsections: [] };
  return (
    <div className="p-8 lg:p-12 max-w-3xl mx-auto">
      <div className="rounded-2xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
        <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>IN PROGRESS</p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-strong)' }}>{info.label}</h1>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{info.description}</p>
        {info.subsections.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-faint)' }}>PLANNED SUBSECTIONS</p>
            {info.subsections.map(sub => (
              <div key={sub} className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-base)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border-base)' }} />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{sub}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: (
      <div style={{ padding: 32, fontFamily: 'monospace', color: '#c00' }}>
        <h1>Route Error</h1>
        <p>Something went wrong loading this page. Check the console for details.</p>
      </div>
    ),
    children: [
      { index: true, Component: CompanyPage },
      { path: "quick-start", Component: QuickStartPage },
      { path: "home", Component: HomePage },
      { path: "company", Component: CompanyPage },
      { path: "architecture", Component: ArchitecturePage },
      { path: "brand-assets", Component: BrandAssetsPage },
      { path: "design-tokens", Component: DesignTokensPage },
      { path: "stationery", Component: StationeryPage },
      { path: "generators", Component: GeneratorsPage },
      { path: "marketing", Component: MarketingPage },
      { path: "linkedin", Component: LinkedInPage },
      { path: "whatsapp", Component: WhatsAppPage },
      { path: "email", Component: EmailPage },
      { path: "presentations", Component: PresentationsPage },
      { path: "control-panel", Component: ControlPanelPage },
      { path: "gallery", Component: ProductGalleryPage },
      { path: "product-writeup", Component: ProductWriteupPage },
      { path: "account-success", Component: AccountSuccessPage },
      { path: "business-intelligence", Component: BusinessIntelligencePage },
      { path: "how-it-works", Component: HowItWorksPage },
      { path: "about", Component: AboutPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },
      { path: "blog", Component: BlogPage },
      { path: "sales", Component: SalesPage },
      { path: "documentation", Component: DocumentationPage },
      { path: "coming-soon", Component: ComingSoonPage },
      {
        path: "*",
        Component: () => (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>404</h1>
              <p style={{ color: 'var(--muted-foreground)' }} className="mt-2">Page not found</p>
            </div>
          </div>
        ),
      },
    ],
  },
]);

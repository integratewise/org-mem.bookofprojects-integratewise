import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { WorkbenchLayout } from "./components/WorkbenchLayout";
import { HomePage } from "./components/pages/HomePage";
import { BrandHubPage } from "./components/pages/BrandHubPage";
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
import { EvolutionPage } from "./components/pages/EvolutionPage";
import { WorkbenchPage } from "./components/pages/WorkbenchPage";
import ASDashboard from "./components/pages/account-success/dashboard";
import BizOpsDashboard from "./components/pages/bizops/dashboard";

// BizOps views
import StrategicHubView from "./components/pages/bizops/strategic-hub-view";
import FounderOpsView from "./components/pages/bizops/founder-ops-view";
import CrmView from "./components/pages/bizops/crm-view";
import MarketingView from "./components/pages/bizops/marketing-view";
import OperationsView from "./components/pages/bizops/operations-view";

// Account Success views
import AccountsView from "./components/pages/account-success/accounts-view";
import AtRiskView from "./components/pages/account-success/at-risk-view";
import TasksView from "./components/pages/account-success/tasks-view";
import MeetingsView from "./components/pages/account-success/meetings-view";
import EngagementLogView from "./components/pages/account-success/engagement-log-view";
import InsightsView from "./components/pages/account-success/insights-view";

// ── Placeholder for unbuilt cockpit screens ──────────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center">
        <p className="text-xs font-mono tracking-widest mb-2" style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
          IN PROGRESS
        </p>
        <h2 className="text-xl" style={{ color: "var(--forest)", fontFamily: "var(--font-serif)" }}>{label}</h2>
        <p className="text-sm mt-2" style={{ color: "var(--ink-muted)" }}>This screen is being wired.</p>
      </div>
    </div>
  )
}

const cs = (label: string) => () => <ComingSoon label={label} />

export const router = createBrowserRouter([

  // ── Cockpit — full-screen, no doc nav ─────────────────────────────
  {
    path: "/app",
    Component: WorkbenchLayout,
    children: [
      // Account Success
      { index: true,                                       Component: () => <ComingSoon label="Select a domain" /> },
      { path: "account-success",                           Component: ASDashboard },
      { path: "account-success/accounts",                  Component: AccountsView },
      { path: "account-success/at-risk",                   Component: AtRiskView },
      { path: "account-success/tasks",                     Component: TasksView },
      { path: "account-success/meetings",                  Component: MeetingsView },
      { path: "account-success/engagement-log",            Component: EngagementLogView },
      { path: "account-success/insights",                  Component: InsightsView },
      { path: "account-success/queue",                     Component: cs("Queue") },
      { path: "account-success/decisions",                 Component: cs("Decisions") },
      { path: "account-success/twin",                      Component: () => <WorkbenchPage ctx="account-success" /> },
      { path: "account-success/knowledge",                 Component: cs("Knowledge") },
      { path: "account-success/workflows",                 Component: cs("Workflows") },
      { path: "account-success/settings",                  Component: cs("Settings") },
      // BizOps
      { path: "bizops",                                    Component: BizOpsDashboard },
      { path: "bizops/strategic-hub",                      Component: StrategicHubView },
      { path: "bizops/founder-ops",                        Component: FounderOpsView },
      { path: "bizops/marketing",                          Component: MarketingView },
      { path: "bizops/sales",                              Component: cs("Sales") },
      { path: "bizops/cs",                                 Component: cs("Customer Success") },
      { path: "bizops/product",                            Component: cs("Product & Engineering") },
      { path: "bizops/operations",                         Component: OperationsView },
      { path: "bizops/finance",                            Component: cs("Finance") },
      { path: "bizops/hr",                                 Component: cs("Human Resources") },
      { path: "bizops/legal",                              Component: cs("Legal & Compliance") },
      { path: "bizops/bi",                                 Component: cs("Business Intelligence") },
      { path: "bizops/it",                                 Component: cs("IT & Infrastructure") },
      { path: "bizops/partnerships",                       Component: cs("Partnerships") },
      { path: "bizops/knowledge",                          Component: cs("Knowledge") },
      { path: "bizops/today",                              Component: cs("BizOps Today") },
      { path: "bizops/queue",                              Component: cs("Queue") },
      { path: "bizops/decisions",                          Component: cs("Decisions") },
      { path: "bizops/twin",                               Component: () => <WorkbenchPage ctx="bizops" /> },
      { path: "bizops/workflows",                          Component: cs("Workflows") },
      { path: "bizops/settings",                           Component: cs("Settings") },
    ],
  },

  // ── Doc/brand shell ───────────────────────────────────────────────
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,                  Component: BrandHubPage },
      { path: "quick-start",          Component: QuickStartPage },
      { path: "home",                 Component: HomePage },
      { path: "company",              Component: CompanyPage },
      { path: "architecture",         Component: ArchitecturePage },
      { path: "brand-assets",         Component: BrandAssetsPage },
      { path: "design-tokens",        Component: DesignTokensPage },
      { path: "stationery",           Component: StationeryPage },
      { path: "generators",           Component: GeneratorsPage },
      { path: "marketing",            Component: MarketingPage },
      { path: "linkedin",             Component: LinkedInPage },
      { path: "whatsapp",             Component: WhatsAppPage },
      { path: "email",                Component: EmailPage },
      { path: "presentations",        Component: PresentationsPage },
      { path: "control-panel",        Component: ControlPanelPage },
      { path: "gallery",              Component: ProductGalleryPage },
      { path: "product-writeup",      Component: ProductWriteupPage },
      { path: "account-success",      Component: AccountSuccessPage },
      { path: "business-intelligence",Component: BusinessIntelligencePage },
      { path: "how-it-works",         Component: HowItWorksPage },
      { path: "about",                Component: AboutPage },
      { path: "pricing",              Component: PricingPage },
      { path: "contact",              Component: ContactPage },
      { path: "blog",                 Component: BlogPage },
      { path: "evolution",            Component: EvolutionPage },
      { path: "sales",                Component: SalesPage },
      { path: "documentation",        Component: DocumentationPage },
      { path: "workbench",            Component: WorkbenchPage },
      { path: "coming-soon",          Component: () => <ComingSoon label="Coming Soon" /> },
      {
        path: "*",
        Component: () => (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold" style={{ color: "var(--ink)" }}>404</h1>
              <p style={{ color: "var(--ink-muted)" }} className="mt-2">Page not found</p>
            </div>
          </div>
        ),
      },
    ],
  },
]);

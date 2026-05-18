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
import { RuntimeLayout } from "./runtime/RuntimeLayout";
import { RuntimeDashboardPage } from "./runtime/RuntimeDashboardPage";
import { TriagePage } from "./runtime/TriagePage";
import { KnowledgeHubPage } from "./runtime/KnowledgeHubPage";
import { ReferencePage } from "./runtime/ReferencePage";
import { GovernancePage } from "./runtime/GovernancePage";

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
      { index: true, Component: HomePage },
      { path: "quick-start", Component: QuickStartPage },
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
      { path: "sales", Component: SalesPage },
      { path: "documentation", Component: DocumentationPage },
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
  {
    path: "/runtime",
    Component: RuntimeLayout,
    children: [
      { index: true, Component: RuntimeDashboardPage },
      { path: "triage", Component: TriagePage },
      { path: "knowledge", Component: KnowledgeHubPage },
      { path: "references", Component: ReferencePage },
      { path: "governance", Component: GovernancePage },
    ],
  },
]);
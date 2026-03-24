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
      { path: "company", Component: CompanyPage },
      { path: "architecture", Component: ArchitecturePage },
      { path: "brand-assets", Component: BrandAssetsPage },
      { path: "design-tokens", Component: DesignTokensPage },
      { path: "stationery", Component: StationeryPage },
      { path: "generators", Component: GeneratorsPage },
      { path: "marketing", Component: MarketingPage },
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
]);
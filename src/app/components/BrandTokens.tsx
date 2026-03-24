import { IntegrateWiseLogo } from './IntegrateWiseLogo';

export function BrandTokens() {
  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 py-8">
          <IntegrateWiseLogo variant="compact" className="justify-center" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mt-6">Design System Tokens</h1>
            <p className="text-lg text-gray-600 mt-2">Brand identity & design foundations</p>
          </div>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Color Palette</h2>
          </div>

          {/* Primary Colors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <ColorToken 
                name="Primary" 
                value="#4154A3" 
                variable="--brand-primary"
                description="Main brand color"
              />
              <ColorToken 
                name="Primary Dark" 
                value="#2E3B7A" 
                variable="--brand-primary-dark"
                description="Hover states"
              />
              <ColorToken 
                name="Primary Light" 
                value="#5A6BBD" 
                variable="--brand-primary-light"
                description="Backgrounds"
              />
            </div>
          </div>

          {/* Accent Colors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Accent Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <ColorToken 
                name="Accent" 
                value="#EB4379" 
                variable="--brand-accent"
                description="Call to action"
              />
              <ColorToken 
                name="Accent Dark" 
                value="#C83362" 
                variable="--brand-accent-dark"
                description="Hover states"
              />
              <ColorToken 
                name="Accent Light" 
                value="#F26694" 
                variable="--brand-accent-light"
                description="Highlights"
              />
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ColorToken 
                name="Success" 
                value="#10B981" 
                variable="--brand-success"
                description="Positive actions"
              />
              <ColorToken 
                name="Warning" 
                value="#F59E0B" 
                variable="--brand-warning"
                description="Caution states"
              />
              <ColorToken 
                name="Error" 
                value="#EF4444" 
                variable="--brand-error"
                description="Error states"
              />
              <ColorToken 
                name="Info" 
                value="#3B82F6" 
                variable="--brand-info"
                description="Informational"
              />
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Neutral Grays</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="flex flex-col gap-2">
                  <div 
                    className="h-20 rounded-lg border border-gray-200"
                    style={{ background: `var(--brand-gray-${shade})` }}
                  ></div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">{shade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Typography</h2>
          </div>

          {/* Font Sizes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Type Scale</h3>
            <div className="space-y-6">
              <TypeScale size="5xl" value="3rem" pixels="48px" />
              <TypeScale size="4xl" value="2.25rem" pixels="36px" />
              <TypeScale size="3xl" value="1.875rem" pixels="30px" />
              <TypeScale size="2xl" value="1.5rem" pixels="24px" />
              <TypeScale size="xl" value="1.25rem" pixels="20px" />
              <TypeScale size="lg" value="1.125rem" pixels="18px" />
              <TypeScale size="base" value="1rem" pixels="16px" />
              <TypeScale size="sm" value="0.875rem" pixels="14px" />
              <TypeScale size="xs" value="0.75rem" pixels="12px" />
            </div>
          </div>

          {/* Font Weights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Font Weights</h3>
            <div className="space-y-4">
              <FontWeight weight="Light" value="300" />
              <FontWeight weight="Normal" value="400" />
              <FontWeight weight="Medium" value="500" />
              <FontWeight weight="Semibold" value="600" />
              <FontWeight weight="Bold" value="700" />
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Spacing Scale</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="space-y-4">
              <SpacingToken size="xs" value="0.25rem" pixels="4px" />
              <SpacingToken size="sm" value="0.5rem" pixels="8px" />
              <SpacingToken size="md" value="1rem" pixels="16px" />
              <SpacingToken size="lg" value="1.5rem" pixels="24px" />
              <SpacingToken size="xl" value="2rem" pixels="32px" />
              <SpacingToken size="2xl" value="3rem" pixels="48px" />
              <SpacingToken size="3xl" value="4rem" pixels="64px" />
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Border Radius</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <RadiusToken size="xs" value="0.25rem" pixels="4px" />
              <RadiusToken size="sm" value="0.375rem" pixels="6px" />
              <RadiusToken size="md" value="0.5rem" pixels="8px" />
              <RadiusToken size="lg" value="0.625rem" pixels="10px" />
              <RadiusToken size="xl" value="0.75rem" pixels="12px" />
              <RadiusToken size="2xl" value="1rem" pixels="16px" />
              <RadiusToken size="3xl" value="1.5rem" pixels="24px" />
              <RadiusToken size="full" value="9999px" pixels="Full" />
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Elevation</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ShadowToken level="sm" description="Subtle lift" />
              <ShadowToken level="md" description="Card elevation" />
              <ShadowToken level="lg" description="Dropdown menus" />
              <ShadowToken level="xl" description="Modal overlays" />
              <ShadowToken level="2xl" description="Premium effects" />
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }}></div>
            <h2 className="text-2xl font-semibold text-gray-900">Component Examples</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h3>
              <button className="px-6 py-3 rounded-lg font-medium text-white transition-colors" style={{ background: 'var(--brand-primary)' }}>
                Primary Button
              </button>
              <button className="px-6 py-3 rounded-lg font-medium text-white transition-colors" style={{ background: 'var(--brand-accent)' }}>
                Accent Button
              </button>
              <button className="px-6 py-3 rounded-lg font-medium transition-colors" style={{ background: 'var(--brand-gray-100)', color: 'var(--brand-gray-900)' }}>
                Secondary Button
              </button>
            </div>

            {/* Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cards</h3>
              <div className="space-y-4">
                <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--brand-gray-200)' }}>
                  <h4 className="font-semibold" style={{ color: 'var(--brand-gray-900)' }}>Card Title</h4>
                  <p className="text-sm mt-2" style={{ color: 'var(--brand-gray-600)' }}>Card description with neutral colors</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: 'var(--brand-primary)', color: 'white' }}>
                  <h4 className="font-semibold">Featured Card</h4>
                  <p className="text-sm mt-2 opacity-90">Primary brand color background</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper Components
interface ColorTokenProps {
  name: string;
  value: string;
  variable: string;
  description: string;
}

function ColorToken({ name, value, variable, description }: ColorTokenProps) {
  return (
    <div className="flex flex-col gap-3">
      <div 
        className="h-24 rounded-lg border border-gray-200 shadow-sm"
        style={{ background: value }}
      ></div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-600 font-mono mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

interface TypeScaleProps {
  size: string;
  value: string;
  pixels: string;
}

function TypeScale({ size, value, pixels }: TypeScaleProps) {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
      <div className="flex-1">
        <p className="font-semibold" style={{ fontSize: value }}>
          The quick brown fox
        </p>
      </div>
      <div className="text-right ml-4">
        <p className="text-sm font-medium text-gray-900">{size}</p>
        <p className="text-xs text-gray-600 font-mono">{value}</p>
        <p className="text-xs text-gray-500">{pixels}</p>
      </div>
    </div>
  );
}

interface FontWeightProps {
  weight: string;
  value: string;
}

function FontWeight({ weight, value }: FontWeightProps) {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
      <p className="text-2xl" style={{ fontWeight: value }}>
        The quick brown fox
      </p>
      <div className="text-right ml-4">
        <p className="text-sm font-medium text-gray-900">{weight}</p>
        <p className="text-xs text-gray-600 font-mono">{value}</p>
      </div>
    </div>
  );
}

interface SpacingTokenProps {
  size: string;
  value: string;
  pixels: string;
}

function SpacingToken({ size, value, pixels }: SpacingTokenProps) {
  return (
    <div className="flex items-center gap-4">
      <div 
        className="h-12 rounded bg-brand-primary"
        style={{ width: value }}
      ></div>
      <div className="flex-1 flex items-center justify-between">
        <p className="font-medium text-gray-900">space-{size}</p>
        <div className="text-right">
          <p className="text-sm text-gray-600 font-mono">{value}</p>
          <p className="text-xs text-gray-500">{pixels}</p>
        </div>
      </div>
    </div>
  );
}

interface RadiusTokenProps {
  size: string;
  value: string;
  pixels: string;
}

function RadiusToken({ size, value, pixels }: RadiusTokenProps) {
  return (
    <div className="flex flex-col gap-3">
      <div 
        className="h-24 bg-gradient-to-br from-blue-500 to-purple-600"
        style={{ borderRadius: value }}
      ></div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">radius-{size}</p>
        <p className="text-xs text-gray-600 font-mono mt-1">{value}</p>
        <p className="text-xs text-gray-500">{pixels}</p>
      </div>
    </div>
  );
}

interface ShadowTokenProps {
  level: string;
  description: string;
}

function ShadowToken({ level, description }: ShadowTokenProps) {
  const shadowVar = `var(--shadow-${level})`;
  return (
    <div className="flex flex-col gap-3">
      <div 
        className="h-32 bg-white rounded-xl flex items-center justify-center"
        style={{ boxShadow: shadowVar }}
      >
        <p className="text-gray-600 font-medium">shadow-{level}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">Level {level}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

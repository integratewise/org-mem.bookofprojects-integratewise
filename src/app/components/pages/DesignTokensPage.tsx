import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

/* ═══ Clipboard helper ═══ */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        copyToClipboard(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="p-1 rounded hover:bg-[#E8ECF2] transition-colors"
      title={`Copy ${text}`}
    >
      {copied ? (
        <Check className="w-3 h-3" style={{ color: '#10B981' }} />
      ) : (
        <Copy className="w-3 h-3" style={{ color: '#9BA8C2' }} />
      )}
    </button>
  );
}

/* ═══ Main page ═══ */
export function DesignTokensPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold" style={{ color: '#1B2544' }}>
          Design Tokens
        </h2>
        <p className="mt-1" style={{ color: '#7B8AAD' }}>
          The single source of truth for IntegrateWise brand colors, typography, spacing, radius, and elevation — all values match{' '}
          <code
            className="text-xs font-mono px-1 py-0.5 rounded"
            style={{ background: '#F0F2F7', color: '#4154A3' }}
          >
            theme.css
          </code>{' '}
          exactly.
        </p>
      </div>

      {/* ─── Color Palette ─── */}
      <section className="space-y-6">
        <SectionHeader title="Color Palette" />

        {/* Primary + Accent */}
        <TokenCard title="Brand Colors">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            <ColorToken name="Primary" hex="#4154A3" variable="--brand-primary" usage="Buttons, links, active nav" />
            <ColorToken name="Primary Dark" hex="#364789" variable="--brand-primary-dark" usage="Hover states, gradients" />
            <ColorToken name="Primary Light" hex="#6B7DC4" variable="--brand-primary-light" usage="Secondary highlights" />
            <ColorToken name="Accent" hex="#EB4379" variable="--brand-accent" usage="CTAs, logo dot, emphasis" />
            <ColorToken name="Accent Dark" hex="#D03568" variable="--brand-accent-dark" usage="Hover states" />
            <ColorToken name="Accent Light" hex="#F26694" variable="--brand-accent-light" usage="Soft highlights" />
          </div>
        </TokenCard>

        {/* Blue-Grey Neutrals */}
        <TokenCard title="Blue-Grey Neutrals (Brand-Aligned)">
          <p className="text-xs mb-5" style={{ color: '#7B8AAD' }}>
            These are NOT standard Tailwind grays. They carry a blue undertone that aligns with the primary palette, extracted directly from the Figma design system.
          </p>
          <div className="space-y-0 rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
            {/* App background - special token */}
            <NeutralRow
              name="Background"
              hex="#EDF0F5"
              variable="--brand-bg"
              usage="Main app background"
              textDark
            />
            {([
              { shade: '50', hex: '#F0F2F7', variable: '--brand-gray-50', usage: 'Card inner fills, input backgrounds' },
              { shade: '100', hex: '#E8ECF2', variable: '--brand-gray-100', usage: 'Light borders, dividers' },
              { shade: '200', hex: '#D5DAE5', variable: '--brand-gray-200', usage: 'Borders, separators' },
              { shade: '300', hex: '#BCC3D4', variable: '--brand-gray-300', usage: 'Disabled icons, subtle UI' },
              { shade: '400', hex: '#9BA8C2', variable: '--brand-gray-400', usage: 'Captions, labels, timestamps' },
              { shade: '500', hex: '#7B8AAD', variable: '--brand-gray-500', usage: 'Sidebar icons, secondary text' },
              { shade: '600', hex: '#5F6E93', variable: '--brand-gray-600', usage: 'Nav items, body text' },
              { shade: '700', hex: '#475578', variable: '--brand-gray-700', usage: 'Emphasis body text' },
              { shade: '800', hex: '#2F3D5E', variable: '--brand-gray-800', usage: 'Strong body text, labels' },
              { shade: '900', hex: '#1B2544', variable: '--brand-gray-900', usage: 'Headings, maximum contrast' },
            ] as const).map((t) => (
              <NeutralRow
                key={t.shade}
                name={`Gray ${t.shade}`}
                hex={t.hex}
                variable={t.variable}
                usage={t.usage}
                textDark={Number(t.shade) <= 400}
              />
            ))}
          </div>
        </TokenCard>

        {/* Semantic Colors */}
        <TokenCard title="Semantic Colors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <ColorToken name="Success" hex="#10B981" variable="--brand-success" usage="Positive states" />
            <ColorToken name="Warning" hex="#F59E0B" variable="--brand-warning" usage="Caution states" />
            <ColorToken name="Error" hex="#EF4444" variable="--brand-error" usage="Error states" />
            <ColorToken name="Info" hex="#3B82F6" variable="--brand-info" usage="Informational" />
          </div>
        </TokenCard>

        {/* Brand Gradient */}
        <TokenCard title="Brand Gradient">
          <div className="space-y-4">
            <div
              className="h-28 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #4154A3 0%, #364789 50%, #EB4379 100%)' }}
            />
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: '#F0F2F7', color: '#475578' }}>
                linear-gradient(135deg, #4154A3 0%, #364789 50%, #EB4379 100%)
              </code>
              <CopyButton text="linear-gradient(135deg, #4154A3 0%, #364789 50%, #EB4379 100%)" />
            </div>
            <p className="text-xs" style={{ color: '#7B8AAD' }}>
              Used on hero banners, card accents, and marketing backgrounds. Primary Blue flows through Dark Navy into Accent Pink.
            </p>
          </div>
        </TokenCard>
      </section>

      {/* ─── Typography ─── */}
      <section className="space-y-6">
        <SectionHeader title="Typography" />

        <TokenCard title="Type Scale">
          <div className="space-y-5">
            {([
              { name: '5xl', rem: '3rem', px: '48px', variable: '--text-5xl' },
              { name: '4xl', rem: '2.25rem', px: '36px', variable: '--text-4xl' },
              { name: '3xl', rem: '1.875rem', px: '30px', variable: '--text-3xl' },
              { name: '2xl', rem: '1.5rem', px: '24px', variable: '--text-2xl' },
              { name: 'xl', rem: '1.25rem', px: '20px', variable: '--text-xl' },
              { name: 'lg', rem: '1.125rem', px: '18px', variable: '--text-lg' },
              { name: 'base', rem: '1rem', px: '16px', variable: '--text-base' },
              { name: 'sm', rem: '0.875rem', px: '14px', variable: '--text-sm' },
              { name: 'xs', rem: '0.75rem', px: '12px', variable: '--text-xs' },
            ] as const).map((t) => (
              <div
                key={t.name}
                className="flex items-baseline justify-between pb-4"
                style={{ borderBottom: '1px solid #E8ECF2' }}
              >
                <p className="flex-1 font-semibold" style={{ fontSize: t.rem, color: '#1B2544' }}>
                  The quick brown fox
                </p>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-sm font-medium" style={{ color: '#1B2544' }}>{t.name}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="text-xs font-mono" style={{ color: '#5F6E93' }}>
                      {t.rem} / {t.px}
                    </p>
                    <CopyButton text={t.variable} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TokenCard>

        <TokenCard title="Font Weights">
          <div className="space-y-4">
            {([
              { name: 'Light', value: '300', variable: '--font-weight-light' },
              { name: 'Normal', value: '400', variable: '--font-weight-normal' },
              { name: 'Medium', value: '500', variable: '--font-weight-medium' },
              { name: 'Semibold', value: '600', variable: '--font-weight-semibold' },
              { name: 'Bold', value: '700', variable: '--font-weight-bold' },
            ] as const).map((w) => (
              <div
                key={w.name}
                className="flex items-baseline justify-between pb-3"
                style={{ borderBottom: '1px solid #E8ECF2' }}
              >
                <p className="text-2xl" style={{ fontWeight: w.value, color: '#1B2544' }}>
                  The quick brown fox
                </p>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-sm font-medium" style={{ color: '#1B2544' }}>{w.name}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="text-xs font-mono" style={{ color: '#5F6E93' }}>{w.value}</p>
                    <CopyButton text={w.variable} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

      {/* ─── Spacing ─── */}
      <section className="space-y-6">
        <SectionHeader title="Spacing Scale" />
        <TokenCard>
          <div className="space-y-4">
            {([
              { name: 'xs', rem: '0.25rem', px: '4px' },
              { name: 'sm', rem: '0.5rem', px: '8px' },
              { name: 'md', rem: '1rem', px: '16px' },
              { name: 'lg', rem: '1.5rem', px: '24px' },
              { name: 'xl', rem: '2rem', px: '32px' },
              { name: '2xl', rem: '3rem', px: '48px' },
              { name: '3xl', rem: '4rem', px: '64px' },
            ] as const).map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <div
                  className="h-12 rounded"
                  style={{ width: s.rem, background: '#4154A3' }}
                />
                <div className="flex-1 flex items-center justify-between">
                  <p className="font-medium" style={{ color: '#1B2544' }}>
                    space-{s.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono" style={{ color: '#5F6E93' }}>
                      {s.rem}
                    </p>
                    <p className="text-xs" style={{ color: '#9BA8C2' }}>{s.px}</p>
                    <CopyButton text={`--space-${s.name}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

      {/* ─── Border Radius ─── */}
      <section className="space-y-6">
        <SectionHeader title="Border Radius" />
        <TokenCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { name: 'xs', rem: '0.25rem', px: '4px' },
              { name: 'sm', rem: '0.375rem', px: '6px' },
              { name: 'md', rem: '0.5rem', px: '8px' },
              { name: 'lg', rem: '0.625rem', px: '10px' },
              { name: 'xl', rem: '0.75rem', px: '12px' },
              { name: '2xl', rem: '1rem', px: '16px' },
              { name: '3xl', rem: '1.5rem', px: '24px' },
              { name: 'full', rem: '9999px', px: 'Full' },
            ] as const).map((r) => (
              <div key={r.name} className="flex flex-col gap-3">
                <div
                  className="h-24"
                  style={{
                    borderRadius: r.rem,
                    background: 'linear-gradient(135deg, #4154A3, #EB4379)',
                  }}
                />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1B2544' }}>
                      radius-{r.name}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: '#5F6E93' }}>
                      {r.rem}
                    </p>
                    <p className="text-xs" style={{ color: '#9BA8C2' }}>{r.px}</p>
                  </div>
                  <CopyButton text={`--radius-${r.name}`} />
                </div>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

      {/* ─── Elevation / Shadows ─── */}
      <section className="space-y-6">
        <SectionHeader title="Elevation" />
        <TokenCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              { name: 'sm', desc: 'Subtle lift', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
              { name: 'md', desc: 'Card elevation', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
              { name: 'lg', desc: 'Dropdown menus', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
              { name: 'xl', desc: 'Modal overlays', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
              { name: '2xl', desc: 'Premium effects', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
            ] as const).map((s) => (
              <div key={s.name} className="flex flex-col gap-3">
                <div
                  className="h-32 bg-white rounded-xl flex items-center justify-center"
                  style={{ boxShadow: s.value }}
                >
                  <p className="font-medium" style={{ color: '#5F6E93' }}>
                    shadow-{s.name}
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1B2544' }}>
                      Level {s.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#7B8AAD' }}>
                      {s.desc}
                    </p>
                  </div>
                  <CopyButton text={`--shadow-${s.name}`} />
                </div>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

      {/* ─── Component Examples ─── */}
      <section className="space-y-6 pb-8">
        <SectionHeader title="Component Examples" />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Buttons */}
          <TokenCard title="Buttons">
            <div className="flex flex-wrap gap-3">
              <button
                className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
                style={{ background: '#4154A3' }}
              >
                Primary
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
                style={{ background: '#EB4379' }}
              >
                Accent
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: '#F0F2F7', color: '#1B2544' }}
              >
                Secondary
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: 'transparent', color: '#5F6E93', border: '1px solid #D5DAE5' }}
              >
                Ghost
              </button>
            </div>
          </TokenCard>

          {/* Cards */}
          <TokenCard title="Cards">
            <div className="space-y-4">
              <div
                className="p-6 rounded-xl"
                style={{ border: '1px solid #D5DAE5' }}
              >
                <h4 className="font-semibold" style={{ color: '#1B2544' }}>
                  Default Card
                </h4>
                <p className="text-sm mt-2" style={{ color: '#5F6E93' }}>
                  White card with blue-grey border
                </p>
              </div>
              <div
                className="p-6 rounded-xl text-white"
                style={{ background: '#4154A3' }}
              >
                <h4 className="font-semibold">Featured Card</h4>
                <p className="text-sm mt-2 opacity-80">
                  Primary brand color background
                </p>
              </div>
            </div>
          </TokenCard>

          {/* Inputs */}
          <TokenCard title="Inputs">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Default input"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
                style={{ background: '#F0F2F7', border: '1px solid #D5DAE5', color: '#1B2544' }}
                readOnly
              />
              <input
                type="text"
                placeholder="Focused input"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                style={{ background: 'white', border: '2px solid #4154A3', color: '#1B2544' }}
                readOnly
              />
            </div>
          </TokenCard>

          {/* Badges */}
          <TokenCard title="Status Badges">
            <div className="flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: '#E8F5EE', color: '#10B981' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                Ready
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: '#FEF3C7', color: '#F59E0B' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B' }} />
                In Review
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: '#F0F2F7', color: '#7B8AAD' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#9BA8C2' }} />
                Draft
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(65,84,163,0.08)', color: '#4154A3' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4154A3' }} />
                Active
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(235,67,121,0.08)', color: '#EB4379' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#EB4379' }} />
                Featured
              </span>
            </div>
          </TokenCard>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════ */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-12 rounded-full" style={{ background: '#4154A3' }} />
      <h2 className="text-xl font-semibold" style={{ color: '#1B2544' }}>
        {title}
      </h2>
    </div>
  );
}

function TokenCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-8" style={{ border: '1px solid #D5DAE5' }}>
      {title && (
        <h3 className="text-base font-semibold mb-6" style={{ color: '#1B2544' }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

/* ─── Color swatch with hex + variable + usage ─── */
function ColorToken({
  name,
  hex,
  variable,
  usage,
}: {
  name: string;
  hex: string;
  variable: string;
  usage: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-24 rounded-lg"
        style={{ background: hex, border: '1px solid #D5DAE5' }}
      />
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm" style={{ color: '#1B2544' }}>
            {name}
          </p>
          <CopyButton text={hex} />
        </div>
        <p className="text-xs font-mono mt-0.5" style={{ color: '#5F6E93' }}>
          {hex}
        </p>
        <p
          className="text-[10px] font-mono mt-0.5"
          style={{ color: '#9BA8C2' }}
        >
          {variable}
        </p>
        <p className="text-xs mt-1" style={{ color: '#7B8AAD' }}>
          {usage}
        </p>
      </div>
    </div>
  );
}

/* ─── Neutral row (full-width swatch + metadata) ─── */
function NeutralRow({
  name,
  hex,
  variable,
  usage,
  textDark,
}: {
  name: string;
  hex: string;
  variable: string;
  usage: string;
  textDark: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3"
      style={{ background: hex }}
    >
      <p
        className="text-sm font-semibold w-28 shrink-0"
        style={{ color: textDark ? '#1B2544' : '#F0F2F7' }}
      >
        {name}
      </p>
      <code
        className="text-xs font-mono w-20 shrink-0"
        style={{ color: textDark ? '#475578' : '#D5DAE5' }}
      >
        {hex}
      </code>
      <code
        className="text-[11px] font-mono w-36 shrink-0 hidden sm:block"
        style={{ color: textDark ? '#7B8AAD' : '#BCC3D4' }}
      >
        {variable}
      </code>
      <p
        className="text-xs flex-1 hidden md:block"
        style={{ color: textDark ? '#7B8AAD' : '#BCC3D4' }}
      >
        {usage}
      </p>
      <CopyButton text={hex} />
    </div>
  );
}
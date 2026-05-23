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
      className="p-1 rounded hover:bg-[var(--paper-deep)] transition-colors"
      title={`Copy ${text}`}
    >
      {copied ? (
        <Check className="w-3 h-3" style={{ color: 'var(--forest-bright)' }} />
      ) : (
        <Copy className="w-3 h-3" style={{ color: 'var(--slate-mid)' }} />
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
        <h2 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>
          Design Tokens
        </h2>
        <p className="mt-1" style={{ color: 'var(--slate-mid)' }}>
          The single source of truth for the canonical Forest + Paper design system — colors, typography, spacing, radius, and elevation all match{' '}
          <code
            className="text-xs font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--paper-warm)', color: 'var(--forest)' }}
          >
            theme.css
          </code>{' '}
          exactly, with Forest + Paper as the governing product/runtime language.
        </p>
      </div>

      {/* ─── Canonical Palette ─── */}
      <section className="space-y-6">
        <SectionHeader title="Canonical Palette" />

        {/* Primary + Gold Accent */}
        <TokenCard title="Forest + Gold Scale">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            <ColorToken name="Forest" hex="#1A3A2A" variable="--forest" usage="Primary runtime shell, emphasis, active UI" />
            <ColorToken name="Forest Mid" hex="#2D5A3D" variable="--forest-mid" usage="Depth, dark surfaces, hover states" />
            <ColorToken name="Forest Bright" hex="#3D7A50" variable="--forest-bright" usage="Positive states, vitality, subtle highlights" />
            <ColorToken name="Gold" hex="#B8943F" variable="--gold" usage="Calls to action, accent marks, approvals" />
            <ColorToken name="Gold Light" hex="#D4AC5A" variable="--gold-light" usage="Hover states, warm highlights" />
            <ColorToken name="Gold Pale" hex="#F0E0B0" variable="--gold-pale" usage="Soft emphasis and decorative fills" />
          </div>
        </TokenCard>

        {/* Paper, rule, and neutral surfaces */}
        <TokenCard title="Paper, Rules & Editorial Neutrals">
          <p className="text-xs mb-5" style={{ color: 'var(--slate-mid)' }}>
            These are the canonical paper and rule surfaces used across the product shell, doctrine surfaces, and continuity interfaces.
          </p>
          <div className="space-y-0 rounded-xl overflow-hidden" style={{ border: '1px solid var(--rule-light)' }}>
            {/* App background - special token */}
            <NeutralRow
              name="Paper"
              hex="#F4F0E8"
              variable="--paper"
              usage="Primary product and documentation surface"
              textDark
            />
            {([
              { shade: 'warm', hex: '#EBE5D8', variable: '--paper-warm', usage: 'Secondary paper surfaces, embedded panels' },
              { shade: 'deep', hex: '#E0D9C8', variable: '--paper-deep', usage: 'Inset backgrounds, muted blocks' },
              { shade: 'rule-light', hex: '#D8D0C0', variable: '--rule-light', usage: 'Dividers, table borders, separators' },
              { shade: 'rule', hex: '#C4BAA8', variable: '--rule', usage: 'Stronger rules and structural lines' },
              { shade: 'slate-mid', hex: '#2A4A6A', variable: '--slate-mid', usage: 'Secondary text, metadata, technical accents' },
              { shade: 'slate', hex: '#1A2E4A', variable: '--slate', usage: 'Structured technical emphasis' },
              { shade: 'ink', hex: '#0C0C0C', variable: '--ink', usage: 'Maximum contrast text and marks' },
            ] as const).map((t) => (
              <NeutralRow
                key={t.shade}
                name={String(t.shade)}
                hex={t.hex}
                variable={t.variable}
                usage={t.usage}
                textDark={!['slate-mid', 'slate', 'ink'].includes(String(t.shade))}
              />
            ))}
          </div>
        </TokenCard>

        {/* Semantic Colors */}
        <TokenCard title="Semantic Colors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <ColorToken name="Success" hex="var(--forest-bright)" variable="--brand-success" usage="Positive states" />
            <ColorToken name="Warning" hex="var(--gold)" variable="--brand-warning" usage="Caution states" />
            <ColorToken name="Error" hex="var(--red)" variable="--brand-error" usage="Error states" />
            <ColorToken name="Info" hex="var(--slate-mid)" variable="--brand-info" usage="Informational" />
          </div>
        </TokenCard>

        {/* Brand Gradient */}
        <TokenCard title="Brand Gradient">
          <div className="space-y-4">
            <div
              className="h-28 rounded-xl"
              style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 50%, var(--gold) 100%)' }}
            />
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'var(--paper-warm)', color: 'var(--forest-mid)' }}>
                linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 50%, var(--gold) 100%)
              </code>
              <CopyButton text="linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 50%, var(--gold) 100%)" />
            </div>
            <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>
              Used on hero banners, card accents, and marketing backgrounds. Forest establishes the primary tone, while gold provides editorial emphasis and action cues.
            </p>
          </div>
        </TokenCard>
      </section>

      {/* ─── Typography Families ─── */}
      <section className="space-y-6">
        <SectionHeader title="Typography Families" />

        <TokenCard title="Type Scale & Families">
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>Instrument Sans</p>
              <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Primary UI and body family for readable product and documentation surfaces.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>DM Serif Display</p>
              <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Editorial and display headings for the paper-like continuity voice.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>IBM Plex Mono</p>
              <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Tokens, technical labels, code, schemas, and system references.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>Bebas Neue</p>
              <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Condensed emphasis for posters, section marks, and high-contrast callouts.</p>
            </div>
          </div>
          <div className="space-y-5">
            {([
              { name: 'display', rem: 'clamp(64px,9vw,128px)', px: '64–128px', variable: '--text-display' },
              { name: '3xl',     rem: '1.6875rem',             px: '27px',     variable: '--text-3xl' },
              { name: '2xl',     rem: '1.5rem',                px: '24px',     variable: '--text-2xl' },
              { name: 'xl',      rem: '1.3125rem',             px: '21px',     variable: '--text-xl' },
              { name: 'lg',      rem: '1.1875rem',             px: '19px',     variable: '--text-lg' },
              { name: 'md',      rem: '1rem',                  px: '16px',     variable: '--text-md' },
              { name: 'base',    rem: '0.90625rem',            px: '14.5px',   variable: '--text-base' },
              { name: 'sm',      rem: '0.875rem',              px: '14px',     variable: '--text-sm' },
              { name: 'xs',      rem: '0.6875rem',             px: '11px',     variable: '--text-xs' },
            ] as const).map((t) => (
              <div
                key={t.name}
                className="flex items-baseline justify-between pb-4"
                style={{ borderBottom: '1px solid var(--paper-deep)' }}
              >
                <p className="flex-1 font-semibold" style={{ fontSize: t.rem, color: 'var(--ink)' }}>
                  The continuity system speaks clearly
                </p>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{t.name}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="text-xs font-mono" style={{ color: 'var(--slate)' }}>
                      {t.rem} / {t.px}
                    </p>
                    <CopyButton text={t.variable} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TokenCard>

        <TokenCard title="Font Weights & Usage">
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
                style={{ borderBottom: '1px solid var(--paper-deep)' }}
              >
                <p className="text-2xl" style={{ fontWeight: w.value, color: 'var(--ink)' }}>
                  The continuity system speaks clearly
                </p>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{w.name}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="text-xs font-mono" style={{ color: 'var(--slate)' }}>{w.value}</p>
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
                  style={{ width: s.rem, background: 'var(--forest)' }}
                />
                <div className="flex-1 flex items-center justify-between">
                  <p className="font-medium" style={{ color: 'var(--ink)' }}>
                    space-{s.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono" style={{ color: 'var(--slate)' }}>
                      {s.rem}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>{s.px}</p>
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
                    background: 'linear-gradient(135deg, var(--forest), var(--gold))',
                  }}
                />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                      radius-{r.name}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--slate)' }}>
                      {r.rem}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>{r.px}</p>
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
                  className="h-32 rounded-xl flex items-center justify-center"
                  style={{ boxShadow: s.value, background: 'var(--paper)' }}
                >
                  <p className="font-medium" style={{ color: 'var(--slate)' }}>
                    shadow-{s.name}
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                      Level {s.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--slate-mid)' }}>
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
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: 'var(--forest)', color: 'var(--paper)' }}
              >
                Primary
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: 'var(--gold)', color: 'var(--forest)' }}
              >
                Gold Accent
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: 'var(--paper-warm)', color: 'var(--ink)' }}
              >
                Secondary
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ background: 'transparent', color: 'var(--slate)', border: '1px solid var(--rule-light)' }}
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
                style={{ border: '1px solid var(--rule-light)' }}
              >
                <h4 className="font-semibold" style={{ color: 'var(--ink)' }}>
                  Default Card
                </h4>
                <p className="text-sm mt-2" style={{ color: 'var(--slate)' }}>
                  Paper card with warm rule-line structure
                </p>
              </div>
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--forest)', color: 'var(--paper)' }}
              >
                <h4 className="font-semibold">Canonical Accent Card</h4>
                <p className="text-sm mt-2 opacity-80">Primary brand color background</p>
              </div>
            </div>
          </TokenCard>

          {/* Inputs */}
          <TokenCard title="Inputs">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Default input"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--forest)]/30"
                style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)', color: 'var(--ink)' }}
                readOnly
              />
              <input
                type="text"
                placeholder="Focused input"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                style={{ background: 'var(--paper-warm)', border: '2px solid var(--forest)', color: 'var(--ink)' }}
                readOnly
              />
            </div>
          </TokenCard>

          {/* Badges */}
          <TokenCard title="Status Badges">
            <div className="flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(61,122,80,0.12)', color: 'var(--forest-bright)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--forest-bright)' }} />
                Ready
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(184,148,63,0.14)', color: 'var(--gold)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                In Review
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'var(--paper-warm)', color: 'var(--slate-mid)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--slate-mid)' }} />
                Draft
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(26,58,42,0.08)', color: 'var(--forest)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--forest)' }} />
                Active
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(184,148,63,0.10)', color: 'var(--gold)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                Canonical Accent
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
      <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
      <h2 className="text-xl font-semibold" style={{ color: 'var(--ink)' }}>
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
    <div className="rounded-xl p-8" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)', boxShadow: '0 1px 4px 0 rgba(12,12,12,0.06)' }}>
      {title && (
        <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--ink)' }}>
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
        style={{ background: hex, border: '1px solid var(--rule-light)' }}
      />
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
            {name}
          </p>
          <CopyButton text={hex} />
        </div>
        <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--slate)' }}>
          {hex}
        </p>
        <p
          className="text-[10px] font-mono mt-0.5"
          style={{ color: 'var(--slate-mid)' }}
        >
          {variable}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--slate-mid)' }}>
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
        style={{ color: textDark ? 'var(--ink)' : 'var(--paper-warm)' }}
      >
        {name}
      </p>
      <code
        className="text-xs font-mono w-20 shrink-0"
        style={{ color: textDark ? 'var(--forest-mid)' : 'var(--rule-light)' }}
      >
        {hex}
      </code>
      <code
        className="text-[11px] font-mono w-36 shrink-0 hidden sm:block"
        style={{ color: textDark ? 'var(--slate-mid)' : 'var(--rule)' }}
      >
        {variable}
      </code>
      <p
        className="text-xs flex-1 hidden md:block"
        style={{ color: textDark ? 'var(--slate-mid)' : 'var(--rule)' }}
      >
        {usage}
      </p>
      <CopyButton text={hex} />
    </div>
  );
}
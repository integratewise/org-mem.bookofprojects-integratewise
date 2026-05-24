import React, { useState } from 'react';

interface DayEntry {
  date: string;
  label: string;
  what: string;
  decisions: string[];
  quotes?: string[];
  locked?: string[];
}

const entries: DayEntry[] = [
  {
    date: "May 8, 2026",
    label: "The Vault Scan — What Existed",
    what: "The first session with Hermes began with a full scan of the IntegrateWise vault — Google Drive, iCloud, local Github. 6,017 files, 4.91 GB. The intent was to surface what had been built, documented, and decided before this period. What emerged was a complete body of locked work — doctrine, vocabulary, architecture, sales materials — all aligned to a single document date: May 6, 2026. The second half of the session went deeper into the product codebase (integratewise-live), reading the full Workspace Live UI — Sidebar, TopBar, SpineClient, IntelligenceDrawer, CommandPalette, GoalAlignmentBar, DomainShells. The architecture was real and complete.",
    decisions: [
      "Vocabulary Lock v1.1 canonical — four terms: Memory, Spine, Twin, Connectors.",
      "Master Operating Architecture v1.3 locked — Cloudflare Orchestrates, CouchDB Persists, Coda Projects.",
      "CouchDB operational memory substrate confirmed — 11 application databases, awaiting n8n wiring.",
      "n8n demoted from primary orchestration to transitional/bootstrap role.",
      "Supabase Auth added as canonical identity layer.",
      "Pitch deck, one-pager, battle cards, demo script, sales emails — all May 6, vocabulary v1.1 aligned.",
      "docs.integratewise.ai found 4 weeks stale — pre-v1.1 vocabulary across 108 files.",
      "integratewise-live codebase read in full — Workspace Live with 10 switchable CTX contexts, 4 Domain Deep Dive shells (Account Success, Personal, RevOps, SalesOps), GoalAlignmentBar on every module.",
      "HARD RULE recorded: Zero Python in any IntegrateWise repo. TypeScript only. No exceptions.",
      "integratewise-live CI/CD: OpenClaw multi-model triage — Kimi (code review) + Claude (architecture) + Human approval. Four triage levels L0–L3.",
    ],
    quotes: [
      "Stop being the Human API. — Pitch deck tagline, May 6",
      "Memory is the asset. Cognition is rented. — Launch blog post, May 6",
      "CouchDB owns operational truth. Cloudflare accelerates, secures, routes, retrieves, and orchestrates around that truth. — Cloudflare Architecture v1.0",
      "Every metric must serve either the product company OR the client company. If it serves neither, it is just a number. — Integration OS Master Strategy",
    ],
    locked: [
      "The Four: Memory (owned) · Spine (backbone) · Twin (rented cognition) · Connectors (integrations)",
      "Doctrine: Cloudflare Orchestrates · CouchDB Persists · Coda Projects · MCP Carries Context · AI Cognizes",
      "Product UI: Next.js · Tailwind · shadcn/ui · Framer Motion · dark graphite · #FFB22C accent",
      "Billing: Razorpay (India primary) · Stripe (future/global)",
      "Origin proof point: $8M account saved — three systems, zero shared Memory",
    ],
  },
  {
    date: "May 9–10, 2026",
    label: "Repo Consolidation Decision",
    what: "A short session captured a critical architectural decision about the website repos. Three repos existed at the time — integratewise-loveable-marketing, integratewise-nexify, and a third. The decision was made to consolidate: rename integratewise-loveable-marketing to integratewise-website, set up CI/CD for automatic Firebase deploy on push, run a content sprint (blog, docs, changelog), and archive the other two repos. DNS for integratewise.ai to be pointed to Firebase Hosting.",
    decisions: [
      "Rename integratewise-loveable-marketing → integratewise-website.",
      "Set up CI/CD for automatic Firebase deploy on push to main.",
      "Archive nexify-app and the third repo after visual element extraction.",
      "Point integratewise.ai DNS to Firebase Hosting.",
    ],
    quotes: [],
    locked: [],
  },
  {
    date: "May 11, 2026",
    label: "Infrastructure Day — 24 Workers, Secondary Mac, WebUI",
    what: "A full infrastructure deployment session. The Cloudflare API token setup took the first portion — token permissions had to be expanded twice (Workers Edit, then Secrets Store Edit). Once the token was working, 24 Cloudflare Workers from integratewise-live were deployed in parallel. Simultaneously, the secondary Mac was being set up as a compute node — Node v26, pnpm 10.31, Docker (pending), Hermes venv rsync from primary, gcloud auth to integratewise-4a649, n8n via Docker. WebUI (Open WebUI) was open with 5 models — gemma4, kimi-k2.6, gpt-oss-120b, arena-model, iw-hermes — and the task was to add LiteLLM models. Supabase migration 030_hermes_continuity.sql was pending.",
    decisions: [
      "24 Cloudflare Workers deployed from integratewise-live.",
      "Secondary Mac confirmed as Tailscale node (IP: 100.88.233.86) — designated for heavy cron jobs.",
      "Cloudflare API token must have: Workers Scripts Edit + Account Workers Edit + Secrets Store Edit.",
      "Public IP of primary Mac: 122.168.66.58 — used as CIDR filter on Cloudflare token.",
      "WebUI models to add: llama-3.3-70b, hermes-3, qwq-32b, gemini-2.0-flash, gemini-2.5-pro, claude-sonnet.",
      "launchd cron worker and git auto-pull sync (every 15 min) queued for secondary Mac.",
      "Beacon heartbeat to Firestore queued — secondary Mac to emit to integratewise-4a649.",
    ],
    quotes: [
      "Hermes or Twin? — Nirmal, May 11. The first identity question.",
    ],
    locked: [
      "Secondary Mac role: heavy cron jobs, Hermes runner, n8n Docker, git sync node.",
      "Cloudflare token scope: Workers Scripts Edit + Account Workers Edit + Secrets Store Edit (minimum).",
    ],
  },
];

const pill = (text: string, color: string) => (
  <span
    key={text}
    style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '11px',
      fontFamily: 'var(--font-mono)',
      background: color,
      color: 'var(--paper)',
      marginRight: 6,
      marginBottom: 4,
      letterSpacing: '0.03em',
    }}
  >
    {text}
  </span>
);

export function EvolutionPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p className="iw-label" style={{ marginBottom: 8 }}>Book of Records</p>
        <h1
          className="iw-doctrine"
          style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: 16 }}
        >
          The Evolution of IntegrateWise
        </h1>
        <p
          className="iw-body"
          style={{ color: 'var(--ink-muted)', maxWidth: 600, lineHeight: 1.7 }}
        >
          A chronological record of how IntegrateWise evolved — drawn from every Hermes session,
          every conversation, every decision that was made between May 8 and May 24, 2026.
          Written as it happened. Permanent.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pill("May 8 – May 24, 2026", "var(--forest)")}
          {pill("17 days", "var(--ink-muted)")}
          {pill("Source: Hermes CLI Sessions", "var(--gold)")}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--rule)',
          }}
        />

        {entries.map((entry, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: 56, marginBottom: 32 }}>
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 20,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: open === i ? 'var(--forest)' : 'var(--paper-warm)',
                border: '2px solid var(--forest)',
                transition: 'background 0.2s',
              }}
            />

            {/* Card */}
            <div
              style={{
                background: 'var(--paper-warm)',
                border: '1px solid var(--rule)',
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Header row */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <p
                    className="iw-mono-label"
                    style={{ color: 'var(--gold)', marginBottom: 4, fontSize: 11 }}
                  >
                    {entry.date}
                  </p>
                  <h2
                    className="iw-doctrine"
                    style={{ fontSize: '1rem', lineHeight: 1.3 }}
                  >
                    {entry.label}
                  </h2>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: 'var(--ink-muted)',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  ↓
                </span>
              </div>

              {/* Expanded content */}
              {open === i && (
                <div
                  style={{
                    borderTop: '1px solid var(--rule)',
                    padding: '20px 20px 24px',
                  }}
                >
                  {/* What happened */}
                  <p
                    className="iw-body"
                    style={{
                      color: 'var(--ink)',
                      lineHeight: 1.75,
                      marginBottom: 24,
                    }}
                  >
                    {entry.what}
                  </p>

                  {/* Quotes */}
                  {entry.quotes && entry.quotes.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                        From the record
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {entry.quotes.map((q, qi) => (
                          <div
                            key={qi}
                            style={{
                              padding: '12px 16px',
                              borderLeft: '3px solid var(--gold)',
                              background: 'var(--paper)',
                              borderRadius: '0 8px 8px 0',
                            }}
                          >
                            <p
                              className="iw-body"
                              style={{
                                color: 'var(--ink)',
                                fontStyle: 'italic',
                                lineHeight: 1.6,
                                fontSize: '0.9rem',
                              }}
                            >
                              "{q}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Decisions */}
                  <div style={{ marginBottom: entry.locked ? 24 : 0 }}>
                    <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                      Decisions made
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {entry.decisions.map((d, di) => (
                        <div
                          key={di}
                          style={{
                            display: 'flex',
                            gap: 10,
                            padding: '10px 14px',
                            background: 'var(--paper)',
                            borderRadius: 8,
                            border: '1px solid var(--rule-light)',
                          }}
                        >
                          <span style={{ color: 'var(--forest)', flexShrink: 0, marginTop: 1 }}>
                            ✓
                          </span>
                          <p
                            className="iw-body"
                            style={{ color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.875rem' }}
                          >
                            {d}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Locked doctrine */}
                  {entry.locked && entry.locked.length > 0 && (
                    <div>
                      <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                        Locked as doctrine
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {entry.locked.map((l, li) => (
                          <div
                            key={li}
                            style={{
                              display: 'flex',
                              gap: 10,
                              padding: '10px 14px',
                              background: 'color-mix(in srgb, var(--forest) 8%, var(--paper))',
                              borderRadius: 8,
                              border: '1px solid color-mix(in srgb, var(--forest) 20%, transparent)',
                            }}
                          >
                            <span style={{ color: 'var(--forest)', flexShrink: 0, marginTop: 1, fontSize: 12 }}>
                              ⬡
                            </span>
                            <p
                              className="iw-body"
                              style={{ color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.875rem' }}
                            >
                              {l}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* More coming */}
        <div style={{ paddingLeft: 56, paddingBottom: 8 }}>
          <div
            style={{
              position: 'absolute',
              left: 12,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--rule)',
              border: '2px solid var(--rule)',
            }}
          />
          <div
            style={{
              padding: '16px 20px',
              background: 'var(--paper-warm)',
              border: '1px dashed var(--rule)',
              borderRadius: 12,
            }}
          >
            <p className="iw-mono-label" style={{ color: 'var(--ink-muted)', fontSize: 11 }}>
              May 9 – May 24 · Writing in progress
            </p>
            <p className="iw-body" style={{ color: 'var(--ink-muted)', marginTop: 4, fontSize: '0.875rem' }}>
              Each day is being recorded as read from the source sessions. The record will be complete.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
        }}
      >
        <p className="iw-mono-label" style={{ color: 'var(--ink-muted)', fontSize: 11 }}>
          Source: Hermes CLI session exports · merged_files.txt series · state.db
        </p>
        <p className="iw-body" style={{ color: 'var(--ink-muted)', marginTop: 4, fontSize: '0.8rem' }}>
          This is a living record. Each entry is written from primary source — verbatim sessions,
          not reconstruction. Nothing is paraphrased without indication.
        </p>
      </div>
    </div>
  );
}

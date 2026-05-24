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
    what: "The first session with Hermes began with a full scan of the IntegrateWise vault. The intent was to surface what had been built, documented, and decided before this period. What emerged was a surprisingly complete body of work — locked doctrine, vocabulary, architecture, and sales materials — all aligned to a single document date: May 6, 2026.",
    decisions: [
      "Vocabulary Lock v1.1 confirmed as canonical — four terms only: Memory, Spine, Twin, Connectors.",
      "Master Operating Architecture v1.3 locked — Cloudflare Orchestrates, CouchDB Persists, Coda Projects.",
      "CouchDB confirmed as operational memory substrate — 13 databases provisioned, awaiting n8n wiring.",
      "n8n demoted from primary orchestration to transitional/bootstrap role.",
      "Supabase Auth added as canonical identity layer.",
      "Pitch deck, one-pager, battle cards, demo script, sales emails — all dated May 6, all aligned to vocabulary v1.1.",
      "docs.integratewise.ai found to be 4 weeks stale — pre-v1.1 vocabulary across 108 files.",
      "Vault scan revealed 6,017 files, 4.91 GB, 965 duplicate groups.",
    ],
    quotes: [
      "Stop being the Human API. — Pitch deck tagline, May 6",
      "Memory is the asset. Cognition is rented. — Launch blog post, May 6",
      "CouchDB owns operational truth. Cloudflare accelerates, secures, routes, retrieves, and orchestrates around that truth. Cognition is rented; continuity is owned. — Cloudflare Architecture v1.0",
      "This is not a productivity problem. This is an infrastructure problem. — One-pager",
    ],
    locked: [
      "The Four: Memory (owned) · Spine (backbone) · Twin (rented cognition) · Connectors (integrations)",
      "Doctrine line: Cloudflare Orchestrates · CouchDB Persists · Coda Projects · MCP Carries Context · AI Cognizes",
      "Product UI stack: Next.js · Tailwind · shadcn/ui · Framer Motion",
      "Billing: Razorpay (India primary) · Stripe (future/global)",
      "Origin proof point: $8M account saved — Salesforce + Zendesk + Slack thread. Three systems. Zero shared Memory.",
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

"use client";
import React, { useState } from "react";
import { Search, Filter, Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";

const FOREST = "#1A3A2A";
const PAPER = "#F4F0E8";
const GOLD = "#B8943F";
const RED = "#C0392B";
const GREEN = "#1A7A4A";
const ORANGE = "#D35400";
const CREAM = "#EDE8DC";
const MUTED = "#6B7280";

const accounts = [
  { name: "Axiom Capital", industry: "Integration / MuleSoft", arr: "₹38L", health: "healthy", csm: "Nirmal", renewalDays: 94, nps: 72, lastEngagement: "3d ago" },
  { name: "MedCore Health", industry: "Healthcare", arr: "₹22L", health: "at-risk", csm: "Priya", renewalDays: 28, nps: 38, lastEngagement: "14d ago" },
  { name: "TechStack SaaS", industry: "SaaS", arr: "₹18L", health: "healthy", csm: "Karan", renewalDays: 187, nps: 81, lastEngagement: "1d ago" },
  { name: "Vantage Infra", industry: "Infrastructure", arr: "₹48L", health: "critical", csm: "Nirmal", renewalDays: 11, nps: 14, lastEngagement: "21d ago" },
  { name: "Crestline Mfg", industry: "Manufacturing", arr: "₹26L", health: "healthy", csm: "Priya", renewalDays: 142, nps: 62, lastEngagement: "5d ago" },
  { name: "Orbit Dynamics", industry: "Logistics", arr: "₹31L", health: "healthy", csm: "Karan", renewalDays: 203, nps: 74, lastEngagement: "2d ago" },
];

const healthConfig: Record<string, { bg: string; color: string; label: string }> = {
  healthy: { bg: "#E6F4EC", color: GREEN, label: "Healthy" },
  "at-risk": { bg: "#FEF3E2", color: ORANGE, label: "At Risk" },
  critical: { bg: "#FDECEA", color: RED, label: "Critical" },
};

function HealthIcon({ health }: { health: string }) {
  if (health === "healthy") return <TrendingUp size={12} />;
  if (health === "critical") return <TrendingDown size={12} />;
  return <Minus size={12} />;
}

export default function AccountsView() {
  const [search, setSearch] = useState("");
  const [filterHealth, setFilterHealth] = useState("All");
  const [filterCSM, setFilterCSM] = useState("All");

  const filtered = accounts.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.industry.toLowerCase().includes(search.toLowerCase());
    const matchHealth = filterHealth === "All" || a.health === filterHealth.toLowerCase().replace(" ", "-");
    const matchCSM = filterCSM === "All" || a.csm === filterCSM;
    return matchSearch && matchHealth && matchCSM;
  });

  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <Building2 size={22} color={FOREST} />
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: FOREST }}>Accounts</h1>
        <span style={{ background: GOLD, color: "#fff", borderRadius: "12px", padding: "2px 10px", fontSize: "12px", fontWeight: 700 }}>{accounts.length}</span>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: MUTED }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            style={{
              width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px",
              border: `1px solid ${CREAM}`, background: "#fff", fontSize: "13px",
              color: FOREST, outline: "none", boxSizing: "border-box"
            }}
          />
        </div>
        <select value={filterHealth} onChange={(e) => setFilterHealth(e.target.value)} style={{
          padding: "8px 12px", borderRadius: "8px", border: `1px solid ${CREAM}`,
          background: "#fff", fontSize: "13px", color: FOREST, cursor: "pointer"
        }}>
          {["All", "Healthy", "At Risk", "Critical"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={filterCSM} onChange={(e) => setFilterCSM(e.target.value)} style={{
          padding: "8px 12px", borderRadius: "8px", border: `1px solid ${CREAM}`,
          background: "#fff", fontSize: "13px", color: FOREST, cursor: "pointer"
        }}>
          {["All", "Nirmal", "Priya", "Karan"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {filtered.map((acct) => {
          const hc = healthConfig[acct.health];
          return (
            <div key={acct.name} style={{
              background: "#fff", borderRadius: "12px", border: `1px solid ${CREAM}`,
              padding: "20px", cursor: "pointer", transition: "box-shadow 0.15s",
              borderLeft: `4px solid ${hc.color}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: FOREST }}>{acct.name}</div>
                  <div style={{ fontSize: "12px", color: MUTED, marginTop: "2px" }}>{acct.industry}</div>
                </div>
                <span style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "3px 10px", borderRadius: "10px", fontSize: "11px",
                  fontWeight: 600, background: hc.bg, color: hc.color
                }}>
                  <HealthIcon health={acct.health} />{hc.label}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div style={{ background: PAPER, borderRadius: "8px", padding: "10px" }}>
                  <div style={{ fontSize: "10px", color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>ARR</div>
                  <div style={{ fontWeight: 700, fontSize: "18px", color: FOREST, marginTop: "2px" }}>{acct.arr}</div>
                </div>
                <div style={{ background: PAPER, borderRadius: "8px", padding: "10px" }}>
                  <div style={{ fontSize: "10px", color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>NPS</div>
                  <div style={{ fontWeight: 700, fontSize: "18px", color: acct.nps >= 60 ? GREEN : acct.nps >= 40 ? ORANGE : RED, marginTop: "2px" }}>{acct.nps}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: MUTED }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%", background: FOREST,
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: 700
                  }}>{acct.csm[0]}</div>
                  <span>{acct.csm}</span>
                </div>
                <div style={{ color: acct.renewalDays <= 30 ? RED : MUTED, fontWeight: acct.renewalDays <= 30 ? 600 : 400 }}>
                  Renewal: {acct.renewalDays}d
                </div>
                <div style={{ color: MUTED }}>Last: {acct.lastEngagement}</div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px", color: MUTED, fontSize: "14px" }}>No accounts match your filters</div>
      )}
    </div>
  );
}

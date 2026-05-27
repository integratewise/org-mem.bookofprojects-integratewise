"use client";
import React, { useState } from "react";
import { AlertTriangle, Clock, TrendingDown, User, Filter } from "lucide-react";

const FOREST = "#1A3A2A";
const PAPER = "#F4F0E8";
const GOLD = "#B8943F";
const RED = "#C0392B";
const ORANGE = "#D35400";
const CREAM = "#EDE8DC";
const MUTED = "#6B7280";

const accounts = [
  {
    name: "MedCore Health",
    arr: "₹22L",
    health: 38,
    renewalDays: 28,
    nps: 38,
    csm: "Priya",
    lastEngagement: "14d ago",
    riskReason: "NPS drop",
    severity: "High",
  },
  {
    name: "Vantage Infra",
    arr: "₹48L",
    health: 12,
    renewalDays: 11,
    nps: 14,
    csm: "Nirmal",
    lastEngagement: "21d ago",
    riskReason: "No engagement + renewal critical",
    severity: "Critical",
  },
];

function healthColor(score: number) {
  if (score <= 20) return RED;
  if (score <= 40) return ORANGE;
  return GOLD;
}

function severityBadge(severity: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Critical: { bg: "#FDECEA", color: RED },
    High: { bg: "#FEF3E2", color: ORANGE },
    Medium: { bg: "#FFFBEA", color: GOLD },
  };
  return map[severity] || map["Medium"];
}

export default function AtRiskView() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Critical", "High", "Medium"];

  const filtered = activeTab === "All"
    ? accounts
    : accounts.filter((a) => a.severity === activeTab);

  return (
    <div style={{ background: PAPER, minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <AlertTriangle size={22} color={RED} />
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: FOREST }}>At Risk</h1>
        <span style={{
          background: RED, color: "#fff", borderRadius: "12px",
          padding: "2px 10px", fontSize: "12px", fontWeight: 700
        }}>{accounts.length}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", color: MUTED, fontSize: "13px" }}>
          <Filter size={14} />
          <span>Filter</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: CREAM, borderRadius: "8px", padding: "4px", width: "fit-content" }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "6px 16px", borderRadius: "6px", border: "none", cursor: "pointer",
            fontSize: "13px", fontWeight: activeTab === tab ? 700 : 400,
            background: activeTab === tab ? FOREST : "transparent",
            color: activeTab === tab ? "#fff" : MUTED,
            transition: "all 0.15s"
          }}>{tab}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "12px", border: `1px solid ${CREAM}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: FOREST }}>
              {["Account", "ARR", "Health Score", "Renewal Days", "NPS", "CSM", "Last Engagement", "Risk Reason"].map((col) => (
                <th key={col} style={{
                  padding: "12px 16px", textAlign: "left", fontSize: "11px",
                  fontWeight: 600, color: "#C8D8C8", textTransform: "uppercase", letterSpacing: "0.05em"
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((acct, i) => {
              const badge = severityBadge(acct.severity);
              return (
                <tr key={acct.name} style={{ background: i % 2 === 0 ? "#fff" : PAPER, borderBottom: `1px solid ${CREAM}` }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: FOREST, fontSize: "14px" }}>{acct.name}</div>
                    <span style={{
                      fontSize: "11px", fontWeight: 600, padding: "2px 8px",
                      borderRadius: "10px", background: badge.bg, color: badge.color
                    }}>{acct.severity}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: FOREST, fontSize: "14px" }}>{acct.arr}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "48px", height: "6px", borderRadius: "3px", background: CREAM, overflow: "hidden" }}>
                        <div style={{ width: `${acct.health}%`, height: "100%", background: healthColor(acct.health), borderRadius: "3px" }} />
                      </div>
                      <span style={{ fontWeight: 700, color: healthColor(acct.health), fontSize: "13px" }}>{acct.health}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: acct.renewalDays <= 14 ? RED : ORANGE }}>
                      <Clock size={13} />
                      <span style={{ fontWeight: 700, fontSize: "13px" }}>{acct.renewalDays}d</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: acct.nps < 30 ? RED : ORANGE, fontSize: "13px" }}>
                    {acct.nps}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%", background: FOREST,
                        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 700
                      }}>{acct.csm[0]}</div>
                      <span style={{ fontSize: "13px", color: FOREST }}>{acct.csm}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: MUTED, fontSize: "13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <TrendingDown size={13} color={ORANGE} />
                      {acct.lastEngagement}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontSize: "12px", padding: "4px 10px", borderRadius: "10px",
                      background: "#FEF3E2", color: ORANGE, fontWeight: 500
                    }}>{acct.riskReason}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: MUTED, fontSize: "14px" }}>
            No accounts in this category
          </div>
        )}
      </div>
    </div>
  );
}

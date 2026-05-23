import React from 'react';

const TOKENS = {
  surface: 'var(--surface)',
  surfaceRaised: 'var(--surface-raised)',
  surfaceMuted: 'var(--surface-2)',
  border: 'var(--border-subtle)',
  text: 'var(--text-strong)',
  muted: 'var(--text-muted)',
  faint: 'var(--text-faint)',
  inverse: 'var(--text-inverse)',
  primary: 'var(--primary-color)',
  accent: 'var(--accent-color)',
  success: 'var(--success-color)',
  warning: 'var(--warning-color)',
  error: 'var(--error-color)',
};

const tint = (color: string, amount = 16) => `color-mix(in srgb, ${color} ${amount}%, white)`;
const shade = (color: string, amount = 20) => `color-mix(in srgb, ${color} ${amount}%, var(--text-strong))`;

function DiagramFrame({ width, height, title }: { width: number; height: number; title: string }) {
  return (
    <>
      <rect width={width} height={height} fill={TOKENS.surface} rx="18" />
      <rect x="1" y="1" width={width - 2} height={height - 2} fill="none" stroke={TOKENS.border} rx="17" />
      <text x={width / 2} y="38" textAnchor="middle" fontSize="22" fontWeight="700" fill={TOKENS.text}>
        {title}
      </text>
    </>
  );
}

// L0-L5 Layer Architecture Diagram
export function LayerArchitectureDiagram() {
  const layers = [
    {
      y: 82,
      height: 62,
      color: TOKENS.success,
      title: 'L0 · Connection Layer',
      detail: 'Gateways • Connectors • Webhooks • Raw ingress',
      badge: 'Hydration',
    },
    {
      y: 162,
      height: 68,
      color: TOKENS.primary,
      title: 'L1 · Adaptive Continuity Workspace',
      detail: 'Dashboards • Approvals • Entity 360 • Human interface',
      badge: 'Workspace',
    },
    {
      y: 248,
      height: 68,
      color: TOKENS.accent,
      title: 'L2 · Cognitive Intelligence Overlay',
      detail: 'Depth matrix • Signal detection • AI proposals',
      badge: 'Reasoning',
    },
    {
      y: 334,
      height: 74,
      color: shade(TOKENS.primary, 40),
      title: 'L3 · Canonical Truth & Memory',
      detail: 'Spine • Entities • Relationships • Memory accumulator',
      badge: 'SSOT',
    },
  ];

  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <DiagramFrame width={800} height={600} title="IntegrateWise Layer Architecture (L0–L5)" />

      {layers.map((layer, index) => (
        <g key={layer.title} transform={`translate(54, ${layer.y})`}>
          <rect width="692" height={layer.height} fill={tint(layer.color, 16)} rx="14" />
          <rect width="692" height={layer.height} fill="none" stroke={tint(layer.color, 55)} rx="14" />
          <rect x="18" y="14" width="84" height="22" fill={layer.color} rx="11" />
          <text x="60" y="29" textAnchor="middle" fontSize="10" fontWeight="700" fill={TOKENS.inverse}>
            {layer.badge}
          </text>
          <text x="20" y="54" fontSize="18" fontWeight="700" fill={TOKENS.text}>
            {layer.title}
          </text>
          <text x="20" y={layer.height - 14} fontSize="12" fill={TOKENS.muted}>
            {layer.detail}
          </text>
          {index < layers.length - 1 && (
            <path d={`M346 ${layer.height + 8} L346 ${layer.height + 24}`} stroke={TOKENS.border} strokeWidth="2.5" markerEnd="url(#layerArrow)" />
          )}
        </g>
      ))}

      <g transform="translate(54, 434)">
        <rect width="332" height="96" fill={tint(TOKENS.warning, 16)} rx="14" />
        <rect width="332" height="96" fill="none" stroke={tint(TOKENS.warning, 52)} rx="14" />
        <rect x="20" y="18" width="86" height="24" fill={TOKENS.warning} rx="12" />
        <text x="63" y="34" textAnchor="middle" fontSize="10" fontWeight="700" fill={TOKENS.inverse}>Orchestration</text>
        <text x="20" y="62" fontSize="17" fontWeight="700" fill={TOKENS.text}>L4 · Workflow & Middleware</text>
        <text x="20" y="82" fontSize="11.5" fill={TOKENS.muted}>Workflow • BFF • Pipelines • Queues • Routing</text>
      </g>

      <g transform="translate(414, 434)">
        <rect width="332" height="96" fill={tint(TOKENS.success, 12)} rx="14" />
        <rect width="332" height="96" fill="none" stroke={tint(TOKENS.success, 48)} rx="14" />
        <rect x="20" y="18" width="86" height="24" fill={TOKENS.success} rx="12" />
        <text x="63" y="34" textAnchor="middle" fontSize="10" fontWeight="700" fill={TOKENS.inverse}>Platform</text>
        <text x="20" y="62" fontSize="17" fontWeight="700" fill={TOKENS.text}>L5 · Infrastructure Services</text>
        <text x="20" y="82" fontSize="11.5" fill={TOKENS.muted}>Compute • Storage • Network • Security • Observability</text>
      </g>

      <defs>
        <marker id="layerArrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
          <polygon points="0 0, 10 4, 0 8" fill={TOKENS.border} />
        </marker>
      </defs>
    </svg>
  );
}

// Data Pipeline Diagram
export function PipelineDiagram() {
  const stages = [
    { name: 'Ingest', color: TOKENS.primary, icon: '↓' },
    { name: 'Normalize', color: TOKENS.success, icon: '⚙' },
    { name: 'Store', color: shade(TOKENS.primary, 36), icon: '⌂' },
    { name: 'Render', color: TOKENS.warning, icon: '◌' },
    { name: 'Think', color: TOKENS.accent, icon: '✦' },
    { name: 'Govern', color: TOKENS.primary, icon: '✓' },
    { name: 'Act', color: shade(TOKENS.accent, 32), icon: '⚡' },
    { name: 'Re-ingest', color: TOKENS.success, icon: '↺' },
  ];

  return (
    <svg viewBox="0 0 900 220" className="w-full h-auto">
      <DiagramFrame width={900} height={220} title="8-Stage Data Pipeline" />

      {stages.map((stage, i) => (
        <g key={stage.name} transform={`translate(${38 + i * 106}, 70)`}>
          <rect width="88" height="102" fill={TOKENS.surfaceRaised} rx="14" />
          <rect width="88" height="102" fill="none" stroke={TOKENS.border} rx="14" />
          <rect x="12" y="12" width="64" height="10" fill={tint(stage.color, 22)} rx="5" />
          <circle cx="44" cy="46" r="20" fill={tint(stage.color, 18)} />
          <circle cx="44" cy="46" r="20" fill="none" stroke={tint(stage.color, 56)} />
          <text x="44" y="52" textAnchor="middle" fontSize="20" fontWeight="700" fill={stage.color}>{stage.icon}</text>
          <text x="44" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={TOKENS.text}>{stage.name}</text>
          <text x="44" y="94" textAnchor="middle" fontSize="10" fill={TOKENS.faint}>Stage {i + 1}</text>
          {i < stages.length - 1 && (
            <path d="M90 52 L102 52" stroke={TOKENS.border} strokeWidth="2.5" markerEnd="url(#pipelineArrow)" />
          )}
        </g>
      ))}

      <path
        d="M76 192 Q450 168 824 192"
        stroke={TOKENS.primary}
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,7"
        opacity="0.28"
      />
      <text x="450" y="208" textAnchor="middle" fontSize="10.5" fill={TOKENS.muted}>
        Continuous cycle — data returns through governance and re-ingestion
      </text>

      <defs>
        <marker id="pipelineArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={TOKENS.border} />
        </marker>
      </defs>
    </svg>
  );
}

// Three Flows Diagram
export function ThreeFlowsDiagram() {
  const flows = [
    {
      x: 44,
      title: 'Flow A',
      subtitle: 'Structured operational truth',
      color: TOKENS.primary,
      steps: ['Connector', 'Pipeline', 'Spine', 'Workspace', 'Entity 360', 'Signals'],
    },
    {
      x: 326,
      title: 'Flow B',
      subtitle: 'Unstructured context',
      color: TOKENS.success,
      steps: ['Ingest', 'Extract', 'Knowledge Graph', 'Link', 'Entity 360'],
    },
    {
      x: 608,
      title: 'Flow C',
      subtitle: 'AI / MCP flow',
      color: TOKENS.accent,
      steps: ['Capture', 'Triage', 'Approve', 'Action', 'Re-ingest', 'Spine'],
    },
  ];

  return (
    <svg viewBox="0 0 900 410" className="w-full h-auto">
      <DiagramFrame width={900} height={410} title="The Three Data Flows" />

      {flows.map((flow) => (
        <g key={flow.title} transform={`translate(${flow.x}, 64)`}>
          <rect width="248" height="304" fill={tint(flow.color, 10)} rx="18" />
          <rect width="248" height="304" fill="none" stroke={tint(flow.color, 42)} rx="18" />
          <rect x="18" y="18" width="72" height="24" fill={flow.color} rx="12" />
          <text x="54" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill={TOKENS.inverse}>{flow.title}</text>
          <text x="18" y="62" fontSize="15" fontWeight="700" fill={TOKENS.text}>{flow.subtitle}</text>

          <g transform="translate(24, 88)">
            {flow.steps.map((step, i) => {
              const y = i * 36;
              const isApproval = flow.title === 'Flow C' && step === 'Approve';
              const stepColor = isApproval ? TOKENS.warning : flow.color;
              return (
                <g key={step} transform={`translate(0, ${y})`}>
                  <rect width="200" height="26" fill={tint(stepColor, 14)} rx="8" />
                  <rect width="200" height="26" fill="none" stroke={tint(stepColor, 42)} rx="8" />
                  <text x="100" y="17" textAnchor="middle" fontSize="11" fontWeight="600" fill={TOKENS.text}>{step}</text>
                  {i < flow.steps.length - 1 && <path d="M100 28 L100 34" stroke={TOKENS.border} strokeWidth="2" />}
                </g>
              );
            })}
          </g>
        </g>
      ))}

      <text x="730" y="392" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={TOKENS.accent}>
        Flow C never writes directly to Spine truth
      </text>
    </svg>
  );
}

// Cognitive Loop Diagram
export function CognitiveLoopDiagram() {
  const steps = [
    { name: 'Entity 360', angle: -90, color: TOKENS.primary },
    { name: 'Think', angle: -30, color: TOKENS.accent },
    { name: 'Govern', angle: 30, color: TOKENS.warning },
    { name: 'HITL', angle: 90, color: shade(TOKENS.primary, 32) },
    { name: 'Act', angle: 150, color: shade(TOKENS.accent, 28) },
    { name: 'Adjust', angle: 210, color: TOKENS.success },
  ];

  const centerX = 400;
  const centerY = 252;
  const radius = 150;

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <DiagramFrame width={800} height={500} title="Cognitive Loop" />

      <circle cx={centerX} cy={centerY} r="68" fill={tint(TOKENS.primary, 18)} />
      <circle cx={centerX} cy={centerY} r="68" fill="none" stroke={tint(TOKENS.primary, 56)} />
      <circle cx={centerX} cy={centerY} r="44" fill={TOKENS.primary} />
      <text x={centerX} y={centerY - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={TOKENS.inverse}>The Spine</text>
      <text x={centerX} y={centerY + 16} textAnchor="middle" fontSize="10" fill={TOKENS.inverse}>SSOT</text>

      {steps.map((step, i) => {
        const angle = (step.angle * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        return (
          <g key={step.name}>
            <line x1={centerX} y1={centerY} x2={x} y2={y} stroke={tint(step.color, 55)} strokeWidth="2" strokeDasharray="5,6" />
            <circle cx={x} cy={y} r="42" fill={tint(step.color, 14)} />
            <circle cx={x} cy={y} r="42" fill="none" stroke={tint(step.color, 44)} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={TOKENS.text}>{step.name}</text>
            <circle cx={x + 31} cy={y - 31} r="13" fill={TOKENS.surfaceRaised} stroke={TOKENS.border} />
            <text x={x + 31} y={y - 27} textAnchor="middle" fontSize="11" fontWeight="700" fill={step.color}>{i + 1}</text>
          </g>
        );
      })}

      <path
        d={`M ${centerX + radius + 58} ${centerY} A ${radius + 58} ${radius + 58} 0 0 1 ${centerX} ${centerY - radius - 58}`}
        fill="none"
        stroke={TOKENS.primary}
        strokeWidth="3"
        markerEnd="url(#loopArrow)"
        opacity="0.28"
      />

      <text x="400" y="480" textAnchor="middle" fontSize="11.5" fill={TOKENS.muted}>
        Continuous learning loop — every approved decision enriches continuity context
      </text>

      <defs>
        <marker id="loopArrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
          <polygon points="0 0, 10 4, 0 8" fill={TOKENS.primary} />
        </marker>
      </defs>
    </svg>
  );
}

// Spine Visualization
export function SpineVisualizationDiagram() {
  const orbitItems = [
    { name: 'Entities', angle: 0, color: TOKENS.primary },
    { name: 'Relations', angle: 72, color: TOKENS.success },
    { name: 'Schema', angle: 144, color: TOKENS.warning },
    { name: 'Truth', angle: 216, color: shade(TOKENS.primary, 40) },
    { name: 'Memory', angle: 288, color: TOKENS.accent },
  ];

  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto">
      <DiagramFrame width={400} height={400} title="" />
      <text x="200" y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill={TOKENS.text}>The Spine</text>

      {[180, 150, 120].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke={TOKENS.primary}
          strokeWidth={i === 2 ? 2 : 1}
          opacity={0.12 + i * 0.08}
        />
      ))}

      <circle cx="200" cy="200" r="84" fill={tint(TOKENS.primary, 16)} />
      <circle cx="200" cy="200" r="68" fill={TOKENS.surfaceRaised} stroke={TOKENS.border} />
      <circle cx="200" cy="200" r="52" fill={TOKENS.primary} />
      <text x="200" y="196" textAnchor="middle" fontSize="16" fontWeight="700" fill={TOKENS.inverse}>THE SPINE</text>
      <text x="200" y="216" textAnchor="middle" fontSize="10" fill={TOKENS.inverse}>SSOT</text>

      {orbitItems.map((item) => {
        const angle = (item.angle * Math.PI) / 180;
        const x = 200 + Math.cos(angle) * 140;
        const y = 200 + Math.sin(angle) * 140;
        return (
          <g key={item.name}>
            <line x1="200" y1="200" x2={x} y2={y} stroke={tint(item.color, 48)} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="27" fill={tint(item.color, 12)} />
            <circle cx={x} cy={y} r="27" fill="none" stroke={tint(item.color, 40)} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={TOKENS.text}>{item.name}</text>
          </g>
        );
      })}

      <text x="200" y="380" textAnchor="middle" fontSize="11.5" fill={TOKENS.muted}>
        Everything orbits the Spine — continuity truth first, projections second
      </text>
    </svg>
  );
}

// Value Prop Diagram
export function ValuePropDiagram() {
  const pillars = [
    {
      x: 50,
      color: TOKENS.primary,
      title: 'Context',
      lines: ['AI understands your', 'unique business context'],
      icon: '◌',
      foot: 'Entity 360 views',
    },
    {
      x: 290,
      color: TOKENS.accent,
      title: 'Governance',
      lines: ['Human approval required', 'for every action'],
      icon: '✓',
      foot: 'Approval-first design',
    },
    {
      x: 530,
      color: TOKENS.success,
      title: 'Intelligence',
      lines: ['Continuous learning from', 'every decision made'],
      icon: '↺',
      foot: 'Adaptive learning loop',
    },
  ];

  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <DiagramFrame width={800} height={300} title="" />
      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill={TOKENS.text}>Core Value Propositions</text>

      {pillars.map((pillar) => (
        <g key={pillar.title} transform={`translate(${pillar.x}, 58)`}>
          <rect width="220" height="188" fill={tint(pillar.color, 12)} rx="18" />
          <rect width="220" height="188" fill="none" stroke={tint(pillar.color, 40)} rx="18" />
          <rect x="18" y="18" width="80" height="24" fill={pillar.color} rx="12" />
          <text x="58" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill={TOKENS.inverse}>{pillar.title}</text>
          <text x="110" y="86" textAnchor="middle" fontSize="12" fill={TOKENS.muted}>{pillar.lines[0]}</text>
          <text x="110" y="104" textAnchor="middle" fontSize="12" fill={TOKENS.muted}>{pillar.lines[1]}</text>
          <text x="110" y="144" textAnchor="middle" fontSize="34" fontWeight="700" fill={pillar.color}>{pillar.icon}</text>
          <text x="110" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill={TOKENS.text}>{pillar.foot}</text>
        </g>
      ))}
    </svg>
  );
}

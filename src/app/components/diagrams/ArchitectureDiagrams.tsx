// SVG-based Architectural Diagrams for IntegrateWise
// These are scalable, editable vector diagrams

import React from 'react';

// L0-L5 Layer Architecture Diagram
export function LayerArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* Background */}
      <rect width="800" height="600" fill="#f8fafc" rx="12" />
      
      {/* Title */}
      <text x="400" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1B2544">
        IntegrateWise Layer Architecture (L0-L5)
      </text>
      
      {/* L0 - Connection Layer */}
      <g transform="translate(50, 80)">
        <rect width="700" height="70" fill="#6B7DC4" rx="8" />
        <text x="20" y="30" fontSize="18" fontWeight="bold" fill="white">L0 - Connection Layer</text>
        <text x="20" y="50" fontSize="12" fill="white" opacity="0.9">Gateways • Connectors • Webhooks • Raw Data Ingress</text>
        <g transform="translate(550, 20)">
          <circle cx="15" cy="15" r="12" fill="white" opacity="0.2" />
          <text x="15" y="20" textAnchor="middle" fontSize="14" fill="white">→</text>
        </g>
      </g>
      
      {/* Arrow Down */}
      <path d="M400 155 L400 170" stroke="#D5DAE5" strokeWidth="3" markerEnd="url(#arrowhead)" />
      
      {/* L1 - Unified Workspace */}
      <g transform="translate(50, 175)">
        <rect width="700" height="70" fill="#4154A3" rx="8" />
        <text x="20" y="30" fontSize="18" fontWeight="bold" fill="white">L1 - Unified Workspace (over the Spine)</text>
        <text x="20" y="50" fontSize="12" fill="white" opacity="0.9">Human Interface • Dashboards • Approvals • Entity 360</text>
        <g transform="translate(550, 20)">
          <rect width="100" height="30" fill="white" opacity="0.2" rx="4" />
          <text x="50" y="21" textAnchor="middle" fontSize="11" fill="white">Knowledge UI</text>
        </g>
      </g>
      
      {/* Arrow Down */}
      <path d="M400 250 L400 265" stroke="#D5DAE5" strokeWidth="3" markerEnd="url(#arrowhead)" />
      
      {/* L2 - Cognitive Intelligence */}
      <g transform="translate(50, 270)">
        <rect width="700" height="70" fill="#EB4379" rx="8" />
        <text x="20" y="30" fontSize="18" fontWeight="bold" fill="white">L2 - Cognitive Intelligence Overlay</text>
        <text x="20" y="50" fontSize="12" fill="white" opacity="0.9">Entity 360 • Depth Matrix • Signal Detection • AI Proposals</text>
        <g transform="translate(550, 20)">
          <circle cx="50" cy="15" r="20" fill="white" opacity="0.2" />
          <text x="50" y="21" textAnchor="middle" fontSize="16" fill="white">🧠</text>
        </g>
      </g>
      
      {/* Arrow Down */}
      <path d="M400 345 L400 360" stroke="#D5DAE5" strokeWidth="3" markerEnd="url(#arrowhead)" />
      
      {/* L3 - Canonical Truth (Spine) */}
      <g transform="translate(50, 365)">
        <rect width="700" height="70" fill="#1B2544" rx="8" />
        <text x="20" y="30" fontSize="18" fontWeight="bold" fill="white">L3 - Canonical Truth & Memory (Spine)</text>
        <text x="20" y="50" fontSize="12" fill="white" opacity="0.9">SSOT • Normalized Entities • Relationships • Memory Accumulator</text>
        <g transform="translate(550, 20)">
          <rect width="100" height="30" fill="#4154A3" rx="4" />
          <text x="50" y="21" textAnchor="middle" fontSize="11" fill="white">The Spine</text>
        </g>
      </g>
      
      {/* Arrow Down */}
      <path d="M400 440 L400 455" stroke="#D5DAE5" strokeWidth="3" markerEnd="url(#arrowhead)" />
      
      {/* L4 - Orchestration */}
      <g transform="translate(50, 460)">
        <rect width="340" height="60" fill="#F59E0B" rx="8" />
        <text x="15" y="25" fontSize="16" fontWeight="bold" fill="white">L4 - Orchestration</text>
        <text x="15" y="45" fontSize="11" fill="white" opacity="0.9">Workflow • BFF • Pipelines • Queues</text>
      </g>
      
      {/* L5 - Infrastructure */}
      <g transform="translate(410, 460)">
        <rect width="340" height="60" fill="#10B981" rx="8" />
        <text x="15" y="25" fontSize="16" fontWeight="bold" fill="white">L5 - Infrastructure</text>
        <text x="15" y="45" fontSize="11" fill="white" opacity="0.9">Compute • Storage • Network • Security</text>
      </g>
      
      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#D5DAE5" />
        </marker>
      </defs>
    </svg>
  );
}

// Data Pipeline Diagram
export function PipelineDiagram() {
  const stages = [
    { name: 'Ingest', color: '#4154A3', icon: '↓' },
    { name: 'Normalize', color: '#6B7DC4', icon: '⚙' },
    { name: 'Store', color: '#364789', icon: '💾' },
    { name: 'Render', color: '#1B2544', icon: '👁' },
    { name: 'Think', color: '#4154A3', icon: '🧠' },
    { name: 'Govern', color: '#6B7DC4', icon: '✓' },
    { name: 'Act', color: '#364789', icon: '⚡' },
    { name: 'Re-ingest', color: '#10B981', icon: '↻' },
  ];
  
  return (
    <svg viewBox="0 0 900 200" className="w-full h-auto">
      <rect width="900" height="200" fill="#f8fafc" rx="12" />
      <text x="450" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1B2544">
        8-Stage Data Pipeline
      </text>
      
      {stages.map((stage, i) => (
        <g key={stage.name} transform={`translate(${50 + i * 100}, 60)`}>
          {/* Stage box */}
          <rect width="80" height="100" fill={stage.color} rx="8" opacity="0.9" />
          {/* Icon */}
          <text x="40" y="45" textAnchor="middle" fontSize="24" fill="white">{stage.icon}</text>
          {/* Name */}
          <text x="40" y="75" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
            {stage.name}
          </text>
          {/* Number */}
          <text x="40" y="92" textAnchor="middle" fontSize="10" fill="white" opacity="0.7">
            Stage {i + 1}
          </text>
          
          {/* Arrow to next stage */}
          {i < stages.length - 1 && (
            <path d="M85 110 L95 110" stroke={stage.color} strokeWidth="2" markerEnd="url(#arrowSmall)" />
          )}
        </g>
      ))}
      
      {/* Flow line at bottom */}
      <path 
        d="M90 180 Q450 160 810 180" 
        stroke="#4154A3" 
        strokeWidth="2" 
        fill="none" 
        strokeDasharray="5,5"
        opacity="0.3"
      />
      <text x="450" y="195" textAnchor="middle" fontSize="10" fill="#5F6E93">
        Continuous Flow — All data cycles through the pipeline
      </text>
      
      <defs>
        <marker id="arrowSmall" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#4154A3" />
        </marker>
      </defs>
    </svg>
  );
}

// Three Flows Diagram
export function ThreeFlowsDiagram() {
  return (
    <svg viewBox="0 0 900 400" className="w-full h-auto">
      <rect width="900" height="400" fill="#f8fafc" rx="12" />
      <text x="450" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1B2544">
        The Three Data Flows
      </text>
      
      {/* Flow A - Structured */}
      <g transform="translate(50, 60)">
        <rect width="250" height="300" fill="#4154A3" opacity="0.1" rx="12" stroke="#4154A3" strokeWidth="2" />
        <text x="125" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#4154A3">Flow A</text>
        <text x="125" y="55" textAnchor="middle" fontSize="12" fill="#5F6E93">Structured Operational Truth</text>
        
        <g transform="translate(25, 80)">
          {['Connector', 'Pipeline', 'Spine', 'Workspace', 'Entity 360', 'Signals'].map((step, i) => (
            <g key={step} transform={`translate(0, ${i * 35})`}>
              <rect width="200" height="28" fill="#4154A3" rx="4" opacity={0.7 + i * 0.05} />
              <text x="100" y="19" textAnchor="middle" fontSize="11" fill="white">{step}</text>
              {i < 5 && <path d="M100 30 L100 33" stroke="#4154A3" strokeWidth="2" />}
            </g>
          ))}
        </g>
      </g>
      
      {/* Flow B - Unstructured */}
      <g transform="translate(325, 60)">
        <rect width="250" height="300" fill="#6B7DC4" opacity="0.1" rx="12" stroke="#6B7DC4" strokeWidth="2" />
        <text x="125" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#6B7DC4">Flow B</text>
        <text x="125" y="55" textAnchor="middle" fontSize="12" fill="#5F6E93">Unstructured Context</text>
        
        <g transform="translate(25, 80)">
          {['Ingest', 'Extract', 'Knowledge Graph', 'Link', 'Entity 360'].map((step, i) => (
            <g key={step} transform={`translate(0, ${i * 40})`}>
              <rect width="200" height="28" fill="#6B7DC4" rx="4" opacity={0.7 + i * 0.05} />
              <text x="100" y="19" textAnchor="middle" fontSize="11" fill="white">{step}</text>
              {i < 4 && <path d="M100 30 L100 37" stroke="#6B7DC4" strokeWidth="2" />}
            </g>
          ))}
        </g>
      </g>
      
      {/* Flow C - AI/MCP */}
      <g transform="translate(600, 60)">
        <rect width="250" height="300" fill="#EB4379" opacity="0.1" rx="12" stroke="#EB4379" strokeWidth="2" />
        <text x="125" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#EB4379">Flow C</text>
        <text x="125" y="55" textAnchor="middle" fontSize="12" fill="#5F6E93">AI / MCP Flow</text>
        
        <g transform="translate(25, 80)">
          {['Capture', 'Triage', 'Approve', 'Action', 'Re-ingest', 'Spine'].map((step, i) => (
            <g key={step} transform={`translate(0, ${i * 35})`}>
              <rect width="200" height="28" fill={step === 'Approve' ? '#F59E0B' : '#EB4379'} rx="4" opacity="0.8" />
              <text x="100" y="19" textAnchor="middle" fontSize="11" fill="white">{step}</text>
              {i < 5 && <path d="M100 30 L100 33" stroke="#EB4379" strokeWidth="2" />}
            </g>
          ))}
        </g>
      </g>
      
      {/* Warning note */}
      <text x="725" y="385" textAnchor="middle" fontSize="10" fill="#EB4379" fontWeight="600">
        ⚠ Flow C never writes directly to Spine
      </text>
    </svg>
  );
}

// Cognitive Loop Diagram
export function CognitiveLoopDiagram() {
  const steps = [
    { name: 'Entity 360', angle: -90, color: '#4154A3' },
    { name: 'Think', angle: -30, color: '#6B7DC4' },
    { name: 'Govern', angle: 30, color: '#364789' },
    { name: 'HITL', angle: 90, color: '#EB4379' },
    { name: 'Act', angle: 150, color: '#F54476' },
    { name: 'Adjust', angle: 210, color: '#10B981' },
  ];
  
  const centerX = 400;
  const centerY = 250;
  const radius = 150;
  
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <rect width="800" height="500" fill="#f8fafc" rx="12" />
      <text x="400" y="40" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1B2544">
        Cognitive Loop
      </text>
      
      {/* Central hub */}
      <circle cx={centerX} cy={centerY} r="60" fill="#4154A3" />
      <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">The Spine</text>
      <text x={centerX} y={centerY + 15} textAnchor="middle" fontSize="10" fill="white" opacity="0.8">SSOT</text>
      
      {/* Orbital steps */}
      {steps.map((step, i) => {
        const angle = (step.angle * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        return (
          <g key={step.name}>
            {/* Connection line */}
            <line x1={centerX} y1={centerY} x2={x} y2={y} stroke={step.color} strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
            
            {/* Step circle */}
            <circle cx={x} cy={y} r="45" fill={step.color} opacity="0.9" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">{step.name}</text>
            
            {/* Step number */}
            <circle cx={x + 35} cy={y - 35} r="15" fill="white" />
            <text x={x + 35} y={y - 30} textAnchor="middle" fontSize="12" fontWeight="bold" fill={step.color}>{i + 1}</text>
          </g>
        );
      })}
      
      {/* Direction arrows */}
      <path 
        d={`M ${centerX + radius + 60} ${centerY} A ${radius + 60} ${radius + 60} 0 0 1 ${centerX} ${centerY - radius - 60}`}
        fill="none" stroke="#4154A3" strokeWidth="3" markerEnd="url(#arrowLoop)" opacity="0.3"
      />
      
      <text x="400" y="480" textAnchor="middle" fontSize="12" fill="#5F6E93">
        Continuous feedback loop — AI learns from every human decision
      </text>
      
      <defs>
        <marker id="arrowLoop" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4154A3" />
        </marker>
      </defs>
    </svg>
  );
}

// Spine Visualization
export function SpineVisualizationDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto">
      <rect width="400" height="400" fill="#f8fafc" rx="12" />
      
      {/* Outer rings */}
      <circle cx="200" cy="200" r="180" fill="none" stroke="#4154A3" strokeWidth="1" opacity="0.2" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#4154A3" strokeWidth="1" opacity="0.3" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#4154A3" strokeWidth="2" opacity="0.4" />
      
      {/* Central Spine */}
      <circle cx="200" cy="200" r="80" fill="#1B2544" />
      <circle cx="200" cy="200" r="70" fill="#4154A3" />
      <circle cx="200" cy="200" r="60" fill="#1B2544" />
      
      {/* Spine label */}
      <text x="200" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">THE SPINE</text>
      <text x="200" y="215" textAnchor="middle" fontSize="10" fill="white" opacity="0.8">SSOT</text>
      
      {/* Orbiting elements */}
      {[
        { name: 'Entities', angle: 0, color: '#4154A3' },
        { name: 'Relations', angle: 72, color: '#6B7DC4' },
        { name: 'Schema', angle: 144, color: '#364789' },
        { name: 'Truth', angle: 216, color: '#1B2544' },
        { name: 'Memory', angle: 288, color: '#EB4379' },
      ].map((item) => {
        const angle = (item.angle * Math.PI) / 180;
        const x = 200 + Math.cos(angle) * 140;
        const y = 200 + Math.sin(angle) * 140;
        
        return (
          <g key={item.name}>
            <line x1="200" y1="200" x2={x} y2={y} stroke={item.color} strokeWidth="1" opacity="0.4" />
            <circle cx={x} cy={y} r="25" fill={item.color} opacity="0.9" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="white">{item.name}</text>
          </g>
        );
      })}
      
      <text x="200" y="380" textAnchor="middle" fontSize="12" fill="#5F6E93">
        Everything orbits the Spine — the single source of truth
      </text>
    </svg>
  );
}

// Value Prop Diagram
export function ValuePropDiagram() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <rect width="800" height="300" fill="#f8fafc" rx="12" />
      
      {/* Three pillars */}
      <g transform="translate(50, 50)">
        {/* Pillar 1: Context */}
        <rect width="220" height="200" fill="#4154A3" rx="12" />
        <text x="110" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Context</text>
        <text x="110" y="70" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">AI understands your</text>
        <text x="110" y="90" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">unique business context</text>
        <text x="110" y="130" textAnchor="middle" fontSize="40" fill="white" opacity="0.3">🧠</text>
        <text x="110" y="170" textAnchor="middle" fontSize="11" fill="white" opacity="0.7">Entity 360° Views</text>
      </g>
      
      <g transform="translate(290, 50)">
        {/* Pillar 2: Governance */}
        <rect width="220" height="200" fill="#EB4379" rx="12" />
        <text x="110" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Governance</text>
        <text x="110" y="70" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">Human approval required</text>
        <text x="110" y="90" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">for every action</text>
        <text x="110" y="130" textAnchor="middle" fontSize="40" fill="white" opacity="0.3">✓</text>
        <text x="110" y="170" textAnchor="middle" fontSize="11" fill="white" opacity="0.7">Approval-First Design</text>
      </g>
      
      <g transform="translate(530, 50)">
        {/* Pillar 3: Intelligence */}
        <rect width="220" height="200" fill="#10B981" rx="12" />
        <text x="110" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Intelligence</text>
        <text x="110" y="70" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">Continuous learning from</text>
        <text x="110" y="90" textAnchor="middle" fontSize="12" fill="white" opacity="0.9">every decision made</text>
        <text x="110" y="130" textAnchor="middle" fontSize="40" fill="white" opacity="0.3">↻</text>
        <text x="110" y="170" textAnchor="middle" fontSize="11" fill="white" opacity="0.7">Adaptive Learning Loop</text>
      </g>
    </svg>
  );
}

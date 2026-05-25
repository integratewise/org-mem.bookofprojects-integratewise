import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Database, Brain, Workflow, ArrowRight, ArrowDown,
  CheckCircle, Server, Shield, Zap, GitBranch, Circle,
  ChevronDown, ChevronUp, FileText, Box, Link2,
  Cpu, Globe, Lock, RefreshCw, Users, Settings,
  Sparkles, Activity, Box as BoxIcon, Network,
  HardDrive, Terminal, Cloud, Code, Eye
} from 'lucide-react';
import {
  LayerArchitectureDiagram,
  PipelineDiagram,
  ThreeFlowsDiagram,
  CognitiveLoopDiagram,
  SpineVisualizationDiagram
} from '../diagrams/ArchitectureDiagrams';

// Animated node component for flow diagrams
function AnimatedNode({ 
  icon: Icon, 
  label, 
  color = "var(--forest)", 
  delay = 0,
  isActive = false,
  pulse = false
}: { 
  icon: any; 
  label: string; 
  color?: string; 
  delay?: number;
  isActive?: boolean;
  pulse?: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      className={`relative flex flex-col items-center ${pulse ? 'animate-pulse' : ''}`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${isActive ? 'ring-2 ring-offset-2' : ''}`}
        style={{ 
          background: 'linear-gradient(135deg, ' + color + ', ' + color + 'dd)',
          boxShadow: '0 4px 14px ' + color + '40',
          ringColor: color
        }}
      >
        <Icon className="w-6 h-6 text-[var(--paper)]" />
        
        {/* Animated pulse ring */}
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ background: color }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
      <span className="mt-2 text-xs font-medium text-[var(--ink)] text-center max-w-[80px]">{label}</span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 w-2 h-2 rounded-full bg-[var(--forest-bright)]"
        />
      )}
    </motion.div>
  );
}

// Animated connector line
function AnimatedConnector({ 
  direction = "horizontal", 
  delay = 0, 
  color = "var(--forest)",
  animated = false
}: { 
  direction?: "horizontal" | "vertical"; 
  delay?: number;
  color?: string;
  animated?: boolean;
}) {
  const isHorizontal = direction === "horizontal";
  
  return (
    <div className={`relative flex items-center justify-center ${isHorizontal ? 'w-16' : 'h-16'}`}>
      <motion.div
        initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
        animate={{ scaleX: 1, scaleY: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`${isHorizontal ? 'w-full h-0.5' : 'w-0.5 h-full'}`}
        style={{ background: 'linear-gradient(' + (isHorizontal ? '90deg' : '180deg') + ', transparent, ' + color + ', transparent)' }}
      />
      
      {animated && (
        <motion.div
          className="absolute"
          style={{ 
            width: isHorizontal ? 20 : 6, 
            height: isHorizontal ? 6 : 20,
            background: color,
            borderRadius: 3
          }}
          animate={isHorizontal ? { x: [-30, 30] } : { y: [-30, 30] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <ArrowRight 
        className={`absolute ${isHorizontal ? '' : 'rotate-90'} text-[var(--text-faint)]`} 
        size={14}
      />
    </div>
  );
}

// Layer card with animations
function AnimatedLayerCard({ 
  number, 
  title, 
  subtitle, 
  description, 
  features, 
  color,
  icon: Icon,
  isExpanded = true
}: any) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: number * 0.15, type: "spring", stiffness: 100 }}
      className="relative pl-12 pb-8 last:pb-0"
    >
      {/* Timeline connector */}
      {number < 3 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: number * 0.15 + 0.3, duration: 0.5 }}
          className="absolute left-5 top-12 w-0.5 h-full origin-top"
          style={{ background: 'linear-gradient(180deg, ' + color + ', ' + color + '40)' }}
        />
      )}
      
      {/* Layer badge */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center text-[var(--paper)] font-bold shadow-lg"
        style={{ background: color }}
      >
        <span className="text-sm">L{number}</span>
      </motion.div>
      
      {/* Content card */}
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 8px 30px color-mix(in srgb, var(--ink) 12%, transparent)" }}
        className="rounded-xl border border-[var(--border-base)] p-5 shadow-sm transition-all" style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: number }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </motion.div>
          <h4 className="font-semibold text-[var(--ink)]">{title}</h4>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: number * 0.15 + 0.2 }}
          className="text-xs font-medium mb-2"
          style={{ color }}
        >
          {subtitle}
        </motion.p>
        
        <p className="text-sm text-[var(--text-muted)] mb-4">{description}</p>
        
        <ul className="space-y-2">
          {features.map((f: string, i: number) => (
            <motion.li 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: number * 0.15 + 0.3 + i * 0.1 }}
              className="flex items-start gap-2 text-sm text-[var(--ink)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: number * 0.15 + 0.4 + i * 0.1, type: "spring" }}
              >
                <CheckCircle className="w-4 h-4 text-[var(--forest-bright)] shrink-0 mt-0.5" />
              </motion.div>
              {f}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

// Pipeline stage component
function PipelineStage({ 
  number, 
  title, 
  description, 
  icon: Icon, 
  color,
  isActive
}: { 
  number: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: number * 0.1 }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-xl border-2 transition-all"
        style={{ 
          borderColor: isActive ? 'var(--forest)' : 'var(--rule-light)',
          background: isActive ? 'color-mix(in srgb, var(--forest) 8%, transparent)' : 'var(--paper-warm)'
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={isActive ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: isActive ? color : 'var(--paper-deep)' }}
          >
            <Icon className="w-5 h-5" style={{ color: isActive ? 'white' : 'var(--text-muted)' }} />
          </motion.div>
          <div>
            <span className="text-xs font-bold text-[var(--text-faint)]">Stage {number}</span>
            <h4 className="font-semibold text-[var(--ink)] text-sm">{title}</h4>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)]">{description}</p>
      </motion.div>
      
      {number < 8 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: number * 0.1 + 0.2 }}
          className="absolute left-1/2 -bottom-4 w-0.5 h-4 origin-top bg-gradient-to-b from-[var(--forest)] to-transparent"
        />
      )}
    </motion.div>
  );
}

// Flow diagram component - REDESIGNED with vertical/grid layout
function FlowDiagram({ 
  letter, 
  title, 
  description, 
  steps, 
  color,
  icon: FlowIcon
}: { 
  letter: string; 
  title: string; 
  description: string; 
  steps: { icon: any; label: string }[];
  color: string;
  icon: any;
}) {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Calculate grid layout - use 2 columns for better spacing
  const cols = 3;
  const rows = Math.ceil(steps.length / cols);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-xl p-6 border border-[var(--border-base)] shadow-sm hover:shadow-lg transition-all" style={{ background: 'transparent' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--paper)] font-bold text-lg shadow-lg"
          style={{ background: color }}
        >
          <FlowIcon className="w-6 h-6" />
        </motion.div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded text-[var(--paper)]" style={{ background: color }}>Flow {letter}</span>
          </div>
          <h4 className="font-semibold text-[var(--ink)]">{title}</h4>
        </div>
      </div>
      
      <p className="text-sm text-[var(--text-muted)] mb-6">{description}</p>
      
      {/* Redesigned Flow Steps - 3-column Grid Layout */}
      <div className="relative">
        {/* Grid of steps */}
        <div className="grid grid-cols-3 gap-4">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = activeStep > i;
            
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  className="flex flex-col items-center p-4 rounded-xl min-h-[100px] transition-all border"
                  style={{ 
                    borderWidth: isActive ? '2px' : '1px',
                    borderColor: isActive ? color : isCompleted ? color + '40' : 'var(--rule-light)',
                    background: isActive ? 'var(--paper-warm)' : 'var(--paper-warm)',
                    boxShadow: isActive ? '0 0 20px ' + color + '40' : isCompleted ? '0 0 10px ' + color + '20' : '0 2px 8px rgb(0 0 0 / 0.06)'
                  }}
                >
                  {/* Step number indicator */}
                  <div 
                    className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      background: isActive ? color : isCompleted ? color : 'var(--rule-light)',
                      color: isActive || isCompleted ? 'white' : 'var(--text-faint)'
                    }}
                  >
                    {i + 1}
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { 
                      y: [0, -3, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-2 mt-1"
                    style={{ 
                      background: isActive ? color : isCompleted ? color + 'cc' : 'var(--paper-deep)',
                      color: isActive || isCompleted ? 'white' : 'var(--text-muted)'
                    }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Label */}
                  <span 
                    className="text-xs text-center font-medium leading-tight"
                    style={{ color: isActive ? 'var(--ink)' : 'var(--text-muted)' }}
                  >
                    {step.label}
                  </span>
                  
                  {/* Connection arrow to next step (except last) */}
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="absolute hidden lg:block"
                      style={{
                        // Position arrows between grid items
                        ...(i % 3 !== 2 && { right: '-14px', top: '50%', transform: 'translateY(-50%)' }), // Right arrow
                        ...(i % 3 === 2 && i < steps.length - 1 && { bottom: '-18px', left: '50%', transform: 'translateX(-50%) rotate(90deg)' }), // Down arrow for end of row
                      }}
                    >
                      <ArrowRight 
                        className="w-4 h-4" 
                        style={{ color: isCompleted ? color : 'var(--rule-light)' }}
                      />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Active pulse ring */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: '2px solid ' + color }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Progress indicator at bottom */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[var(--rule-light)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: '0%' }}
              animate={{ width: String(((activeStep + 1) / steps.length) * 100) + '%' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)] min-w-[40px] text-right">
            {activeStep + 1}/{steps.length}
          </span>
        </div>
        
        {/* Animated data packet that moves through the grid */}
        <motion.div
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{ background: color }}
          animate={{
            // Calculate position based on active step in 3-column grid
            top: String(Math.floor(activeStep / 3) * 116 + 50) + 'px',
            left: String((activeStep % 3) * 33.33 + 16.5) + '%',
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}

// Spine visualization
function SpineVisualization() {
  const [activeNode, setActiveNode] = useState(0);
  
  const nodes = [
    { icon: Box, label: 'Entities', color: 'var(--forest)' },
    { icon: Link2, label: 'Relationships', color: 'var(--forest-bright)' },
    { icon: FileText, label: 'Schema', color: 'var(--forest-mid)' },
    { icon: Database, label: 'Truth', color: 'var(--ink)' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div className="relative">
      {/* Central Spine */}
      <motion.div
        className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, var(--forest), var(--ink))',
          boxShadow: '0 0 40px color-mix(in srgb, var(--forest-mid) 40%, transparent)'
        }}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 40px color-mix(in srgb, var(--forest-mid) 40%, transparent)',
            '0 0 60px color-mix(in srgb, var(--forest-mid) 60%, transparent)',
            '0 0 40px color-mix(in srgb, var(--forest-mid) 40%, transparent)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Database className="w-12 h-12 text-[var(--paper)]" />
        
        {/* Orbiting rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-[var(--paper)]/20"
            style={{ 
              width: 160 + i * 40, 
              height: 160 + i * 40,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 10 + i * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </motion.div>
      
      <p className="text-center mt-4 font-medium text-[var(--ink)]">The Spine (SSOT)</p>
      <p className="text-center text-xs text-[var(--text-muted)]">Canonical Truth Boundary</p>
    </div>
  );
}

// Cognitive loop visualization
function CognitiveLoopViz() {
  const steps = [
    { icon: Eye, label: 'Entity 360', color: 'var(--forest)' },
    { icon: Brain, label: 'Think', color: 'var(--forest-bright)' },
    { icon: Shield, label: 'Govern', color: 'var(--forest-mid)' },
    { icon: Users, label: 'HITL', color: 'var(--gold)' },
    { icon: Zap, label: 'Act', color: 'var(--red)' },
    { icon: RefreshCw, label: 'Adjust', color: 'var(--forest-bright)' },
  ];

  return (
    <div className="relative py-8">
      {/* Circular layout */}
      <div className="relative w-64 h-64 mx-auto">
        {steps.map((step, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;
          
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ scale: 1, x, y }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="absolute left-1/2 top-1/2 -ml-6 -mt-6"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--paper)] shadow-lg"
                style={{ background: step.color }}
              >
                <step.icon className="w-5 h-5" />
              </motion.div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-[var(--ink)] whitespace-nowrap">
                {step.label}
              </span>
            </motion.div>
          );
        })}
        
        {/* Center hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-8 -mt-8 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--forest)] to-[var(--ink)] flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Activity className="w-8 h-8 text-[var(--paper)]" />
        </motion.div>
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {steps.map((step, i) => {
            const angle1 = (i * 60 - 90) * (Math.PI / 180);
            const angle2 = ((i + 1) % 6 * 60 - 90) * (Math.PI / 180);
            const x1 = 128 + Math.cos(angle1) * 100;
            const y1 = 128 + Math.sin(angle1) * 100;
            const x2 = 128 + Math.cos(angle2) * 100;
            const y2 = 128 + Math.sin(angle2) * 100;
            
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={step.color}
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function ArchitecturePage() {
  const [activePipelineStage, setActivePipelineStage] = useState(0);

  // Auto-advance pipeline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineStage((prev) => (prev + 1) % 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pipelineStages = [
    { icon: Cloud, title: 'Ingest', desc: 'External data enters via connectors, uploads, webhooks', color: 'var(--forest)' },
    { icon: Settings, title: 'Normalize', desc: 'All data passes through 8-stage pipeline', color: 'var(--forest-bright)' },
    { icon: Database, title: 'Store', desc: 'Canonical truth written to Spine', color: 'var(--forest-mid)' },
    { icon: Eye, title: 'Render', desc: 'Workspace reads Spine projections', color: 'var(--ink)' },
    { icon: Brain, title: 'Think', desc: 'AI reasons over Entity 360', color: 'var(--forest)' },
    { icon: Shield, title: 'Govern/HITL', desc: 'Approval gates enforced', color: 'var(--forest-bright)' },
    { icon: Zap, title: 'Act', desc: 'Approved actions executed', color: 'var(--forest-mid)' },
    { icon: RefreshCw, title: 'Re-ingest', desc: 'Outcomes return to Spine', color: 'var(--forest-bright)' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Animated Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full"
          style={{ background: 'var(--paper-deep)', border: '1px solid var(--rule-light)' }}
        >
          <Layers className="w-4 h-4 text-[var(--forest)]" />
          <span className="text-xs font-semibold text-[var(--forest)] uppercase tracking-wider">Technical System</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl lg:text-4xl font-bold text-[var(--ink)] mb-3"
        >
          IntegrateWise Architecture
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base lg:text-lg text-[var(--text-muted)] leading-relaxed max-w-3xl"
        >
          An <strong className="text-[var(--ink)]">Adaptive Continuity Workspace</strong>, hydrated from the Spine and governed by human approvals.
        </motion.p>
      </motion.div>

      {/* Layer Architecture with Animations */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Layers className="w-6 h-6 text-[var(--forest)]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">Layer Architecture (L0-L5)</h2>
        </div>
        
        <div className="rounded-2xl border border-[var(--border-base)] p-6 shadow-sm" style={{ background: 'var(--paper-warm)' }}>
          <AnimatedLayerCard 
            number={0}
            title="Connection Layer"
            subtitle="Data Ingestion & Connectivity"
            description="Gateways, connectors, webhooks — raw data entering the system."
            color="var(--forest-bright)"
            icon={Cloud}
            features={[
              "API gateways and connectors",
              "Webhook receivers",
              "Raw data ingestion",
              "Protocol adapters"
            ]}
          />
          
          <AnimatedLayerCard 
            number={1}
            title="Adaptive Continuity Workspace (projected from Spine)"
            subtitle="Human Interface Layer"
            description="Adaptive Continuity Workspace — the UI where humans see truth, signals, and approval cards projected from current continuity."
            color="var(--forest)"
            icon={Globe}
            features={[
              "Unified dashboard interface",
              "Approval cards and signals",
              "Entity 360 visualization",
              "Human-in-the-loop controls"
            ]}
          />
          
          <AnimatedLayerCard 
            number={2}
            title="Cognitive Intelligence Overlay"
            subtitle="AI Reasoning & Detection"
            description="Entity 360, Depth Matrix, signal detection, proposal generation."
            color="var(--gold)"
            icon={Brain}
            features={[
              "Entity 360 construction",
              "Depth Matrix analysis",
              "Signal detection engine",
              "Proposal generation"
            ]}
          />
          
          <AnimatedLayerCard 
            number={3}
            title="Canonical Truth & Memory Layer"
            subtitle="Spine & Knowledge Store"
            description="Spine + Knowledge + Memory Accumulator — normalized entities, relationships, AI memory."
            color="var(--ink)"
            icon={Database}
            features={[
              "Spine truth boundary",
              "Normalized entity store",
              "Relationship graph",
              "Memory accumulator"
            ]}
          />
          
          <AnimatedLayerCard 
            number={4}
            title="Orchestration & Middleware"
            subtitle="Routing & Coordination"
            description="Workflow/BFF, pipelines, queueing — everything that routes and coordinates between L0–L3."
            color="var(--warning-color)"
            icon={Workflow}
            features={[
              "Workflow engine",
              "BFF (Backend-for-Frontend)",
              "Pipeline orchestration",
              "Message queueing"
            ]}
          />
          
          <AnimatedLayerCard 
            number={5}
            title="Infrastructure Services"
            subtitle="Core Platform Infrastructure"
            description="Compute, storage, networking, and security services that power the platform."
            color="var(--forest-bright)"
            icon={Server}
            features={[
              "Compute and container orchestration",
              "Persistent storage services",
              "Network and security",
              "Monitoring and observability"
            ]}
          />
          
          {/* Layer Architecture Diagram */}
          <div className="mt-8 pt-8 border-t border-[var(--rule-light)]">
            <p className="text-sm text-[var(--text-muted)] mb-4 text-center">Visual Overview of Layer Architecture</p>
            <LayerArchitectureDiagram />
          </div>
        </div>
      </motion.section>

      {/* Animated Pipeline */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Workflow className="w-6 h-6 text-[var(--forest)]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">8-Stage Data Pipeline</h2>
        </div>
        
        <div className="rounded-2xl border border-[var(--border-base)] p-6" style={{ background: 'linear-gradient(135deg, var(--paper-warm) 0%, var(--paper-deep) 100%)' }}>
          {/* Horizontal pipeline visualization */}
          <div className="relative mb-8 overflow-x-auto">
            <div className="flex items-center min-w-max px-4">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: activePipelineStage === i ? 1.1 : 1,
                      boxShadow: activePipelineStage === i 
                        ? '0 0 20px ' + stage.color + '60' 
                        : 'var(--shadow-sm)'
                    }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={activePipelineStage === i ? { 
                        rotate: [0, 360],
                        background: [stage.color, 'var(--paper)', stage.color]
                      } : {}}
                      transition={{ duration: 2 }}
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-[var(--paper)] shadow-lg"
                      style={{ background: stage.color }}
                    >
                      <stage.icon className="w-6 h-6" />
                    </motion.div>
                    <span className="mt-2 text-xs font-medium text-[var(--ink)]">{stage.title}</span>
                    <span className="text-xs text-[var(--text-faint)]">{i + 1}</span>
                  </motion.div>
                  
                  {i < pipelineStages.length - 1 && (
                    <motion.div
                      className="w-12 h-0.5 mx-1"
                      style={{ 
                        background: activePipelineStage > i 
                          ? 'linear-gradient(90deg, ' + stage.color + ', ' + pipelineStages[i + 1].color + ')'
                          : 'var(--rule-light)'
                      }}
                    >
                      {/* Animated flow particle */}
                      {activePipelineStage === i && (
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ background: stage.color }}
                          animate={{ x: [0, 40] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Active stage description */}
          <motion.div
            key={activePipelineStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-[var(--rule-light)]" style={{ background: 'transparent' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--paper)]"
                style={{ background: pipelineStages[activePipelineStage].color }}
              >
                {(() => {
                  const Icon = pipelineStages[activePipelineStage].icon;
                  return <Icon className="w-5 h-5" />;
                })()}
              </div>
              <div>
                <h4 className="font-semibold text-[var(--ink)]">
                  Stage {activePipelineStage + 1}: {pipelineStages[activePipelineStage].title}
                </h4>
                <p className="text-sm text-[var(--text-muted)]">{pipelineStages[activePipelineStage].desc}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Pipeline Diagram */}
          <div className="mt-8 pt-8 border-t border-[var(--rule-light)]">
            <p className="text-sm text-[var(--text-muted)] mb-4 text-center">Complete Pipeline Flow</p>
            <PipelineDiagram />
          </div>
        </div>
      </motion.section>

      {/* Three Flows with Animations */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-[var(--forest)]" />
          <h2 className="text-2xl font-bold text-[var(--ink)]">The Three Flows</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <FlowDiagram 
            letter="A"
            title="Structured Operational Truth"
            description="CRM, finance, support, project systems"
            color="var(--forest)"
            icon={Database}
            steps={[
              { icon: Cloud, label: 'Connector' },
              { icon: Workflow, label: 'Pipeline' },
              { icon: Server, label: 'Spine' },
              { icon: Globe, label: 'Workspace' },
              { icon: Eye, label: 'Entity 360' },
              { icon: Activity, label: 'Signals' },
            ]}
          />
          
          <FlowDiagram 
            letter="B"
            title="Unstructured Context"
            description="Documents, emails, chats, files"
            color="var(--forest-bright)"
            icon={FileText}
            steps={[
              { icon: Cloud, label: 'Ingest' },
              { icon: Code, label: 'Extract' },
              { icon: Box, label: 'Knowledge' },
              { icon: Link2, label: 'Link' },
              { icon: Eye, label: 'Entity 360' },
            ]}
          />
          
          <FlowDiagram 
            letter="C"
            title="AI / MCP Flow"
            description="AI sessions, MCP, governed memory"
            color="var(--gold)"
            icon={Brain}
            steps={[
              { icon: Cloud, label: 'Capture' },
              { icon: Shield, label: 'Triage' },
              { icon: CheckCircle, label: 'Approve' },
              { icon: Zap, label: 'Action' },
              { icon: RefreshCw, label: 'Re-ingest' },
              { icon: Server, label: 'Spine' },
            ]}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 p-4 bg-gradient-to-r from-[color-mix(in srgb, var(--gold) 8%, transparent)] to-transparent rounded-xl border border-[color-mix(in srgb, var(--gold) 20%, transparent)]"
        >
          <p className="text-sm text-[var(--ink)]">
            <strong className="text-[var(--gold)]">Critical Rule:</strong> Flow C never writes directly to Spine truth. All AI content passes through governance.
          </p>
        </motion.div>
        
        {/* Three Flows Diagram */}
        <div className="mt-8">
          <p className="text-sm text-[var(--text-muted)] mb-4 text-center">Complete Flow Architecture</p>
          <ThreeFlowsDiagram />
        </div>
      </motion.section>

      {/* Spine & Cognitive Loop Side by Side */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Spine Visualization */}
        <motion.section
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl border border-[var(--border-base)] p-6"
          style={{ background: 'var(--paper-warm)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-[var(--forest)]" />
            <h2 className="text-xl font-bold text-[var(--ink)]">The Spine (SSOT)</h2>
          </div>
          
          <SpineVisualization />
          
          {/* SVG Spine Diagram */}
          <div className="mt-6">
            <SpineVisualizationDiagram />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { icon: Box, label: 'Entities' },
              { icon: Link2, label: 'Relationships' },
              { icon: FileText, label: 'Schema' },
              { icon: Lock, label: 'Truth Boundary' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 p-2 bg-[var(--paper-warm)] rounded-lg"
              >
                <item.icon className="w-4 h-4 text-[var(--forest)]" />
                <span className="text-xs font-medium text-[var(--ink)]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Cognitive Loop */}
        <motion.section
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl border border-[var(--border-base)] p-6"
          style={{ background: 'var(--paper-warm)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-[var(--gold)]" />
            <h2 className="text-xl font-bold text-[var(--ink)]">Cognitive Loop</h2>
          </div>
          
          <CognitiveLoopViz />
          
          {/* SVG Cognitive Loop Diagram */}
          <div className="mt-6">
            <CognitiveLoopDiagram />
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-[var(--text-muted)]">
              Entity 360 → Think → Govern → HITL → Act → Adjust
            </p>
          </div>
        </motion.section>
      </div>

      {/* Summary */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--paper-warm) 0%, color-mix(in srgb, var(--forest) 8%, transparent) 58%, var(--gold-pale) 100%)', border: '1px solid var(--rule-light)' }}
        >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[var(--paper)]/10"
              style={{
                left: String(Math.random() * 100) + '%',
                top: String(Math.random() * 100) + '%',
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            <span className="text-sm font-medium text-[var(--text-muted)]">Executive Summary</span>
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-4 text-[var(--ink)]">Workspace-First, Spine-Based, Approval-Governed</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Onboarding determines runtime schema',
              'Connectors supply but never define truth',
              'Spine is the single source of truth',
              'AI never bypasses governance',
              'Actions always return through re-ingestion',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <CheckCircle className="w-5 h-5 text-[var(--forest-bright)] shrink-0" />
                </motion.div>
                <span className="text-sm text-[var(--text-muted)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 text-center"
      >
        <p className="text-xs text-[var(--text-faint)]">
          IntegrateWise LLP · Bengaluru, India · integratewise.ai
        </p>
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs text-[var(--text-faint)] mt-1"
        >
          AI Thinks in Context — and Waits for Approval
        </motion.p>
      </motion.div>
    </div>
  );
}
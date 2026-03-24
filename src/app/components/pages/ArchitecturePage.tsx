import { Database, Layers, GitBranch, Shield, Zap, FileText, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ArchitecturePage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Layers className="w-8 h-8" style={{ color: '#4356A9' }} />
          <h1 className="text-3xl font-bold" style={{ color: '#232D42' }}>Executive Architecture</h1>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#4356A9' }}>
          Knowledge Workspace over the Spine, empowered by AI and governed by approvals
        </p>
      </div>

      {/* What the system is */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#232D42' }}>What the System Is</h2>
        <p className="text-lg mb-6" style={{ color: '#333944' }}>
          IntegrateWise is designed to make business truth, context, and action operate in one governed loop.
        </p>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              layer: 'L0',
              title: 'Onboarding',
              desc: 'Establishes tenant identity, department, industry, and schema direction',
              icon: Settings,
              color: '#3D8B6E',
            },
            {
              layer: 'L1',
              title: 'Workspace',
              desc: 'The daily operating surface where users work',
              icon: FileText,
              color: '#4356A9',
            },
            {
              layer: 'L2',
              title: 'Cognitive',
              desc: 'The intelligence layer that reasons, proposes, and waits for approval',
              icon: Zap,
              color: '#EB4F72',
            },
            {
              layer: 'L3',
              title: 'Platform',
              desc: 'The controlled backend path where all data is ingested, normalized, stored, and re-ingested',
              icon: Database,
              color: '#636A82',
            },
          ].map((item) => (
            <div key={item.layer} className="p-5 rounded-lg" style={{ background: '#F8F9FB', border: '1px solid #E5E8F4' }}>
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: item.color, color: '#fff' }}>
                  {item.layer}
                </span>
              </div>
              <p className="font-semibold mb-2" style={{ color: '#232D42' }}>{item.title}</p>
              <p className="text-sm" style={{ color: '#636A82' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6" style={{ border: '1px solid #D5DBE5' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>ARCHITECTURAL PRINCIPLE</p>
          <p className="text-lg font-semibold" style={{ color: '#4356A9' }}>
            The architecture works because the Workspace is the product surface, the Spine is the source of truth, and AI only acts through governed approval paths.
          </p>
        </div>
      </section>

      {/* Core Architectural Rule */}
      <section className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6" style={{ color: '#EB4F72' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Core Architectural Rule</h2>
        </div>
        <p className="text-xl font-bold" style={{ color: '#232D42' }}>
          All durable business value in IntegrateWise must be created through a Spine-based flow.
        </p>
        <p className="text-base mt-3" style={{ color: '#636A82' }}>
          That means no connector, UI module, AI session, or workflow may create business truth outside the canonical backend path.
        </p>
      </section>

      {/* Runtime Model */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#232D42' }}>Runtime Model</h2>
        
        <div className="flex items-center justify-center mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max px-4">
            {['Landing', 'Auth', 'L0 Onboarding', 'L1 Workspace', 'L2 Cognitive', 'L3 Platform'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-4 py-2 rounded-lg font-semibold text-white text-sm whitespace-nowrap" style={{ background: '#4356A9' }}>
                  {step}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-5 h-5" style={{ color: '#808CA9' }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: '#232D42' }}>Layer Roles</h3>
          
          {[
            {
              layer: 'L0 Onboarding',
              role: 'Resolves tenant context, department base schema, industry overrides, and connector relevance.',
            },
            {
              layer: 'L1 Workspace',
              role: 'Renders dashboards, modules, approvals, signals, and entity views from Spine-backed runtime projections.',
            },
            {
              layer: 'L2 Cognitive',
              role: 'Builds Entity 360, generates signals and proposals, checks policy, routes approvals, and coordinates action.',
            },
            {
              layer: 'L3 Platform',
              role: 'Runs gateway, connectors, loader, queueing, 8-stage pipeline, Spine, knowledge services, workflow/BFF, and re-ingestion.',
            },
          ].map((item) => (
            <div key={item.layer} className="flex gap-3 p-4 rounded-lg" style={{ background: '#F8F9FB' }}>
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#3D8B6E' }} />
              <div>
                <p className="font-semibold mb-1" style={{ color: '#4356A9' }}>{item.layer}</p>
                <p className="text-sm" style={{ color: '#636A82' }}>{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Architecture Loop */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#232D42' }}>Data Architecture in One Line</h2>
        
        <div className="flex items-center justify-center mb-8 overflow-x-auto py-4">
          <div className="flex items-center gap-2 min-w-max px-4">
            {['Ingest', 'Normalize', 'Store', 'Render', 'Think', 'Govern / HITL', 'Act', 'Re-ingest'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-3 py-2 rounded-lg font-medium text-white text-sm whitespace-nowrap" style={{ 
                  background: step === 'Govern / HITL' ? '#EB4F72' : '#4356A9' 
                }}>
                  {step}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-base" style={{ color: '#333944' }}>
          <p>• External data enters through connectors, uploads, webhooks, or AI capture</p>
          <p>• All meaningful data passes through the mandatory 8-stage pipeline</p>
          <p>• Canonical truth is written to the Spine</p>
          <p>• Workspace and cognitive layers read from Spine-backed projections</p>
          <p>• AI reasons over Entity 360 and linked evidence</p>
          <p>• Actions are executed only after approval when policy requires it</p>
          <p>• Outcomes return through re-ingestion so truth stays current</p>
        </div>
      </section>

      {/* The Three Flows */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>The Three Flows</h2>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 rounded-lg" style={{ background: '#F0F7FF', border: '1px solid #D5DBE5' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold px-2 py-1 rounded" style={{ background: '#4356A9', color: '#fff' }}>
                FLOW A
              </span>
              <h3 className="font-bold text-lg" style={{ color: '#232D42' }}>Structured Operational Truth</h3>
            </div>
            <p className="text-sm mb-3" style={{ color: '#636A82' }}>
              Used for CRM, finance, support, project, and other structured systems.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono flex-wrap">
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#4356A9' }}>Connector</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#4356A9' }}>Pipeline</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#4356A9' }}>Spine</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#4356A9' }}>Workspace / Entity 360 / Signals</span>
            </div>
          </div>

          <div className="p-6 rounded-lg" style={{ background: '#FFF5F7', border: '1px solid #FDE8EE' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold px-2 py-1 rounded" style={{ background: '#EB4F72', color: '#fff' }}>
                FLOW B
              </span>
              <h3 className="font-bold text-lg" style={{ color: '#232D42' }}>Unstructured Context and Evidence</h3>
            </div>
            <p className="text-sm mb-3" style={{ color: '#636A82' }}>
              Used for documents, emails, chats, files, and transcripts.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono flex-wrap">
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#EB4F72' }}>Ingest</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#EB4F72' }}>Extraction / chunking / linking</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#EB4F72' }}>Knowledge + Spine references</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#EB4F72' }}>Entity 360</span>
            </div>
          </div>

          <div className="p-6 rounded-lg" style={{ background: '#F5F8F5', border: '1px solid #D5E8D5' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold px-2 py-1 rounded" style={{ background: '#3D8B6E', color: '#fff' }}>
                FLOW C
              </span>
              <h3 className="font-bold text-lg" style={{ color: '#232D42' }}>AI / MCP / Knowledge-first Flow</h3>
            </div>
            <p className="text-sm mb-3" style={{ color: '#636A82' }}>
              Used for AI sessions, MCP sessions, and governed memory.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono flex-wrap">
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Capture</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Triage</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Approved knowledge / decision support</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Approved action</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Re-ingestion</span>
              <ArrowRight className="w-4 h-4" style={{ color: '#808CA9' }} />
              <span className="px-2 py-1 rounded" style={{ background: '#fff', color: '#3D8B6E' }}>Spine</span>
            </div>
            <div className="mt-4 p-3 rounded-lg" style={{ background: '#FFF', border: '1px solid #D5E8D5' }}>
              <p className="text-sm font-semibold" style={{ color: '#DC4A4A' }}>⚠️ Critical rule: Flow C never writes directly to Spine truth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Spine */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>The Spine</h2>
        </div>
        
        <p className="text-lg font-semibold mb-4" style={{ color: '#4356A9' }}>
          The Spine is the canonical truth boundary.
        </p>
        
        <div className="space-y-3 mb-6">
          <p style={{ color: '#333944' }}>It stores:</p>
          <ul className="space-y-2 ml-4">
            {[
              'Entities',
              'Relationships',
              'Schema observations',
              'Structured operational truth',
              'Linked references required for runtime views',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#3D8B6E' }} />
                <span style={{ color: '#333944' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-6" style={{ border: '1px solid #D5DBE5' }}>
          <p className="text-base font-semibold" style={{ color: '#4356A9' }}>
            If truth is not written to the Spine through the controlled pipeline, it is not part of the official platform state.
          </p>
        </div>
      </section>

      {/* 8-Stage Pipeline */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#232D42' }}>8-Stage Pipeline</h2>
        <p className="mb-6" style={{ color: '#636A82' }}>
          Every meaningful record passes through the 8-stage pipeline before entering the Spine:
        </p>
        
        <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { num: 1, name: 'Analyze' },
            { num: 2, name: 'Classify' },
            { num: 3, name: 'Filter' },
            { num: 4, name: 'Refine' },
            { num: 5, name: 'Extract' },
            { num: 6, name: 'Validate' },
            { num: 7, name: 'Sanity' },
            { num: 8, name: 'Sectorize' },
          ].map((stage) => (
            <div key={stage.num} className="p-3 rounded-lg text-center" style={{ background: '#F8F9FB', border: '1px solid #E5E8F4' }}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: '#4356A9' }}>
                {stage.num}
              </div>
              <p className="text-xs font-semibold" style={{ color: '#232D42' }}>{stage.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Non-Negotiables */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8" style={{ border: '1px solid #FDE8EE' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#DC4A4A' }}>Core Non-Negotiables</h2>
        <div className="space-y-3">
          {[
            'The Spine is the only truth boundary.',
            'The workspace never loads raw connector data directly.',
            'Flow C never writes directly to Spine truth.',
            'No action executes without approval when policy requires it.',
            'Re-ingestion is mandatory.',
          ].map((rule) => (
            <div key={rule} className="flex items-start gap-3 p-3 rounded-lg bg-white">
              <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#DC4A4A' }} />
              <p className="font-medium" style={{ color: '#333944' }}>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center pt-8" style={{ borderTop: '1px solid #E5E8F4' }}>
        <p className="text-sm" style={{ color: '#808CA9' }}>
          IntegrateWise LLP · Bengaluru, India · AI Thinks in Context. Actions Wait for Humans.
        </p>
      </div>
    </div>
  );
}

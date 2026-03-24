import { Building2, Target, Lightbulb, TrendingUp, Users2, Globe, BookOpen, Quote } from 'lucide-react';

export function CompanyPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="w-8 h-8" style={{ color: '#4356A9' }} />
          <h1 className="text-3xl font-bold" style={{ color: '#232D42' }}>Company & Product Master Doc</h1>
        </div>
        <p className="text-lg" style={{ color: '#636A82' }}>
          Canonical company narrative, strategic intent, business logic, market framing, and go-to-market direction for IntegrateWise
        </p>
      </div>

      {/* Canonical Statement */}
      <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <Quote className="w-8 h-8 mb-4" style={{ color: '#4356A9' }} />
        <p className="text-xl font-semibold mb-2" style={{ color: '#232D42' }}>Canonical Statement</p>
        <p className="text-2xl font-bold" style={{ color: '#4356A9' }}>
          Knowledge Workspace empowered by AI and the Spine
        </p>
        <p className="text-lg mt-2" style={{ color: '#636A82' }}>
          Where AI thinks in context and waits for approvals
        </p>
      </div>

      {/* Company Introduction */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Company Introduction</h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed" style={{ color: '#333944' }}>
          <p>
            IntegrateWise is building a new category of enterprise software designed for organisations that struggle with disconnected tools, fragmented knowledge, scattered workflows, and AI systems that lack operational context.
          </p>
          <p>
            At its core, IntegrateWise brings together <strong>work, knowledge, context, intelligence, and governed action</strong> into one unified environment. Instead of forcing teams to operate across dozens of disconnected applications, documents, dashboards, chats, spreadsheets, and repositories, IntegrateWise provides a single workspace where people can work with a complete business context while AI supports decisions responsibly.
          </p>
          <p>
            The foundation of this system is the <strong>Adaptive Spine</strong> — the structured and governed intelligence layer that serves as the system's single source of truth. The Spine connects business entities, relationships, operational signals, and evidence across tools, departments, and workflows.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 my-6" style={{ border: '1px solid #D5DBE5' }}>
            <p className="text-lg font-semibold" style={{ color: '#4356A9' }}>
              Core Principle
            </p>
            <p className="text-xl mt-2" style={{ color: '#232D42' }}>
              AI should not act without context, and it should not execute without approval.
            </p>
          </div>
          <p>
            This principle directly addresses one of the most urgent challenges in modern work: organisations are adopting more AI tools, more SaaS systems, and more automations than ever before, yet decision-making is becoming less coherent, less governed, and more fragmented. IntegrateWise solves this by creating a workspace where AI operates inside a trusted operating framework rather than outside it.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Company Profile</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>LEGAL IDENTITY</h3>
            <p className="text-lg font-semibold" style={{ color: '#232D42' }}>IntegrateWise LLP</p>
            <p style={{ color: '#636A82' }}>Bengaluru, India</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>CATEGORY</h3>
            <ul className="space-y-1">
              <li style={{ color: '#333944' }}>• Knowledge Workspace</li>
              <li style={{ color: '#333944' }}>• Cognitive Operating System</li>
              <li style={{ color: '#333944' }}>• AI-governed work platform</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E5E8F4' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#808CA9' }}>PRODUCT ESSENCE</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Knowledge Workspace', desc: 'The place where work happens' },
              { title: 'Spine (SSOT)', desc: 'The unified intelligence layer' },
              { title: 'AI Context Engine', desc: 'AI that reasons over Spine context' },
              { title: 'Approval Governance', desc: 'Every action passes through human checkpoints' },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg" style={{ background: '#F8F9FB' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#4356A9' }}>{item.title}</p>
                <p className="text-xs" style={{ color: '#636A82' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Belief System */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Vision, Mission & Beliefs</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>VISION</h3>
            <p className="text-lg font-medium" style={{ color: '#232D42' }}>
              To become the operating layer organisations rely on to coordinate knowledge, decisions, and action in an AI-enabled era.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>MISSION</h3>
            <p className="text-lg font-medium" style={{ color: '#232D42' }}>
              To help organisations unify tools, context, and action in one governed system where AI thinks with full operational context and humans remain in control of execution.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#808CA9' }}>BELIEF SYSTEM</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Context before intelligence',
                  desc: 'AI is only useful when it knows the actual state of the business. Better data beats bigger models. The Spine is what makes that possible.',
                },
                {
                  title: 'Governance before execution',
                  desc: 'No matter how smart a system is, unchecked automation is a liability. Human judgment is not a bottleneck to remove — it is the most important step in consequential decisions.',
                },
                {
                  title: 'Truth must be structured and traceable',
                  desc: 'If organisations cannot trace a recommendation, they cannot trust it. IntegrateWise emphasises evidence linkage, lineage, and structured truth.',
                },
                {
                  title: 'Work should happen in one connected environment',
                  desc: 'People should not have to reconstruct reality across disconnected tools every day. The workspace should bring together what matters for action.',
                },
                {
                  title: 'Governance is a product feature',
                  desc: 'Policy controls, scoped permissions, approval workflows, and auditability are not secondary features. They are essential to enterprise-grade AI adoption.',
                },
                {
                  title: 'Intelligence should compound',
                  desc: 'Every approved action, every denied recommendation, every new connector, and every evidence-linked workflow should make the system more useful over time.',
                },
              ].map((belief) => (
                <div key={belief.title} className="p-4 rounded-lg" style={{ background: '#F8F9FB', border: '1px solid #E5E8F4' }}>
                  <p className="font-semibold mb-2" style={{ color: '#4356A9' }}>{belief.title}</p>
                  <p className="text-sm" style={{ color: '#636A82' }}>{belief.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Narrative */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6" style={{ color: '#EB4F72' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Founder Narrative / Origin Story</h2>
        </div>
        
        <div className="space-y-4 text-base leading-relaxed" style={{ color: '#333944' }}>
          <p>
            IntegrateWise was shaped by deep experience in enterprise integration, customer strategy, and the operational realities of how organisations actually work.
          </p>
          <p>
            Across clients, industries, and transformation programs, the same pattern kept appearing: the data existed, the systems existed, and even the integrations often existed — but nobody had a complete picture when they needed it most. The information was present. The intelligence was absent.
          </p>
          <p>
            The data lived in one place. Context lived somewhere else. Action happened somewhere else again. Teams had to reconstruct reality manually before every decision.
          </p>
          
          <div className="bg-pink-50 rounded-lg p-6 my-6" style={{ border: '1px solid #FDE8EE' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#EB4F72' }}>THE $8M MOMENT</p>
            <p className="text-base" style={{ color: '#333944' }}>
              The defining moment came around a high-value enterprise account. Support tickets were spiking. Feature adoption was dropping. A tense executive signal had been captured in a personal note. Three signals. Three systems. Zero connection. The account was nearly lost.
            </p>
            <p className="text-lg font-semibold mt-4" style={{ color: '#232D42' }}>
              That moment became the founding question behind IntegrateWise:
            </p>
            <p className="text-xl font-bold mt-2" style={{ color: '#4356A9' }}>
              "What if every signal, from every system, fed into one place — and that place could think?"
            </p>
          </div>
          
          <p>
            That question became the Adaptive Spine. The Spine became IntegrateWise.
          </p>
        </div>
      </section>

      {/* Business Model */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Business Model Overview</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>COMMERCIAL LOGIC</h3>
            <p className="text-base" style={{ color: '#333944' }}>
              The company lands with one team, proves value quickly, then expands across functions as the Spine becomes more valuable and more central to daily operations.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#808CA9' }}>EXPANSION PATH</h3>
            <ol className="space-y-2">
              {[
                'One team / one domain',
                'More connectors',
                'More entities and richer Spine depth',
                'More workflows and approvals',
                'More departments',
                'Greater strategic dependence on the Spine as institutional intelligence',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white shrink-0" style={{ background: '#4356A9' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: '#333944' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#808CA9' }}>REVENUE TIERS</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { tier: 'Starter', focus: 'One CS or RevOps team', color: '#3D8B6E' },
                { tier: 'Growth', focus: 'Multi-department GTM stack', color: '#4356A9' },
                { tier: 'Enterprise', focus: 'Org-wide intelligence across up to 12 departments', color: '#EB4F72' },
              ].map((plan) => (
                <div key={plan.tier} className="p-5 rounded-lg" style={{ background: '#F8F9FB', border: '1px solid #E5E8F4' }}>
                  <p className="text-lg font-bold mb-1" style={{ color: plan.color }}>{plan.tier}</p>
                  <p className="text-sm" style={{ color: '#636A82' }}>{plan.focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6" style={{ border: '1px solid #D5DBE5' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>BUSINESS MOAT</p>
            <p className="text-base" style={{ color: '#333944' }}>
              The longer a customer stays, the more the Spine accumulates connected truth, approved actions, and institutional memory. This makes the product more valuable over time and raises switching cost structurally.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Priorities */}
      <section className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6" style={{ color: '#4356A9' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Strategic Priorities</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: 'Establish category clarity',
              desc: 'Own and repeat the language: Knowledge Workspace, Adaptive Spine, AI thinks in context, approval-first execution.',
            },
            {
              title: 'Complete and harden the core platform',
              desc: 'Platform must be robust across: onboarding, connector auth, data loading, normalization, Spine truth, workspace rendering, Entity 360, Think/Govern/HITL/Act, re-ingestion.',
            },
            {
              title: 'Make the Spine unmistakably valuable',
              desc: 'The Spine must be experienced by customers as the reason the product works better than disconnected tools.',
            },
            {
              title: 'Win the first domains decisively',
              desc: 'Customer Success, RevOps, and MarketingOps remain highest-priority entry domains.',
            },
            {
              title: 'Build the enterprise trust posture early',
              desc: 'Approval-first action, RBAC, evidence linkage, and auditability central to both product design and GTM.',
            },
            {
              title: 'Turn departmental entry into operating-system expansion',
              desc: 'Every additional team added to the Spine should make the whole system more valuable.',
            },
          ].map((priority, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ background: '#F8F9FB' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white shrink-0" style={{ background: '#4356A9' }}>
                {i + 1}
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#232D42' }}>{priority.title}</p>
                <p className="text-sm" style={{ color: '#636A82' }}>{priority.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GTM Messaging */}
      <section className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
        <div className="flex items-center gap-3 mb-6">
          <Users2 className="w-6 h-6" style={{ color: '#EB4F72' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>GTM Messaging Architecture</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>TAGLINE</h3>
            <p className="text-lg font-bold" style={{ color: '#4356A9' }}>AI Thinks in Context. Actions Wait for Humans.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>ONE-LINER</h3>
            <p className="text-base" style={{ color: '#333944' }}>
              IntegrateWise is a Knowledge Workspace where your full tech stack connects into one Adaptive Spine, AI surfaces what matters, and nothing executes without your approval.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>CATEGORY</h3>
            <p className="text-lg font-semibold" style={{ color: '#232D42' }}>Adaptive Signal Intelligence Workspace</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#808CA9' }}>PHILOSOPHY</h3>
            <p className="text-lg font-semibold" style={{ color: '#232D42' }}>Context before Intelligence. Governance before Execution.</p>
          </div>
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

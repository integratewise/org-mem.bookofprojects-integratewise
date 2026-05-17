import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Target, Lightbulb, TrendingUp, Users2, Globe, 
  BookOpen, Quote, Sparkles, Rocket, Shield, Zap, Eye,
  Copy, Check, ArrowRight, Layers, Brain, Lock, Star, 
  Heart, Compass, Megaphone, Briefcase, BarChart3,
  CheckCircle, Database, Play, FileText, MessageSquare,
  PhoneCall, Mail, Calendar, Clock, UserPlus, Handshake,
  AlertTriangle, Trophy, Target as TargetIcon, ChevronDown,
  ChevronUp, X, ExternalLink, Download, Search, Filter,
  MoreHorizontal, ArrowUpRight, Lightbulb as LightbulbIcon,
  Compass as CompassIcon, Award, Zap as ZapIcon, Users
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

// Copy Button Component
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{ background: copied ? '#10B981' : 'rgba(65,84,163,0.08)', color: copied ? '#fff' : '#4154A3' }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Animated Card
function AnimatedCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
      className={`bg-white rounded-xl border border-[#D5DAE5] p-6 shadow-sm transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Section Header
function SectionHeader({ icon: Icon, title, color = "#4154A3" }: { icon: any; title: string; color?: string }) {
  return (
    <motion.div 
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#1B2544]">{title}</h2>
    </motion.div>
  );
}

// Playbook Card Component
function PlaybookCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  scenarios,
  index 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  color: string;
  scenarios: { title: string; steps: string[] }[];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#D5DAE5] overflow-hidden shadow-sm"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-[#F8FAFC] transition-colors"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </motion.div>
          <div className="text-left">
            <h3 className="font-semibold text-[#1B2544]">{title}</h3>
            <p className="text-sm text-[#5F6E93]">{description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#9BA8C2]" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#E8ECF2]"
          >
            <div className="p-5">
              {/* Scenario Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {scenarios.map((scenario, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScenario(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeScenario === i 
                        ? 'text-white' 
                        : 'bg-[#F0F2F7] text-[#5F6E93] hover:bg-[#E8ECF2]'
                    }`}
                    style={{ background: activeScenario === i ? color : undefined }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>

              {/* Steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {scenarios[activeScenario].steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#475578] pt-0.5">{step}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#E8ECF2]">
                <CopyButton 
                  text={scenarios[activeScenario].steps.join('\n')} 
                  label="Copy Steps" 
                />
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[#5F6E93] hover:bg-[#F0F2F7]">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Battlecard Component
function Battlecard({ competitor, strengths, weaknesses, ourAdvantages, talkTrack }: {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  ourAdvantages: string[];
  talkTrack: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="relative h-96 perspective-1000"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-white rounded-xl border border-[#D5DAE5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1B2544]">vs {competitor}</h3>
              <button 
                onClick={() => setFlipped(true)}
                className="text-xs text-[#4154A3] hover:underline"
              >
                View Talk Track →
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#10B981] mb-2">THEIR STRENGTHS</p>
                <ul className="space-y-1">
                  {strengths.map((s, i) => (
                    <li key={i} className="text-xs text-[#5F6E93] flex items-start gap-2">
                      <span className="text-[#10B981]">+</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#EF4444] mb-2">THEIR WEAKNESSES</p>
                <ul className="space-y-1">
                  {weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-[#5F6E93] flex items-start gap-2">
                      <span className="text-[#EF4444]">−</span> {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#E8ECF2]">
                <p className="text-xs font-semibold text-[#4154A3] mb-2">OUR ADVANTAGES</p>
                <ul className="space-y-1">
                  {ourAdvantages.map((a, i) => (
                    <li key={i} className="text-xs text-[#475578] flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#4154A3] shrink-0 mt-0.5" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="h-full bg-gradient-to-br from-[#1B2544] to-[#4154A3] rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Talk Track</h3>
              <button 
                onClick={() => setFlipped(false)}
                className="text-xs text-white/70 hover:text-white"
              >
                ← Back
              </button>
            </div>
            
            <p className="text-sm text-white/90 leading-relaxed mb-4">{talkTrack}</p>
            
            <CopyButton text={talkTrack} label="Copy Talk Track" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Email Template Component
function EmailTemplate({ subject, body, type }: { subject: string; body: string; type: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl border border-[#D5DAE5] overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#F8FAFC]"
      >
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-[#4154A3]" />
          <div className="text-left">
            <p className="text-xs text-[#9BA8C2]">{type}</p>
            <p className="text-sm font-medium text-[#1B2544]">{subject}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-[#9BA8C2]" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t border-[#E8ECF2]"
          >
            <div className="p-4 bg-[#F8FAFC]">
              <p className="text-sm text-[#475578] whitespace-pre-line mb-3">{body}</p>
              <div className="flex gap-2">
                <CopyButton text={`Subject: ${subject}\n\n${body}`} label="Copy Email" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Main Component
export function CompanyPage() {
  const [activePlaybookTab, setActivePlaybookTab] = useState<'sales' | 'marketing' | 'cs' | 'competitive'>('sales');

  // Playbook Data
  const playbooks = {
    sales: [
      {
        title: "Discovery Call Playbook",
        description: "Qualify prospects and understand their pain points",
        icon: PhoneCall,
        color: "#4154A3",
        scenarios: [
          {
            title: "Cold Outreach",
            steps: [
              "Research: Check LinkedIn, recent news, tech stack",
              "Hook: 'Most [role] I talk to struggle with disconnected tools...'",
              "Problem: 'How are you currently handling cross-tool visibility?'",
              "Probe: 'What happens when a critical signal appears in one tool but context lives elsewhere?'",
              "Value: 'What if every signal fed into one place that could think?'",
              "Close: 'Worth a 15-minute conversation to see if this applies to you?'"
            ]
          },
          {
            title: "Inbound Qualification",
            steps: [
              "Acknowledge: 'Thanks for reaching out about [specific interest]'",
              "Context: 'Before I show you the platform, help me understand...'",
              "Current Stack: 'What tools are your teams living in daily?'",
              "Pain: 'Where do decisions slow down because information is scattered?'",
              "Authority: 'Who else should be involved in evaluating this?'",
              "Timeline: 'Is this solving an urgent problem or future planning?'"
            ]
          },
          {
            title: "Demo Follow-up",
            steps: [
              "Recap: 'Based on what you saw, [specific feature] seemed to resonate'",
              "Value Confirmation: 'How would that change your daily workflow?'",
              "Objection Handling: Address concerns about migration, adoption, ROI",
              "Next Steps: 'What would you need to see to move forward?'",
              "Stakeholders: 'Who else needs to see this for a decision?'",
              "Timeline: 'What's your ideal timeline for implementation?'"
            ]
          }
        ]
      },
      {
        title: "Objection Handling Playbook",
        description: "Handle common sales objections effectively",
        icon: Shield,
        color: "#EB4379",
        scenarios: [
          {
            title: "'We already have tools for this'",
            steps: [
              "Acknowledge: 'You definitely have great tools — that's not the problem'",
              "Reframe: 'The issue isn't tool quality, it's tool fragmentation'",
              "Story: 'Most of our customers had 8-12 best-in-class tools before us'",
              "Impact: 'But their teams were still reconstructing reality manually'",
              "Pivot: 'We don't replace your tools — we connect them into one intelligence layer'",
              "Question: 'How much time does your team spend context-switching daily?'"
            ]
          },
          {
            title: "'This is too expensive'",
            steps: [
              "Acknowledge: 'I understand budget is always a consideration'",
              "Context: 'Let's look at what you're spending on the problem today'",
              "Calc: 'How many hours/week does your team spend on [relevant activity]?'",
              "ROI: 'At $X/hour, that's $Y annually in manual work'",
              "Value: 'Plus the cost of missed signals and slow decisions'",
              "Reframe: 'What would it cost NOT to solve this problem?'"
            ]
          },
          {
            title: "'We need to think about it'",
            steps: [
              "Acknowledge: 'Important decisions deserve consideration'",
              "Clarify: 'Help me understand what specifically you're evaluating?'",
              "Urgency: 'What's the cost of waiting another quarter?'",
              "Risk: 'What happens if [specific pain point] continues?'",
              "Pilot: 'Would a limited pilot with one team reduce the risk?'",
              "Timeline: 'What would need to happen for you to decide by [date]?'"
            ]
          }
        ]
      },
      {
        title: "Closing Playbook",
        description: "Convert qualified opportunities to customers",
        icon: Trophy,
        color: "#10B981",
        scenarios: [
          {
            title: "Trial Close",
            steps: [
              "Summary: 'Based on our conversations, [recap key points]'",
              "Value: 'You'd save approximately [X hours] per week on [activity]'",
              "ROI: 'That's roughly $[amount] in annual efficiency gains'",
              "Soft Close: 'Does this make sense to move forward with?'",
              "Pause: Wait for response — don't fill the silence",
              "Handle: Address any remaining concerns"
            ]
          },
          {
            title: "Multi-Stakeholder Close",
            steps: [
              "Identify: 'Who else needs to sign off on this decision?'",
              "Prepare: 'Let's create a one-pager for your [CFO/CTO/etc.]'",
              "Champion: 'Can you introduce me to help answer their technical questions?'",
              "Demo: 'Would a brief demo for the team help move this forward?'",
              "Timeline: 'What's your procurement process look like from here?'",
              "Next Step: 'Let's schedule a check-in for [specific date]'"
            ]
          }
        ]
      }
    ],
    marketing: [
      {
        title: "Campaign Launch Playbook",
        description: "Execute integrated marketing campaigns",
        icon: Megaphone,
        color: "#F59E0B",
        scenarios: [
          {
            title: "Product Launch",
            steps: [
              "Pre-launch: Build waitlist, tease features, create FOMO",
              "Assets: Landing page, demo video, case studies, battlecards",
              "Channels: LinkedIn, email, webinars, PR, paid social",
              "Messaging: 'The Adaptive Continuity Workspace that Waits for Approval'",
              "CTA: 'Join [X] teams already on the waitlist'",
              "Launch: Coordinated push across all channels",
              "Post: Measure, optimize, nurture non-converters"
            ]
          },
          {
            title: "Webinar Campaign",
            steps: [
              "Topic: 'Building an AI-First Operating System'",
              "Speakers: Founder + customer success story",
              "Promotion: 3-week campaign, weekly touchpoints",
              "Registration: Landing page with calendar integration",
              "Reminders: 24hr, 1hr, and live notification",
              "Follow-up: Recording, slides, personalized outreach",
              "Nurture: Non-attendees get on-demand access"
            ]
          }
        ]
      },
      {
        title: "Content Marketing Playbook",
        description: "Create and distribute valuable content",
        icon: FileText,
        color: "#6B7DC4",
        scenarios: [
          {
            title: "Thought Leadership",
            steps: [
              "Topics: Context-first AI, governance, Spine architecture",
              "Formats: Blog, LinkedIn articles, Twitter threads",
              "Cadence: 2 blog posts/week, daily LinkedIn, 3 tweets/day",
              "Voice: Expert but approachable, opinionated, data-backed",
              "Distribution: Newsletter, social, communities, syndication",
              "Measurement: Engagement, shares, inbound leads"
            ]
          },
          {
            title: "SEO Content",
            steps: [
              "Keywords: Knowledge workspace, AI governance, operational intelligence",
              "Pillars: Create 5-10 comprehensive guides",
              "Clusters: 20-30 supporting articles per pillar",
              "Optimization: On-page, technical, link building",
              "Refresh: Update top performers quarterly",
              "Convert: Gated assets, demo CTAs, newsletter signup"
            ]
          }
        ]
      }
    ],
    cs: [
      {
        title: "Customer Onboarding Playbook",
        description: "Ensure successful customer activation",
        icon: UserPlus,
        color: "#10B981",
        scenarios: [
          {
            title: "Week 1: Setup",
            steps: [
              "Welcome: Personalized email from CSM + video",
              "Kickoff: 30-min call to understand goals and timeline",
              "Spine Setup: Configure tenant, schema, first connector",
              "Training: Self-paced academy + live Q&A session",
              "Quick Win: Identify one easy automation to demonstrate value",
              "Check-in: Day 3 and Day 7 pulse checks"
            ]
          },
          {
            title: "Month 1: Activation",
            steps: [
              "Goals: Review success metrics and KPIs",
              "Connectors: Add 2-3 more integrations",
              "Workspaces: Set up department-specific views",
              "Workflows: Build first approval workflow",
              "Training: Advanced features session",
              "Review: First value assessment call"
            ]
          },
          {
            title: "Quarter 1: Expansion",
            steps: [
              "Health Check: Usage metrics, NPS, support tickets",
              "Expansion: Identify new teams/departments",
              "Advocacy: Case study or testimonial ask",
              "Renewal Prep: Early check-in on renewal timeline",
              "Roadmap: Share upcoming features",
              "Business Review: Quarterly executive summary"
            ]
          }
        ]
      },
      {
        title: "Expansion Playbook",
        description: "Grow accounts across departments",
        icon: ArrowUpRight,
        color: "#4154A3",
        scenarios: [
          {
            title: "Cross-sell to New Department",
            steps: [
              "Identify: Which departments would benefit most?",
              "Champion: Enlist internal advocate from current team",
              "Value: Show how current team is saving time/money",
              "Demo: Department-specific use case demo",
              "Trial: 30-day pilot with success metrics",
              "Close: Department-specific pricing and rollout"
            ]
          }
        ]
      }
    ]
  };

  // Battlecards Data
  const battlecards = [
    {
      competitor: "Notion",
      strengths: ["Flexible workspace", "Strong templates", "Good for docs/wiki"],
      weaknesses: ["No native AI governance", "No approval workflows", "Limited operational context"],
      ourAdvantages: ["Approval-first actions", "Spine as SSOT", "Cross-tool intelligence", "Governed AI"],
      talkTrack: "Notion is great for documentation, but it doesn't solve the fragmentation problem. With IntegrateWise, your docs live alongside your CRM data, support tickets, and project updates — all connected through the Spine. Plus, when AI suggests actions, they go through approval workflows. Notion can't do that."
    },
    {
      competitor: "Salesforce",
      strengths: ["Market leader", "Deep CRM features", "Extensive ecosystem"],
      weaknesses: ["Expensive", "Complex implementation", "Disconnected from other tools"],
      ourAdvantages: ["Faster time-to-value", "Connects all tools not just CRM", "Better UX", "Purpose-built for knowledge work"],
      talkTrack: "Salesforce owns CRM, but modern work happens across 10+ tools. IntegrateWise connects your entire stack — CRM, support, project management, documents — into one intelligence layer. You get Salesforce's data, but with context from everywhere else, and AI that actually understands your business."
    },
    {
      competitor: "Zapier",
      strengths: ["Wide integration library", "Easy automation", "Affordable"],
      weaknesses: ["No intelligence layer", "No governance", "Just moves data, doesn't think"],
      ourAdvantages: ["Intelligent reasoning", "Approval governance", "Single source of truth", "Context-aware AI"],
      talkTrack: "Zapier moves data between apps. IntegrateWise adds intelligence to those connections. Instead of just 'when X happens, do Y,' it's 'when X happens, analyze context, suggest best action, get approval, then execute.' That's the difference between automation and intelligence."
    }
  ];

  // Email Templates
  const emailTemplates = [
    {
      type: "Cold Outreach",
      subject: "Quick question about [Company] tech stack",
      body: `Hi [Name],

I noticed [Company] is growing fast in [space]. Most [Role] I talk to at similar companies mention the same challenge: their teams live in 8-12 different tools, and nobody has the full picture when decisions need to happen.

The data exists. The context lives somewhere else. The action happens in a third place. Sound familiar?

We built IntegrateWise to solve exactly this — an adaptive continuity workspace that connects your entire tech stack into one Adaptive Spine, where AI surfaces what matters but waits for your approval before acting.

Worth a brief conversation to see if this applies to [Company]?

Best,
[Your name]`
    },
    {
      type: "Follow-up After Demo",
      subject: "Next steps from our demo + the ROI calculator",
      body: `Hi [Name],

Thanks for the time today. Based on what you shared about [specific pain point], I put together a quick ROI estimate:

• Current time spent on [activity]: [X] hours/week
• At [role] salary: ~$[amount]/year in manual work
• With IntegrateWise: 60% reduction in context-switching
• Conservative annual savings: $[amount]

Plus the less-quantifiable benefits: faster decisions, fewer dropped balls, and your team actually having the full context they need.

You mentioned [specific next step]. Let me know what else you need from our side to move forward.

Best,
[Your name]`
    },
    {
      type: "Case Study Share",
      subject: "How [Similar Company] reduced [metric] by 40%",
      body: `Hi [Name],

Thought you might find this relevant — we just published a case study with [Customer], a [industry] company similar to [Prospect Company].

Their challenge: [Specific pain point that mirrors prospect's situation]

What they did: Implemented IntegrateWise to connect [relevant tools]

Results in 90 days:
• 40% reduction in time-to-decision
• 60% fewer status meetings needed
• Complete visibility into customer health

Full case study here: [link]

Want to discuss how this might apply to [Company]?

Best,
[Your name]`
    }
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-[#1B2544] mb-4">
          IntegrateWise Master Documentation
        </h1>
        <p className="text-lg text-[#5F6E93] max-w-2xl mx-auto">
          Company narrative, strategic direction, business logic, and 
          <span className="text-[#EB4379] font-medium"> complete playbooks</span> for sales, marketing, and customer success.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: "Playbooks", value: "12+", icon: BookOpen },
          { label: "Email Templates", value: "15+", icon: Mail },
          { label: "Battlecards", value: "8", icon: Shield },
          { label: "Scenarios", value: "30+", icon: Target },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-white rounded-xl border border-[#E8ECF2] text-center"
          >
            <stat.icon className="w-5 h-5 text-[#4154A3] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1B2544]">{stat.value}</p>
            <p className="text-xs text-[#5F6E93]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* PLAYBOOKS SECTION */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-[#4154A3]" />
          <h2 className="text-2xl font-bold text-[#1B2544]">Playbooks</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'sales', label: 'Sales', icon: PhoneCall },
            { key: 'marketing', label: 'Marketing', icon: Megaphone },
            { key: 'cs', label: 'Customer Success', icon: Users2 },
            { key: 'competitive', label: 'Competitive', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActivePlaybookTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activePlaybookTab === tab.key
                  ? 'bg-[#4154A3] text-white'
                  : 'bg-[#F0F2F7] text-[#5F6E93] hover:bg-[#E8ECF2]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Playbook Content */}
        <AnimatePresence mode="wait">
          {activePlaybookTab !== 'competitive' ? (
            <motion.div
              key={activePlaybookTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {playbooks[activePlaybookTab].map((playbook, i) => (
                <PlaybookCard key={playbook.title} {...playbook} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="competitive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {battlecards.map((card, i) => (
                <Battlecard key={card.competitor} {...card} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* EMAIL TEMPLATES SECTION */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <SectionHeader icon={Mail} title="Email Templates" />
        
        <div className="grid gap-4">
          {emailTemplates.map((template, i) => (
            <EmailTemplate key={i} {...template} />
          ))}
        </div>
      </motion.section>

      {/* COMPANY INFO SECTIONS (Previous content condensed) */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <SectionHeader icon={Quote} title="Canonical Statement" />
        <AnimatedCard className="bg-gradient-to-br from-[rgba(65,84,163,0.05)] to-[rgba(235,67,121,0.05)]">
          <h2 className="text-2xl font-bold text-[#1B2544] mb-2">
            Adaptive Continuity Workspace — Hydrated by the Spine
          </h2>
          <p className="text-lg text-[#5F6E93] mb-4">
            Where AI thinks in context and waits for approvals
          </p>
          <CopyButton text="Adaptive continuity workspace hydrated by the Spine. Where AI thinks in context and waits for approvals." />
        </AnimatedCard>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <SectionHeader icon={Target} title="Vision & Mission" color="#EB4379" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedCard>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-[#4154A3]" />
              <span className="text-sm font-semibold text-[#9BA8C2]">VISION</span>
            </div>
            <p className="text-lg font-medium text-[#1B2544]">
              To become the operating layer organisations rely on to coordinate knowledge, decisions, and action in an AI-enabled era.
            </p>
          </AnimatedCard>
          
          <AnimatedCard delay={0.1}>
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-[#EB4379]" />
              <span className="text-sm font-semibold text-[#9BA8C2]">MISSION</span>
            </div>
            <p className="text-lg font-medium text-[#1B2544]">
              To help organisations unify tools, context, and action where AI thinks with full operational context and humans remain in control.
            </p>
          </AnimatedCard>
        </div>
      </motion.section>

      {/* Value Props */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <SectionHeader icon={Zap} title="Value Propositions by Role" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Users2, title: 'Customer Success', desc: 'Complete account health view', useCase: 'Spot churn risk early', color: '#4154A3' },
            { icon: TrendingUp, title: 'RevOps', desc: 'Connected pipeline intelligence', useCase: 'Forecast with confidence', color: '#10B981' },
            { icon: Megaphone, title: 'Marketing', desc: 'Campaign impact visibility', useCase: 'Prove ROI with evidence', color: '#EB4379' },
            { icon: Shield, title: 'Compliance', desc: 'Full audit trail', useCase: 'Pass audits effortlessly', color: '#1B2544' },
            { icon: Brain, title: 'Leaders', desc: 'Strategic context', useCase: 'See what matters now', color: '#6B7DC4' },
            { icon: Briefcase, title: 'Operations', desc: 'Cross-dept coordination', useCase: 'Break down silos', color: '#F59E0B' },
          ].map((vp, i) => (
            <AnimatedCard key={vp.title} delay={i * 0.1}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${vp.color}15` }}>
                  <vp.icon className="w-5 h-5" style={{ color: vp.color }} />
                </div>
                <h4 className="font-semibold text-[#1B2544]">{vp.title}</h4>
              </div>
              <p className="text-sm text-[#5F6E93] mb-2">{vp.desc}</p>
              <p className="text-xs text-[#9BA8C2]">USE CASE: {vp.useCase}</p>
            </AnimatedCard>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-8 border-t border-[#E8ECF2]"
      >
        <p className="text-sm text-[#9BA8C2]">
          IntegrateWise LLP · Bengaluru, India · hello@integratewise.ai
        </p>
        <p className="text-sm font-medium text-[#4154A3] mt-2">
          AI Thinks in Context — and Waits for Approval
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';

const pillars = [
  {
    title: 'The Human API',
    desc: 'Content that names the real problem. Humans have become the integration layer between disconnected tools.',
    articles: [
      'You are the integration layer. Here is why that has to change.',
      'The $8 million account: how connecting dots saved a deal.',
      'Why your CSMs spend 40% of their time on integration work.',
      'Platform lock-in is not a feature. It is a tax on your team.',
    ],
  },
  {
    title: 'Memory-Native AI',
    desc: 'Content that explains why AI memory matters more than AI intelligence.',
    articles: [
      'A smart model with no memory is a calculator with a personality.',
      'Your AI forgets every 30 minutes. Here is the architecture that fixes it.',
      'The model is a variable. The memory is a constant.',
      'Why persistent memory is the real AI moat.',
    ],
  },
  {
    title: 'The Round Trip',
    desc: 'Content that explains why data flowing in one direction is not enough.',
    articles: [
      'Dashboards are passive. The round trip is active.',
      'The seven phases of operational data flow.',
      'Why your data warehouse is not enough.',
      'The compounding effect: how every cycle makes the system smarter.',
    ],
  },
  {
    title: 'Governance as Architecture',
    desc: 'Content that explains why HITL is a trust boundary, not a limitation.',
    articles: [
      'Why enterprise AI must be governed AI.',
      'AI proposes. Humans approve. The system executes.',
      'The governance model is a sales advantage.',
      'Built by an architect: why enterprise security is not optional.',
    ],
  },
  {
    title: 'Built From the Seat',
    desc: 'Content that tells the founder\'s story and the product\'s origin.',
    articles: [
      'From CSM to founder: how managing 30 accounts became a product.',
      'The MuleSoft architect\'s approach to AI architecture.',
      'Two roles, one product: the origin of IntegrateWise.',
      'Why we dogfood: running a company on its own operating system.',
    ],
  },
];

export function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full" style={{ background: 'var(--gold)', filter: 'blur(120px)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>THOUGHT LEADERSHIP</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--paper)', fontFamily: 'var(--font-display)' }}>
            Blog
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--paper)', opacity: 0.8 }}>
            Five pillars. One thesis: memory is the moat.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {pillars.map((pillar, i) => (
          <motion.section key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>PILLAR {String(i + 1).padStart(2, '0')}</p>
                <h2 className="text-lg font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{pillar.title}</h2>
              </div>
            </div>
            <p className="text-sm mb-4 ml-11" style={{ color: 'var(--text-muted)' }}>{pillar.desc}</p>
            <div className="ml-11 space-y-2">
              {pillar.articles.map(article => (
                <div key={article} className="flex items-center gap-3 px-4 py-3 rounded-xl group cursor-pointer transition-all hover:shadow-sm" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--forest)' }} />
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{article}</span>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

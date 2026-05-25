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
    desc: "Content that tells the founder's story and the product's origin.",
    articles: [
      'From CSM to founder: how managing 30 accounts became a product.',
      "The MuleSoft architect's approach to AI architecture.",
      'Two roles, one product: the origin of IntegrateWise.',
      'Why we dogfood: running a company on its own operating system.',
    ],
  },
];

export function BlogPage() {
  return (
    <div>
      {/* Editorial Header */}
      <section className="relative px-8 lg:px-16 pt-16 pb-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 5%, transparent) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl">
          <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
            Thought Leadership
          </p>
          <h1 className="iw-hero-title mb-6" style={{ color: 'var(--ink)' }}>
            Blog
          </h1>
          <p className="iw-body max-w-2xl" style={{ color: 'var(--ink-muted)' }}>
            Five pillars. One thesis: memory is the moat.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8 lg:px-16 py-12 space-y-12">
        {pillars.map((pillar, i) => (
          <motion.section
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>PILLAR {String(i + 1).padStart(2, '0')}</p>
                <h2 className="font-serif text-lg font-bold" style={{ color: 'var(--ink)' }}>{pillar.title}</h2>
              </div>
            </div>
            <p className="text-sm mb-4 ml-11" style={{ color: 'var(--ink-muted)' }}>{pillar.desc}</p>
            <div className="ml-11 space-y-2">
              {pillar.articles.map(article => (
                <div
                  key={article}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl group cursor-pointer transition-all hover:shadow-sm"
                  style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
                >
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

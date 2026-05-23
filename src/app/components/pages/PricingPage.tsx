import { motion } from 'motion/react';
import { TrendingUp, Zap, ArrowRight } from 'lucide-react';

export function PricingPage() {
  const costs = [
    'Hours lost to manual context reconstruction',
    'Customer context siloed across tools',
    'AI that forgets everything between sessions',
    'Compliance gaps from ungoverned automation',
    'Operational risk from fragmented workflows',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full" style={{ background: 'var(--gold)', filter: 'blur(120px)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>PRICING</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--paper)', fontFamily: 'var(--font-display)' }}>
            Simple. Transparent. Based on value.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--paper)', opacity: 0.8 }}>
            We are finalizing pricing. What we can tell you now.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Without */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl p-8" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl p-3" style={{ background: 'color-mix(in srgb, var(--gold) 12%, transparent)', color: 'var(--gold)' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' }}>What it costs without it</h3>
            </div>
            <div className="space-y-4">
              {costs.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm" style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="rounded-2xl p-8" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl p-3" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' }}>What IntegrateWise saves</h3>
            </div>
            <div className="space-y-4">
              {[
                'Persistent AI memory across every session',
                'One surface for every tool and every department',
                'Governed execution with full lineage',
                'Enterprise-grade security by default',
                'A system that compounds intelligence every cycle',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--forest)' }} />
                  <p className="text-sm" style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center p-8 rounded-2xl" style={{ background: 'color-mix(in srgb, var(--forest) 6%, var(--paper))', border: '1px solid color-mix(in srgb, var(--forest) 12%, transparent)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>The cost of not having persistent AI memory is 30 to 40 percent of every knowledge worker's time.</p>
          <p className="text-lg font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>IntegrateWise will be priced to be a fraction of what it costs to not have it.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
            Contact us for early access pricing
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

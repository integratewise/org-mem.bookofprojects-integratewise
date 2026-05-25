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
    <div>
      {/* Editorial Header */}
      <section className="relative px-8 lg:px-16 pt-16 pb-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 5%, transparent) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl">
          <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
            Pricing
          </p>
          <h1 className="iw-hero-title mb-6" style={{ color: 'var(--ink)' }}>
            Simple. Transparent.<br />
            <span style={{ color: 'var(--forest)' }}>Based on value.</span>
          </h1>
          <p className="iw-body max-w-2xl" style={{ color: 'var(--ink-muted)' }}>
            We are finalizing pricing. Here is what we can tell you now.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8 lg:px-16 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl p-8"
            style={{ background: 'transparent', border: '1px solid var(--rule)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg p-3" style={{ background: 'color-mix(in srgb, var(--gold) 12%, transparent)', color: 'var(--gold)' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg" style={{ color: 'var(--ink)' }}>What it costs without it</h3>
            </div>
            <div className="space-y-4">
              {costs.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm" style={{ lineHeight: 1.6, color: 'var(--ink-muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-xl p-8"
            style={{ background: 'transparent', border: '1px solid var(--rule)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg p-3" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg" style={{ color: 'var(--ink)' }}>What IntegrateWise saves</h3>
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
                  <p className="text-sm" style={{ lineHeight: 1.6, color: 'var(--ink-muted)' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center p-8 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--forest) 4%, var(--paper))', border: '1px solid color-mix(in srgb, var(--forest) 12%, transparent)' }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--ink-muted)' }}>
            The cost of not having persistent AI memory is 30 to 40 percent of every knowledge worker's time.
          </p>
          <p className="text-lg font-serif mb-6" style={{ color: 'var(--ink)' }}>
            IntegrateWise will be priced to be a fraction of what it costs to not have it.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
            Contact us for early access pricing
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
